const express = require('express');
const TuyAPI = require('tuyapi');
const WebSocket = require('ws');
const path = require('path');

const app = express();
const wss = new WebSocket.Server({ noServer: true });

// Serve static files from the React build
app.use(express.static(path.join(__dirname, 'dist')));

// Get devices from config
const devices = JSON.parse(process.env.DEVICES || '[]').map(device => ({
  ...device,
  instance: new TuyAPI({
    id: device.device_id,
    key: device.local_key,
  })
}));

// WebSocket connection handling
wss.on('connection', (ws) => {
  // Send initial device states
  const sendDeviceStates = async () => {
    const states = await Promise.all(devices.map(async (device) => {
      try {
        await device.instance.connect();
        const status = await device.instance.get();
        await device.instance.disconnect();
        return {
          id: device.device_id,
          name: device.name,
          online: true,
          ...status
        };
      } catch (error) {
        return {
          id: device.device_id,
          name: device.name,
          online: false
        };
      }
    }));
    ws.send(JSON.stringify({ type: 'deviceStates', data: states }));
  };

  sendDeviceStates();

  // Handle device control messages
  ws.on('message', async (message) => {
    try {
      const { deviceId, command } = JSON.parse(message);
      const device = devices.find(d => d.device_id === deviceId);
      
      if (device) {
        await device.instance.connect();
        await device.instance.set(command);
        await device.instance.disconnect();
        
        // Send updated states to all clients
        wss.clients.forEach(client => {
          if (client.readyState === WebSocket.OPEN) {
            sendDeviceStates();
          }
        });
      }
    } catch (error) {
      ws.send(JSON.stringify({ type: 'error', message: error.message }));
    }
  });
});

// Start server
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Attach WebSocket server to HTTP server
server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
});