export interface ClimateDevice {
  id: string;
  name: string;
  currentTemp: number;
  targetTemp: number;
  mode: 'heat' | 'cool' | 'auto' | 'off';
  fanSpeed: 'low' | 'medium' | 'high' | 'auto';
  online: boolean;
}

export interface DeviceState {
  devices: ClimateDevice[];
  selectedDevice: string | null;
}