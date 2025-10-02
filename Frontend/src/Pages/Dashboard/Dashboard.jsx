import React from 'react';
import DashboardLayout from './DashboardLayout';
import DashboardChart from './DashboardChart';
import { navItems } from './Sidebar';
import Actions from '../../Components/Actions';

const Dashboard = () => {
  return (
    <>
      <DashboardLayout>
        <div>
          <section className="w-full">
            <DashboardChart />
          </section>

          <section className="w-full">
            <Actions actions={navItems} />
          </section>
        </div>
      </DashboardLayout>
    </>
  );
};

export default Dashboard;
