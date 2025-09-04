import React from 'react';

const ComponentCard: React.FC<React.PropsWithChildren<{ title?: string }>> = ({ title, children }) => (
  <section className="bg-white border rounded p-4 shadow-sm">
    {title && <h2 className="font-semibold mb-2">{title}</h2>}
    {children}
  </section>
);

export default ComponentCard;
