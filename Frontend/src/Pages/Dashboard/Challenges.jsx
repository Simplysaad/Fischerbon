import { useState } from 'react';
import DashboardLayout from './DashboardLayout';

const Challenges = () => {
  const [index2, setIndex2] = useState(0);
  const [index3, setIndex3] = useState(0);
  const Images2d = [];
  const Images3d = [];
  for (let n = 1; n <= 15; n++) {
    Images2d.push(`/src/Pages/Dashboard/2d/%20%20(${n}).png`);
    Images3d.push(`/src/Pages/Dashboard/3d/%20%20(${n}).png`);
  }
  const stages = [
    {
      display: '2D',
      label: `2D Challenges`,
      current: `(${index2 + 1}/${Images2d.length})`,
    },
    {
      display: '3D',
      label: `3D Challenges`,
      current: `(${index3 + 1}/${Images3d.length})`,
    },
  ];
  const [current, setCurrent] = useState('2D');
  const imgStyle = 'rounded-lg';

  const Button = ({ value, array }) => {
    return (
      <>
        <button
          onClick={() => {
            current === '2D' && index2 > 0
              ? setIndex2((prev) => prev - 1)
              : current === '3D' && index3 > 0
                ? setIndex3((prev) => prev - 1)
                : '';
          }}
          className={`py-3 ${value < 1 ? 'bg-accent text-gray cursor-not-allowed' : 'bg-primary hover:bg-primaryHover cursor-pointer text-white'} md:px-10 px-6 rounded-md font-medium leading-6 ease-in-out duration-300`}
        >
          Previous
        </button>
        <button
          onClick={() => {
            current === '2D' && index2 < Images2d.length - 1
              ? setIndex2((prev) => prev + 1)
              : current === '3D' && index3 < Images3d.length - 1
                ? setIndex3((prev) => prev + 1)
                : '';
          }}
          className={`py-3 ${value + 1 === array.length ? 'bg-accent text-gray cursor-not-allowed' : 'bg-primary hover:bg-primaryHover cursor-pointer text-white'} md:px-10 px-6 rounded-md font-medium leading-6 ease-in-out duration-300`}
        >
          Next
        </button>
      </>
    );
  };
  return (
    <>
      <DashboardLayout>
        <div className="space-y-5">
          <section className="w-full flex md:sticky md:-top-3 bg-secondary rounded-md">
            {stages.map((stage, index) => {
              return (
                <div
                  key={index}
                  className={`text-center md:text-xl text-sm w-1/2 p-3 ${current === stage.display ? 'text-white' : 'text-primary bg-white cursor-pointer'} ${current === '3D' ? 'rounded-l-md' : current === '2D' ? 'rounded-r-md' : ''}`}
                  onClick={() => setCurrent(stage.display)}
                >
                  {stage.label}{' '}
                  <span>{current === stage.display && stage.current}</span>
                </div>
              );
            })}
          </section>

          <section>
            {current === '3D' ? (
              <img src={Images3d[index3]} className={imgStyle} />
            ) : (
              <img src={Images2d[index2]} className={imgStyle} />
            )}
          </section>

          <section className="flex justify-between md:mx-10 mx-5">
            {current === '2D' && <Button value={index2} array={Images2d} />}
            {current === '3D' && <Button value={index3} array={Images3d} />}
          </section>
        </div>
      </DashboardLayout>
    </>
  );
};

export default Challenges;
