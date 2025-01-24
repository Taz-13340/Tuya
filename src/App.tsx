import React, { useState } from 'react';
import { DeviceCard } from './components/DeviceCard';
import { DeviceControls } from './components/DeviceControls';
import type { ClimateDevice, DeviceState } from './types';

const initialDevices: ClimateDevice[] = [
  {
    id: '1',
    name: 'Living Room AC',
    currentTemp: 24,
    targetTemp: 22,
    mode: 'cool',
    fanSpeed: 'auto',
    online: true,
  },
  {
    id: '2',
    name: 'Bedroom AC',
    currentTemp: 23,
    targetTemp: 21,
    mode: 'auto',
    fanSpeed: 'low',
    online: true,
  },
  {
    id: '3',
    name: 'Office AC',
    currentTemp: 25,
    targetTemp: 23,
    mode: 'off',
    fanSpeed: 'medium',
    online: false,
  },
];

function App() {
  const [state, setState] = useState<DeviceState>({
    devices: initialDevices,
    selectedDevice: null,
  });

  const handleDeviceSelect = (id: string) => {
    setState(prev => ({
      ...prev,
      selectedDevice: id,
    }));
  };

  const handleDeviceUpdate = (updates: Partial<ClimateDevice>) => {
    setState(prev => ({
      ...prev,
      devices: prev.devices.map(device => 
        device.id === prev.selectedDevice
          ? { ...device, ...updates }
          : device
      ),
    }));
  };

  const selectedDevice = state.devices.find(d => d.id === state.selectedDevice);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Home Assistant - Tuya Climate Control
        </h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Devices</h2>
            {state.devices.map(device => (
              <DeviceCard
                key={device.id}
                device={device}
                onSelect={handleDeviceSelect}
                selected={device.id === state.selectedDevice}
              />
            ))}
          </div>
          
          <div>
            {selectedDevice ? (
              <DeviceControls
                device={selectedDevice}
                onUpdateDevice={handleDeviceUpdate}
              />
            ) : (
              <div className="bg-white rounded-lg p-6 text-center text-gray-500">
                Select a device to control
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;