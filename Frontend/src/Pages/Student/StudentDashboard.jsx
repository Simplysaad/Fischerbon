import React from 'react';

const dashboardInfo = {
  name: 'saad idris',
  role: 'student',
  emailAddress: 'saadidris23@gmail.com',
  enrollments: [
    {
      title: 'AutoCAD 3D Essentials',
      description: 'lorem ipsum dolor sit amet',
      thumbnailUrl: 'https://placehold.co/400',
      percentageCompleted: 23,
    },
  ],
  stats: [
    {
      label: 'Courses completed',
      value: 1,
    },
    {
      label: 'Enrollments',
      value: 39,
    },
  ],
};

const StudentDashboard = () => {
  return <div>StudentDashboard</div>;
};

export default StudentDashboard;
