import React from 'react';
import MonthlySalesChart from '../components/ecommerce/MonthlySalesChart';
import CountryMap from '../components/ecommerce/CountryMap';

const Analytics: React.FC = () => {
  return (
    <div className="grid gap-4">
      <MonthlySalesChart />
      <CountryMap />
    </div>
  );
};

export default Analytics;
