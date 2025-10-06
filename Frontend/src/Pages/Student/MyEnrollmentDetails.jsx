import React from 'react';

const enrollmentDetails = {
  completedLessons: 23,
  course: {
    title: 'AutoCAD 3D Essentials',
    description: 'lorem ipsum ',
    lessons: [
      {
        title: 'Introduction',
        video: 'https://placehold.co/400',
        text: 'lorem ipsum 1000',
      },
    ],
  },
  status: 'abandoned',
};

const MyEnrollmentDetails = () => {
  return <div>MyEnrollmentDetails</div>;
};

export default MyEnrollmentDetails;
