import ProfileTemplate from '../../Components/ProfileTemplate';
import AdminDashboardLayout from './AdminDashboardLayout';
import { BookOpen, PersonStanding, Puzzle } from 'lucide-react';

const AdminProfile = () => {
  const stats = [
    { label: 'Challenges Posted', count: 10, icon: Puzzle },
    { label: 'Students Registered', count: 29, icon: PersonStanding },
    { label: 'Courses Created', count: 12, icon: BookOpen },
  ];

  let formData = {
    fullName: '',
    password: '',
    role: 'admin',
  };

  return (
    <>
      <AdminDashboardLayout>
        <ProfileTemplate
          form={formData}
          stats={stats}
          name={'Iskil Ismail'}
          email={'iskilismail@gmail.com'}
        />
      </AdminDashboardLayout>
    </>
  );
};

export default AdminProfile;
