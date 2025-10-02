import DashboardLayout from './DashboardLayout';
import { Book, BookOpen, Timer } from 'lucide-react';

import ProfileTemplate from '../../Components/ProfileTemplate';

const Profile = () => {
  const stats = [
    { label: 'Courses Taken', count: 29, icon: BookOpen },
    { label: 'Active Weeks', count: 6, icon: Timer },
    { label: 'Lessons Completed', count: 10, icon: Book },
  ];

  let formData = {
    fullName: '',
    password: '',
    role: 'student',
  };

  return (
    <>
      <DashboardLayout>
        <ProfileTemplate
          form={formData}
          stats={stats}
          name={'Abdulqoyum Amuda'}
          email={'mechseiko@gmail.com'}
        />
      </DashboardLayout>
    </>
  );
};

export default Profile;
