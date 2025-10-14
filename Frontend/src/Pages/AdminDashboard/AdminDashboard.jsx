import React from 'react';
import AdminDashboardLayout from './AdminDashboardLayout';
import { navItems } from './AdminSidebar';
import Actions from '../../Components/Actions';

const AdminDashboard = () => {
  return (
    <>
      <AdminDashboardLayout>
        <Actions actions={navItems} />
      </AdminDashboardLayout>
    </>
  );
};

export default AdminDashboard;
