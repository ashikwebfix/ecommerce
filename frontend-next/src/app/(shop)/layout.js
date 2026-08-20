"use client";
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MobileBottomNav from '@/components/MobileBottomNav';
import Maintenance from '../Maintenance';

export default function ShopLayout({ children }) {
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [maintenanceMessage, setMaintenanceMessage] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchMaintenance = async () => {
      try {
        const res = await fetch((process.env.NEXT_PUBLIC_API_URL || 'http://localhost:6710') + '/api/settings/general_settings');
        if (res.ok) {
          const data = await res.json();
          if (data && data.maintenanceMode) {
            setMaintenanceMode(true);
            setMaintenanceMessage(data.maintenanceMessage);
          }
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchMaintenance();

    if (typeof window !== 'undefined') {
      const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
      setIsAdmin(userInfo?.isAdmin || userInfo?.role === 'superadmin' || userInfo?.role === 'admin');
    }
  }, []);

  if (maintenanceMode && !isAdmin) {
    return <Maintenance message={maintenanceMessage} />;
  }

  return (
    <>
      <Navbar />
      <div className="page-wrapper">{children}</div>
      <Footer />
      <MobileBottomNav />
    </>
  );
}
