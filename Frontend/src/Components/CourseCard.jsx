import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';

export default function CourseCard({ course }) {
  const getAverageRating = (ratings) => {
    if (!ratings?.length) return '5.0';
    const sum = ratings.reduce((acc, cur) => acc + cur.rating, 0);
    return (sum / ratings.length).toFixed(1);
  };
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden h-ful hover:shadow-lg transition cursor-pointer">
      <img
        src={course.image}
        alt={course.title}
        className="w-full h-40 object-cover"
      />
      <div className="p-4 flex flex-col justify-between h-52">
        <div>
          <h3 className="text-xl font-semibold mb-1 text-gray-900">
            {course.title}
          </h3>
          <p className="text-gray-600 text-sm mb-2">{course.description}</p>
        </div>
        <div className="flex  items-center justify-start gap-2 text-gray-700 text-sm font-medium">
          {/* <span>Duration: {course.duration}</span> */}
          {/* {course.certified && (
            <span className="text-yellow-600 font-semibold">Certificate</span>
          )} */}
          <span className="font-semibold flex gap-1 items-center">
            <span className="">{getAverageRating(course.ratings)}</span>
            <span className="text-yellow-600">
              <Star className="text-yellow-600" size={10} fill="#df0" />
            </span>
          </span>
          <span> ${(course.price ?? 10) * 1 - 0.01}</span>
        </div>
        <Link to={`/courses/${course._id}`}>
          <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold transition">
            Learn More
          </button>
        </Link>
      </div>
    </div>
  );
}
