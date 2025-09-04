import React from 'react';

const PageBreadCrumb: React.FC<{ crumbs: string[] }> = ({ crumbs }) => (
  <div className="text-sm text-gray-500">{crumbs.join(' / ')}</div>
);

export default PageBreadCrumb;
