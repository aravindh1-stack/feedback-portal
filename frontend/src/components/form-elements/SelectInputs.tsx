import React from 'react';

const SelectInputs: React.FC = () => (
  <div className="grid gap-2">
    <label className="text-sm">Course</label>
    <select className="border rounded p-2">
      <option>Course A</option>
      <option>Course B</option>
    </select>
  </div>
);

export default SelectInputs;
