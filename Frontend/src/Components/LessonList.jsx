import React, { useState } from 'react';
import LessonBox from './LessonBox';

function LessonList({ course, enrollment, lessonIndex }) {
  const [showAll, setShowAll] = useState(false);

  if (!course || !course.lessons) return null;

  const lessonsToShow = showAll
    ? course.lessons
    : course.lessons.slice(
        lessonIndex > 2 ? lessonIndex - 2 : 0,
        lessonIndex < course.lessons.length - 2
          ? lessonIndex + 3
          : course.lessons.length
      );

  const startIndex = showAll ? 0 : lessonIndex > 2 ? lessonIndex - 2 : 0;

  return (
    <section className="w-full my-6 flex flex-col gap-2">
      {lessonsToShow.length > 0 &&
        lessonsToShow.map((lesson, idx) => {
          const actualIdx = startIndex + idx;
          return (
            <LessonBox
              enrollment={enrollment}
              key={actualIdx}
              idx={actualIdx}
              isActive={lessonIndex === actualIdx}
              lesson={lesson}
              course={course}
            />
          );
        })}
      <button
        className="text-blue-500 underline text-sm mt-2 cursor-pointer bg-transparent border-none p-0"
        onClick={() => setShowAll(!showAll)}
      >
        {showAll ? 'Show Less' : 'Load All'}
      </button>
    </section>
  );
}

LessonList.LessonListSkeleton = () => {
  return (
    <section className="w-full my-6 flex flex-col gap-2">
      {[...Array(5)].map((_, idx) => {
        return <LessonBox.LessonBoxSkeleton key={idx} />;
      })}
    </section>
  );
};
export default LessonList;
