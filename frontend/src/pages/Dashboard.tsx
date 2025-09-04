import React from 'react';
import StatisticsChart from '../components/ecommerce/StatisticsChart';
import EcommerceMetrics from '../components/ecommerce/EcommerceMetrics';

const Dashboard: React.FC = () => {
  return (
    <div className="grid gap-4">
      <EcommerceMetrics />
      <StatisticsChart />
    </div>
  );
};

export default Dashboard;
