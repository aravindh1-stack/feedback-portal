import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import Dashboard from '../pages/Dashboard';
import Forms from '../pages/Forms';
import Analytics from '../pages/Analytics';
import Settings from '../pages/Settings';

export const AppRoutes: React.FC = () => (
  <MainLayout>
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/forms" element={<Forms />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="*" element={<div className="p-6">Not Found</div>} />
    </Routes>
  </MainLayout>
);
