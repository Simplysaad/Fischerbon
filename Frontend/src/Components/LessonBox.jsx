import { CircleCheck, Lock, Text, Video, Videotape } from 'lucide-react';
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
        <span className="status float-end">
          <Lock color="#fff" fill="#3c3" size={16} />
        </span>
      </li>
    );
  }
  return (
    <Link to={`/courses/${course.slug}/lessons/${lesson.slug}`}>
      <li
        className={`flex gap-2 shadow p-2 rounded justify-start items-center hover:border border-blue-300 ${isActive ? 'border-2 ' : ''}`}
      >
        <span className="min-w-[10%] rounded-full text-center text-3xl font-bold p-2 ">
          {idx + 1}
        </span>
        <span className="info w-full">
          <p className="text-">{lesson.title}</p>
          <p className="text-gray-400 text-[.9rem] flex gap-2 items-center">
            {lesson.content?.video ? (
              <>
                <Videotape size={12} />
                Video
              </>
            ) : (
              <>
                <Text size={12} />
                Reading
              </>
            )}
          </p>
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

LessonBox.LessonBoxSkeleton = () => {
  return (
    <div className="animate-pulse flex gap-2 shadow p-2 rounded justify-start items-center">
      <span className="min-w-[10%] rounded-full text-center text-3xl font-bold py-2  bg-gray-300">
        &nbsp;
      </span>
      <span className="info w-full">
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-2">&nbsp;</div>
        <div className="h-3 bg-gray-300 rounded w-1/2">&nbsp;</div>
      </span>
      <span className="status float-end">
        <div className="h-4 w-4 bg-gray-300 rounded-full">&nbsp;</div>
      </span>
    </div>
  );
};
export default LessonBox;
