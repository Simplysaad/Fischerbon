import { useState } from 'react';
import DashboardLayout from './DashboardLayout';
import { useParams } from 'react-router-dom';
import { Play } from 'lucide-react';
import { navItems } from './Sidebar';
import AuthAlert from '../../Components/AuthAlert';

const courses = navItems.find((item) => item.dropdown).dropdown;
courses.forEach((course) => {
  for (let n = 1; n <= 4; n++) {
    course.lessons.push({
      title: `Lesson ${n}`,
      video: `/src/Pages/Dashboard/videos/%20%20(${n}).mp4`,
    });
  }
});

const Courses = () => {
  const params = useParams();

  let currentCourse =
    courses.find(
      (course) =>
        course.course
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^\w-]+/g, '') === params.courseId
    ) || courses[0];

  const [playVideo, setPlayVideo] = useState(false);
  const [video, setVideo] = useState();
  const [alert, setAlert] = useState('');

  console.log(params);
  console.log(currentCourse);
  console.log(params.courseId);

  return (
    <>
      {alert === 'playing' && (
        <AuthAlert
          header={'Video in play'}
          message={`Currently playing: ${currentCourse.lessons.find((item) => item.video === video).title} - ${currentCourse.course}`}
          iconType={'success'}
          border={'#3c97d0'}
          onClose={() => setAlert('')}
        />
      )}
      <DashboardLayout>
        <div className="bg-[#F1F2F3] text-dark md:flex md:pt-2 rounded-md">
          {!playVideo ? (
            <div className="flex flex-col h-full w-full no-scrollbar px-1.5 md:px-5">
              <h4 className="font-serif md:text-lg text-[15px] text-dark leading-9 m-1.5">
                <strong>
                  <em>{currentCourse.course}</em>{' '}
                </strong>{' '}
                - {currentCourse.lessons.length} Videos
              </h4>

              <table
                // className={`w-full bg-white ${currentCourse.status === 'closed' && 'hidden'} rounded-md`}
                className={`w-full bg-white rounded-md`}
              >
                <thead>
                  <tr className="text-sm *:p-3 md:text-[16px] text-[hsl(203,11%,45%)]">
                    <td>Lessons</td>
                    <td>Duration</td>
                    <td>Status</td>
                    <td>Action</td>
                  </tr>
                </thead>

                <tbody>
                  {currentCourse.lessons.map((item, index) => {
                    return (
                      <tr
                        key={index}
                        className={`*:px-3 *:md:my-4 *:my-3 ${index % 2 === 0 ? 'bg-[hsl(203,11%,89%)]' : 'bg-white'}`}
                      >
                        <td className="text-gray wrap-break-word text-xs md:text-[16px]">
                          {item.title}
                        </td>

                        <td className="text-primary text-xs md:text-[16px]">
                          {Math.floor(Math.random() * 60 + 1)
                            .toString()
                            .padStart(2, '0')}
                          :
                          {Math.floor(Math.random() * 60 + 1)
                            .toString()
                            .padStart(2, '0')}
                        </td>

                        <td>
                          <span className="bg-secondary rounded-full px-3 py-1 text-white md:text-[16px] text-xs">
                            Watched
                          </span>
                        </td>

                        <td
                          onClick={() => {
                            setVideo(item.video);
                            setAlert('playing');
                            setPlayVideo(true);
                          }}
                          title={`Play ${item.title}`}
                          className='cursor-pointer text-xs md:text-[16px] flex items-center text-center w-fit text-white hover:bg-primary gap-1 bg-primaryHover rounded-sm shadow-sm hover:shadow-md px-3 py-1 text-white"'
                        >
                          <span>
                            <Play
                              size={window.innerWidth > 769 ? 16 : 12}
                              fill={'white'}
                            />
                          </span>
                          <span>Play</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-5">
              <video
                className="w-screen rounded-md"
                width="100%"
                height="auto"
                controls
              >
                <source src={video} type="video/mp4"></source>
              </video>{' '}
              <section className="bg-[#F1F2F3]">
                {/* <h4 className="font-serif md:text-lg text-[15px] text-dark leading-9 m-1.5">
                  Video Information
                </h4> */}
              </section>
              <button
                onClick={() => setPlayVideo(false)}
                className={`py-3 px-5 bg-primary hover:bg-primaryHover cursor-pointer rounded-sm font-medium text-sm leading-6 text-white ease-in-out duration-300 mt-2`}
              >
                Back to Lessons
              </button>
            </div>
          )}
        </div>
      </DashboardLayout>
    </>
  );
};

export default Courses;
