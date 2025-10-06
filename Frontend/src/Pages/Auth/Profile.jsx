// import DashboardLayout from './DashboardLayout';
import { Book, BookOpen, Timer } from 'lucide-react';

import ProfileTemplate from '../../Components/ProfileTemplate';
import getUserDetails from '../../utils/getUserdetails';
import { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axios.util';
import DashboardLayout from '../Dashboard/DashboardLayout';
import { Link } from 'react-router-dom';

// name, email, role
// enrollments -> courses , percentage completed, last accessed
// challenges -> solved, pending, leaderboard rank

const dummyDetails = {
  name: 'saad idris',
  emailAddress: 'saadidris23@gmail.com',
  role: 'student',
  courses: [
    {
      id: 'xyz',
      title: 'AutoCAD 3D Essentials ',
      percentageCompleted: 43,
      lastAccesssed: new Date(),
      thumbnailUrl: 'http://placehold.co/600/400',
    },
  ],
  stats: [
    { label: 'Courses Taken', count: 29, icon: BookOpen },
    { label: 'Active Weeks', count: 6, icon: Timer },
    { label: 'Lessons Completed', count: 10, icon: Book },
  ],
};

const Profile = () => {
  const [currentUserDetails, setCurrentUserDetails] = useState({});
  useEffect(() => {
    // const details = axiosInstance.get('/auth/profile');
    // if (!details) return null;

    setCurrentUserDetails(dummyDetails); // details actually!
  }, []);

  let formData = {
    fullName: '',
    password: '',
    role: 'student',
  };
  const { name, emailAddress, role, stats, courses } = currentUserDetails;

  return (
    <>
      <DashboardLayout>
        <ProfileTemplate
          form={formData}
          stats={stats}
          name={name}
          email={emailAddress}
        />
        <section>
          {courses?.length === 0 ? (
            <p>You have not enrolled in any courses</p>
          ) : (
            <ul>
              {courses?.map((course) => {
                return (
                  <li key={course.id}>
                    <Link to={`/courses/${course.id}`}>
                      {course.id}
                      <img src={course.thumbnailUrl} alt={course.title} />
                      <h5>{course.title}</h5>
                      <h4>{`${course.percentageCompleted}% completed`}</h4>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </DashboardLayout>
    </>
  );
};

export default Profile;
