import React, { useState } from "react";
// import axiosInstance from "../Config/axios.config";
import AdminDashboardLayout from "./AdminDashboardLayout";
import {
  BookOpen,
} from 'lucide-react';
import Start from "./Start";
// import { Controller, Control, useFormContext } from 'react-hook-form';
import AuthAlert from "../../Components/AuthAlert";

const CreateCourse = () => {

  // const {
  //   formState: { errors },
  // } = useFormContext();

  const [data, setData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    level: "",
    tags: [],
    file: null
  });

  async function handleSubmit(e) {
    e.preventDefault();
    const { title, level, description, price, category, tags } = data;

    const formdata = new FormData();

    formdata.append("title", title);
    formdata.append("level", level);
    formdata.append("description", description);
    formdata.append("price", price);
    // formdata.append("category", category);
    // formdata.append("tags", tags);

    if (data.thumbnail) formdata.append("thumbnail", thumbnail);

    // let response = await axiosInstance.post("/course/create", formdata);

    // let data = await response.json();
    // console.log(data);
  }
  
  const [createdCourses, setCreatedCourses] = useState(0);

  function handleChange(e) {
    const { name, files, value } = e.target;
    if (name === "thumbnail") {
      setData({ ...data, file: files });
    } else {
      setData({ ...data, [name]: value });
    }
  }
  return (
    <>
      <AdminDashboardLayout>
      <section>
        {createdCourses === 0 ? 
        <Start Icon={BookOpen} message="You haven't created any course yet" button="Create your first course" onClick={() => setCreatedCourses(prev=>prev+1)}/>

          :
        
        <form onSubmit={(e) => handleSubmit(e)} className="text-center items-center">
          <fieldset>
            <figcaption></figcaption>
            <div id="title">
              <label htmlFor="inputTitle">Title</label>
              <input
                // value={title}
                onChange={(e) => handleChange(e)}
                type="text"
                id="inputTitle"
                placeholder="title"
              />
            </div>
            <div id="description">
              <label htmlFor="inputDescription">Description</label>
              <input
                // value={description}
                onChange={(e) => handleChange(e)}
                type="text"
                id="inputDescription"
                placeholder="Description"
              />
            </div>
            <div id="price">
              <label htmlFor="inputPrice">Price</label>
              <input
                // value={price}
                onChange={(e) => handleChange(e)}
                type="number"
                id="inputPrice"
                placeholder="price"
              />
            </div>

            <div id="thumbnail">
              <label htmlFor="inputThumbnail">thumbnail</label>
              <input
                // value={thumbnail}
                onChange={(e) => {
                  setThumbnail(e.target.files[0]);
                }}
                type="file"
                accept="image/*"
                id="inputThumbnail"
                placeholder="thumbnail"
              />
            </div>
            {console.log("hello world")}
            <div id="level">
              <select
                name="level"
                // value={level}
                onChange={(e) => handleChange(e)}
                id="selectLevel"
              >
                <option value="beginner">beginner</option>
                <option value="intermediate">intermediate</option>
                <option value="advanced">advanced</option>
              </select>
            </div>
          </fieldset>

          <div className="button-container">
            <button>Submit</button>
          </div>
          <div className="flex items-center justify-between gap-2">
        <div>
          <h4 className="text-[#2F3437] font-medium text-2xl leading-9">
            Basic Information
          </h4>
          <p className="text-[#75828A] text-base leading-6">
            Provide the essential details about your IP
          </p>
        </div>
        <p className="cursor-pointer text-primary text-base leading-6">
          Save to draft
        </p>
      </div>
      <div className="flex flex-col gap-y-6 mt-7">
        <div>
          <label
            htmlFor="title"
            className="text-[#2F3437] font-medium leading-6"
          >
            Copyright Title
          </label>
          <Controller
            name="basicInfo.title"
            control={control}
            rules={{ required: 'Copyright Title is required' }}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                id="title"
                placeholder="Enter a descriptive title for your copyright"
                className="w-full p-3 border-2 border-[#C8CDD0] rounded-lg outline-none placeholder:text-[#ACB4B9] text-[16px] leading-6 focus:border-primary transition-colors duration-200 ease-in-out"
              />
            )}
          />
          {errors.basicInfo?.title && (
            <p className="text-red-500 text-sm mt-2">
              {errors.basicInfo.title.message}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="desc"
            className="text-[#2F3437] font-medium leading-6"
          >
            Description
          </label>
          <Controller
            name="basicInfo.description"
            control={control}
            rules={{ required: 'Description is required' }}
            render={({ field }) => (
              <textarea
                {...field}
                id="desc"
                placeholder="Provide a clear description of your copyright"
                className="w-full p-3 border-2 border-[#C8CDD0] rounded-lg outline-none placeholder:text-[#ACB4B9] text-[16px] leading-6 focus:border-primary transition-colors duration-200 ease-in-out"
              />
            )}
          />
          {errors.basicInfo?.description && (
            <p className="text-red-500 text-sm mt-2">
              {errors.basicInfo.description.message}
            </p>
          )}
        </div>
      </div>
      <div className="mt-7">
        <h4 className="text-[#2F3437] font-medium text-2xl leading-9">
          Milestones (Optional)
        </h4>
        <p className="text-[#75828A] text-base leading-6">
          Set milestone for your idea
        </p>
        <div className="flex flex-col gap-y-6 mt-7">
          <div>
            <label
              htmlFor="milestone"
              className="text-[#2F3437] font-medium leading-6"
            >
              Milestone Title
            </label>
            <Controller
              name="basicInfo.milestone"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  id="milestone"
                  placeholder="Enter milestone name"
                  className="w-full p-3 border-2 border-[#C8CDD0] rounded-lg outline-none placeholder:text-[#ACB4B9] text-[16px] leading-6 focus:border-primary transition-colors duration-200 ease-in-out"
                />
              )}
            />
          </div>
          <div>
            <label
              htmlFor="brief"
              className="text-[#2F3437] font-medium leading-6"
            >
              Description
            </label>
            <Controller
              name="basicInfo.milestoneDescription"
              control={control}
              render={({ field }) => (
                <textarea
                  {...field}
                  id="brief"
                  placeholder="Provide a brief description of your idea"
                  className="w-full p-3 border-2 border-[#C8CDD0] rounded-lg outline-none placeholder:text-[#ACB4B9] text-[16px] leading-6 focus:border-primary transition-colors duration-200 ease-in-out"
                />
              )}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="date"
              className="text-[#2F3437] font-medium leading-6 block mb-2"
            >
              Target Date
            </label>
            <div className="relative">
              <Controller
                name="basicInfo.targetDate"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="date"
                    id="date"
                    ref={dateInputRef}
                    placeholder="Enter milestone name"
                    className="w-full pl-3 pr-12 py-3 border-2 border-[#C8CDD0] rounded-lg outline-none placeholder:text-[#ACB4B9] text-[16px] leading-6 focus:border-primary transition-colors duration-200 ease-in-out [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-inner-spin-button]:hidden [&::-webkit-clear-button]:hidden"
                  />
                )}
              />
              <div
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={handleCalendarClick}
              >
                <Calendar size="20" color="#ACB4B9" />
              </div>
            </div>
          </div>
        </div>
      </div>
        </form> 
        
        }
      </section>
      </AdminDashboardLayout>
    </>
  );
};

export default CreateCourse;
