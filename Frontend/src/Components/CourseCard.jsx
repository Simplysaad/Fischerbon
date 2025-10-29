const getAverageRating = (ratings) => {
  if (!ratings?.length) return '5.0';
  const sum = ratings.reduce((acc, cur) => acc + cur.rating, 0);
  return (sum / ratings.length).toFixed(1);
};

import { Star } from 'lucide-react';
import formatCurrency from '../utils/formatCurrency';
import { Link } from 'react-router-dom';

const CourseCard = ({ course }) => {
  return (
    <div className="shadow w-[100%] p-4">
      <div className="card-image w-full overflow-hidden">
        <img
          src={course.thumbnailUrl || '/images/white-building-2.jpg'}
          alt="image"
        />
      </div>
      <div className="card-content py-4">
        <Link to={`/courses/${course.slug || course._id}`}>
          <h3 className="card-title text-[1.2rem]">{course.title}</h3>
        </Link>
        <p className="card-description py-2">
          {course.description?.split(' ').slice(0, 15).join(' ') + '...'}
        </p>
        <span className="flex gap-6 text-[1rem] ">
          <span className="card-duration text-nowrap">
            <Star className="inline text-yellow-500" fill="#ffa" size={12} />{' '}
            {getAverageRating(course.ratings)}
          </span>
          <span className="card-level">{formatCurrency(course.price)}</span>
        </span>
        <Link to={`/courses/${course.slug || course._id}`}>
          <button className="enroll-button w-full  px-4 py-2 my-4 hover:bg-blue-600 focus:bg-blue-600 text-white  bg-blue-500 rounded">
            Enroll Now
          </button>
        </Link>
      </div>
    </div>
  );
};

CourseCard.CourseCardSkeleton = () => {
  return (
    <div className="shadow w-[100%] p-4">
      <div className="card-image w-full overflow-hidden">
        <div className="w-full h-40 bg-gray-300 animate-pulse"></div>
      </div>
      <div className="card-content py-4">
        <div className="w-3/4 h-6 bg-gray-300 animate-pulse mb-2"></div>
        <div className="w-full h-4 bg-gray-300 animate-pulse mb-2"></div>
        <div className="w-full h-4 bg-gray-300 animate-pulse mb-2"></div>
        <div className="w-1/2 h-4 bg-gray-300 animate-pulse mb-4"></div>
        <div className="w-full h-10 bg-gray-300 rounded animate-pulse"></div>
      </div>
    </div>
  );
};

export default CourseCard;
