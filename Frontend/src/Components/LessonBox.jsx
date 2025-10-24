import { CircleCheck, Lock } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

const LessonBox = ({ idx, enrollment, isActive, lesson, course }) => {
  if (!enrollment) {
    return (
      <li className="flex gap-2 shadow p-2 rounded justify-start items-center">
        <span className="min-w-[10%] rounded-full text-center text-3xl font-bold py-2">
          {idx + 1}
        </span>
        <span className="info w-full">
          <p className="text-">{lesson.title}</p>
          <p className="text-gray-400 text-[.9rem]">video</p>
        </span>
        {/* <span className="status float-end">
          <CircleCheck color="#fff" fill="#3c3" size={16} />
        </span> */}
      </li>
    );
  }
  return (
    <Link to={`/courses/${course.slug}/lessons/${lesson.slug}`}>
      <li
        className={`flex gap-2 shadow p-2 rounded justify-start items-center hover:border border-blue-300 ${isActive ? 'border-2 ' : ''}`}
      >
        <span className="min-w-[10%] rounded-full text-center text-3xl font-bold py-2">
          {idx + 1}
        </span>
        <span className="info w-full">
          <p className="text-">{lesson.title}</p>
          <p className="text-gray-400 text-[.9rem]">video</p>
        </span>
        <span className="status float-end">
          {enrollment?.completedLessons.find(
            (l) => l.lessonId === lesson._id
          ) ? (
            <CircleCheck color="#fff" fill="#3c3" size={16} />
          ) : (
            <Lock size={16} />
          )}
        </span>
      </li>
    </Link>
  );
};

export default LessonBox;

//  onClick={() => {
//                     console.log(lesson.title);
//                     console.log(
//                       `/courses/${courseId}/lessons/${course.lessons[idx]._id}`
//                     );
//                     navigate(
//                       `/courses/${courseId}/lessons/${course.lessons[idx]._id}`
//                     );
//                   }}
