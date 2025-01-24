import React from 'react';
import { ThermometerSun, Fan, Power, Wifi, WifiOff } from 'lucide-react';
import type { ClimateDevice } from '../types';

interface DeviceCardProps {
  device: ClimateDevice;
  onSelect: (id: string) => void;
  selected: boolean;
}

export function DeviceCard({ device, onSelect, selected }: DeviceCardProps) {
  return (
    <div 
      className={`p-4 rounded-lg cursor-pointer transition-all ${
        selected 
          ? 'bg-blue-50 border-2 border-blue-500' 
          : 'bg-white border border-gray-200 hover:border-blue-300'
      }`}
      onClick={() => onSelect(device.id)}
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold text-gray-800">{device.name}</h3>
        {device.online ? (
          <Wifi className="w-5 h-5 text-green-500" />
        ) : (
          <WifiOff className="w-5 h-5 text-red-500" />
        )}
      </div>
      
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="flex items-center gap-2">
          <ThermometerSun className="w-5 h-5 text-orange-500" />
          <span className="text-gray-600">{device.currentTemp}°C</span>
        </div>
        <div className="flex items-center gap-2">
          <Fan className="w-5 h-5 text-blue-500" />
          <span className="text-gray-600">{device.fanSpeed}</span>
        </div>
        <div className="flex items-center gap-2">
          <Power className="w-5 h-5 text-gray-500" />
          <span className="text-gray-600">{device.mode}</span>
        </div>
        <div className="flex items-center gap-2">
          <ThermometerSun className="w-5 h-5 text-purple-500" />
          <span className="text-gray-600">{device.targetTemp}°C</span>
        </div>
      </div>
    </div>
  );
}