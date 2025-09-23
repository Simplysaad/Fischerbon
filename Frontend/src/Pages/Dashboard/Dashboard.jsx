import React from 'react';
import DashboardLayout from './DashboardLayout';
import {Link} from 'react-router-dom';
import * as lucide from 'lucide-react';


const Dashboard = () => {
    // useEffect() to check authentication status
    // GET /auth/status
    // success: bool
    // message: string
    return (
        <>
            <DashboardLayout>
                <section>
                    Dashboard
                </section>
            </DashboardLayout>
        </>
    );
}

export default Dashboard;
