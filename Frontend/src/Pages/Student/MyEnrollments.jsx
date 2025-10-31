import { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axios.util';

const MyCourses = () => {
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const { data: responseData } = await axiosInstance.get('/enrollments');
        setEnrollments(responseData.data);
      } catch (error) {
        console.error('Failed to fetch enrollments:', error);
      }
    };

    fetchEnrollments();
  }, []);

  const courses = enrollments.map((enrollment) => enrollment.courseId);
  console.log(courses);
  return (
    <div>
      <h1>My Courses</h1>

      {courses.length === 0 ? (
        <p>You are not enrolled in any courses.</p>
      ) : (
        <ul className="flex p-2">
          {courses.map((course) => (
            <li className="p-2 rounded border" key={course._id}>
              <img src={course.thumbnailUrl} alt={course.title} />
              <h2>{course.title}</h2>
              <p>{course.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyCourses;
