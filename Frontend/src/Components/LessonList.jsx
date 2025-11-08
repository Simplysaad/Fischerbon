import React, { useState } from 'react';
import LessonBox from './LessonBox';

function LessonList({ course, enrollment, lessonIndex }) {
  const [showAll, setShowAll] = useState(false);

  // Calculate lessons to show depending on showAll toggle
  const lessonsToShow = showAll
    ? course.lessons
    : course.lessons.slice(
        lessonIndex > 2 ? lessonIndex - 2 : 0,
        lessonIndex < course.lessons.length - 2
          ? lessonIndex + 3
          : course.lessons.length
      );

  // The mapping index from the original lessons array, to correctly mark active
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
      <p
        className="text-blue-500 underline text-sm mt-2"
        onClick={() => setShowAll(!showAll)}
      >
        {showAll ? 'Show Less' : 'Load All'}
      </p>
    </section>
  );
}

LessonList.LessonListSkeleton = () => {
  return (
    <section className="w-full my-6 flex flex-col gap-2">
      {[...Array(5)].map(() => {
        return <LessonBox.LessonBoxSkeleton />;
      })}
    </section>
  );
};
export default LessonList;
