import React from 'react';
import { Minus, Plus, ThermometerSun, Fan, Power } from 'lucide-react';
import type { ClimateDevice } from '../types';

interface DeviceControlsProps {
  device: ClimateDevice;
  onUpdateDevice: (updates: Partial<ClimateDevice>) => void;
}

export function DeviceControls({ device, onUpdateDevice }: DeviceControlsProps) {
  const modes = ['heat', 'cool', 'auto', 'off'];
  const fanSpeeds = ['low', 'medium', 'high', 'auto'];

  return (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">{device.name}</h2>
        <span className={`px-3 py-1 rounded-full text-sm ${
          device.online ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {device.online ? 'Online' : 'Offline'}
        </span>
      </div>

      <div className="space-y-8">
        {/* Temperature Control */}
        <div className="flex flex-col items-center">
          <div className="text-6xl font-bold text-gray-800 mb-4">
            {device.targetTemp}°C
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => onUpdateDevice({ targetTemp: device.targetTemp - 0.5 })}
              className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <Minus className="w-6 h-6 text-gray-600" />
            </button>
            <button
              onClick={() => onUpdateDevice({ targetTemp: device.targetTemp + 0.5 })}
              className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <Plus className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Mode Selection */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <Power className="w-5 h-5" /> Mode
          </h3>
          <div className="grid grid-cols-4 gap-2">
            {modes.map((mode) => (
              <button
                key={mode}
                onClick={() => onUpdateDevice({ mode: mode as ClimateDevice['mode'] })}
                className={`py-2 px-4 rounded-lg capitalize ${
                  device.mode === mode
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        {/* Fan Speed */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <Fan className="w-5 h-5" /> Fan Speed
          </h3>
          <div className="grid grid-cols-4 gap-2">
            {fanSpeeds.map((speed) => (
              <button
                key={speed}
                onClick={() => onUpdateDevice({ fanSpeed: speed as ClimateDevice['fanSpeed'] })}
                className={`py-2 px-4 rounded-lg capitalize ${
                  device.fanSpeed === speed
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {speed}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}