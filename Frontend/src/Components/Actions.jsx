import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Actions = ({ actions }) => {
  return (
    <>
      <div className="grid lg:grid-cols-2 grid-cols-1 md:gap-5">
        {actions
          .filter((action) => action.label)
          .map((action, index) => {
            const Icon = action.icon;
            return (
              <div key={index}>
                <div className="flex md:flex-row flex-col w-full md:mb-0 mb-5">
                  <div className="md:rounded-l-lg md:rounded-tr-none rounded-t-lg h-[100px] flex md:py-20 py-15 md:w-[35%] w-full text-white bg-primary hover:bg-primaryHover duration-300 ease-in-out text-center items-center justify-center">
                    <Icon size={60} />
                  </div>

                  <div className="md:rounded-r-lg md:rounded-bl-none rounded-b-lg md:h-[160px] md:w-[65%] w-full bg-[#F1F2F3] p-5 flex flex-col justify-between">
                    <div>
                      <h4 className="text-dark leading-10 text-xl font-bold">
                        {`${index + 1}. ${action.label}`}
                      </h4>
                      <p className="text-gray mb-1 md:mb-0 text-md">
                        {action.description}
                      </p>
                    </div>

                    <Link to={action.link}>
                      <p className="mt-3 flex md:text-[16px] text-sm hover:scale-x-[102%] hover:text-primaryHover text-primary duration-300 ease-in-out cursor-pointer items-center gap-2">
                        <span>{action.button}</span>
                        <span>
                          <ArrowRight size="20" />
                        </span>
                      </p>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Actions;
