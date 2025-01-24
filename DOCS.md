# Tuya Climate Control Add-on

This Home Assistant add-on provides control for unsupported Tuya climate devices.

## Installation

1. Add this repository to your Home Assistant instance
2. Install the add-on
3. Configure your Tuya devices in the add-on configuration

## Configuration

Example configuration:

\```yaml
devices:
  - name: "Living Room AC"
    device_id: "your_device_id"
    local_key: "your_local_key"
  - name: "Bedroom AC"
    device_id: "your_device_id"
    local_key: "your_local_key"
\```

### Required Configuration

Each device requires:

- `name`: A friendly name for the device
- `device_id`: The Tuya device ID
- `local_key`: The local key for the device

You can find these values using the Tuya IoT Platform or tools like tuyapi.

## Support

For issues and feature requests, please open an issue on GitHub.