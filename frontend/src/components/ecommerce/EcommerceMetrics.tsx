import React from 'react';
import ComponentCard from '../common/ComponentCard';

const EcommerceMetrics: React.FC = () => (
  <ComponentCard title="Overview Metrics">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {['Forms', 'Responses', 'Courses', 'Active Users'].map((m) => (
        <div key={m} className="p-3 bg-gray-100 rounded text-center">
          <div className="text-2xl font-bold">0</div>
          <div className="text-xs text-gray-500">{m}</div>
        </div>
      ))}
    </div>
  </ComponentCard>
);

export default EcommerceMetrics;
