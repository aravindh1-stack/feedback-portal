import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const MainLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { pathname } = useLocation();
  const link = (to: string, label: string) => (
    <Link
      to={to}
      className={`px-3 py-2 rounded hover:bg-gray-200 ${pathname === to ? 'font-semibold underline' : ''}`}
    >
      {label}
    </Link>
  );
  return (
    <div className="min-h-screen grid grid-rows-[auto_1fr]">
      <header className="flex items-center gap-4 p-4 bg-white border-b">
        <h1 className="text-xl font-bold">College Feedback Portal</h1>
        <nav className="flex gap-2 ml-6">
          {link('/dashboard', 'Dashboard')}
          {link('/forms', 'Forms')}
          {link('/analytics', 'Analytics')}
          {link('/settings', 'Settings')}
        </nav>
      </header>
      <main className="p-4">{children}</main>
    </div>
  );
};
