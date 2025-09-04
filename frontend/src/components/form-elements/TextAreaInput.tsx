import React from 'react';

const TextAreaInput: React.FC = () => (
  <div className="grid gap-2">
    <label className="text-sm">Comments</label>
    <textarea className="border rounded p-2" rows={4} placeholder="Write something..." />
  </div>
);

export default TextAreaInput;
