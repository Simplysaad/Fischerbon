import { Link } from 'react-router-dom';

export default function EnrollmentCard({ enrollment }) {
  return (
    <div className=" py-6 border border-gray-300 rounded  px-4">
      <div className="course-details">
        <h2 className="">{enrollment.title}</h2>
        <span className="flex gap-3 text-gray-500 text-[.8rem] font-medium">
          <p className="instructor-name">Course</p>
          <p className="progress">{enrollment.progress}% completed</p>
        </span>
      </div>
      <div className="progress-bar py-2">
        <progress
          id={`progress-${enrollment._id}`}
          className="w-full bg-blue-500  h-4 rounded-full overflow-hidden"
          max="100"
          value={enrollment.progress}
        ></progress>
      </div>
      {enrollment.lastCompleted && (
        <div className="last-lesson px-4 py-2 border border-gray-300 rounded  md:flex justify-between items-center ">
          <span className=" font-medium">
            <p className="font-medium">{enrollment.lastCompleted?.title}</p>
            <p className="text-gray-500 text-[.8rem]  font-medium">video</p>
          </span>
          <Link
            to={`/courses/${enrollment.slug}/lessons/${enrollment.lastCompleted?.slug}`}
            className="inline-block px-4 py-2 max-md:mt-4 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition text-center text-[.8rem]"
          >
            Resume Course
          </Link>
        </div>
      )}
    </div>
  );
}
