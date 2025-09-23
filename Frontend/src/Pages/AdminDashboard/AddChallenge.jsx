import React from 'react';
import AdminDashboardLayout from './AdminDashboardLayout';
import Start from './Start';
import { Puzzle } from 'lucide-react';
import AuthAlert from '../../Components/AuthAlert';

const AddChallenge = () => {
    return (
        <>
            <AdminDashboardLayout>
                <div>
                    <Start Icon={Puzzle} message="You haven't posted any challenge yet" button="Post your first challenge" onClick={() => alert("You can post your first challenge here")}/>
                </div>
            </AdminDashboardLayout>
        </>
    );
}

export default AddChallenge;