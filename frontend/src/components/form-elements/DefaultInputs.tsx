import React from 'react';

const DefaultInputs: React.FC = () => (
  <div className="grid gap-2">
    <label className="text-sm">Your name</label>
    <input className="border rounded p-2" placeholder="Jane Doe" />
  </div>
);

export default DefaultInputs;
