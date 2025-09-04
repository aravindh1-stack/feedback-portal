import React, { useState } from 'react';

const ToggleSwitch: React.FC = () => {
  const [enabled, setEnabled] = useState(false);
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        className={`w-12 h-6 rounded-full transition-colors ${enabled ? 'bg-green-500' : 'bg-gray-300'}`}
        onClick={() => setEnabled((e) => !e)}
      >
        <span className={`block w-6 h-6 bg-white rounded-full transform transition-transform ${enabled ? 'translate-x-6' : ''}`}></span>
      </button>
      <span className="text-sm">Enable notifications</span>
    </div>
  );
};

export default ToggleSwitch;
