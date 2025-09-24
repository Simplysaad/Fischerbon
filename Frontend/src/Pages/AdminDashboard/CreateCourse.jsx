import React, { useState } from "react";
// import axiosInstance from "../Config/axios.config";
import AdminDashboardLayout from "./AdminDashboardLayout";
import {
  BookOpen,
} from 'lucide-react';
import Start from "./Start";
import AuthAlert from "../../Components/AuthAlert";
import AdminButton from "./AdminButton";

const CreateCourse = () => {

  const [state, setState] = useState( true );
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);

  const [data, setData] = useState({
    title: "",
    description: "",
    price: "",
    thumbnail: File,
    category: "",
    level: "",
    // tags: [],
    // file: null
  });

  const handleInputChange = (e) => {
    const { name, files, value } = e.target;
    if (name === "thumbnail") {
      setData({ ...data, file: files });
    } else {
      setData({ ...data, [name]: value });
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const inputName = e.target.name;
    // if (!file) return;
    const previewURL = URL.createObjectURL(file);

    setThumbnail(file);
    setThumbnailPreview(previewURL);
    
    setData((prev) => ({
      ...prev,
      [inputName]: file,
      [`${inputName}Preview`]: previewURL,
    }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    // const { title, level, description, price, category, tags } = data;

    // const formdata = new FormData();
    
    // formdata.append("title", title);
    // formdata.append("level", level);
    // formdata.append("description", description);
    // formdata.append("price", price);
    // formdata.append("category", category);
    // formdata.append("tags", tags);
    // if (data.thumbnail) formdata.append("thumbnail", thumbnail);

    // let response = await axiosInstance.post("https://fischerbon.onrender.com/course/create", formdata);
    // let data = await response.json();
    // console.log(data);
  }

  const labelStyle = "text-gray font-serif leading-9 md:text-lg text-md";
  const inputStyle = "w-full p-3 border-2 border-[#C8CDD0] rounded-lg outline-none placeholder:text-[#ACB4B9] text-[16px] leading-6 focus:border-primary transition-colors duration-200 ease-in-out"

  return (
    <>
      <AdminDashboardLayout>
      <div className="md:bg-[#F1F2F3] bg-none rounded-lg md:p-3">
        {state ? 
        <Start Icon={BookOpen} message="You haven't created any course yet" button="Create your first course" onClick={() => setState(false)}/>

          :
        
        <form onSubmit={(e) => handleSubmit(e)} className="space-y-5 mt-5 p-5 bg-white rounded-lg">
            <div>
              <label
                htmlFor="title"
                className={labelStyle}
              >
                Course Title
              </label>
              <input
                type="text"
                id="title"
                onChange={handleInputChange}
                placeholder="Enter a title for the course"
                className={inputStyle}
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className={labelStyle}
              >
                Course Description
              </label>
              <input
                type="text"
                id="description"
                onChange={handleInputChange}
                placeholder="Enter a description title for the course"
                className={inputStyle}
              />
            </div>

            <div>
              <label
                htmlFor="price"
                className={labelStyle}
              >
                Course Price
              </label>
              <input
                type="number"
                id="price"
                onChange={handleInputChange}
                placeholder="Enter a price for the course"
                className={inputStyle}
              />
            </div>

            <div>
              <label
                htmlFor="thumbnail"
                className={labelStyle}
              >
                Upload Thumbnail
              </label>
              <input
                id="thumbnail"
                onChange={() => {
                  handleImageChange
                }}
                name="thumbnail"
                type="file"
                accept="image/*"
                placeholder="Upload a thumbnail image for the course"
                className={inputStyle}
              />
              {/* {data.thumbnail && ( */}
                <img
                  src={data.thumbnailPreview}
                  className="w-full"
                  alt="thumbnail"
                />
              {/* )} */}
            </div>

            <div>
              <label
                id="level"
                className={labelStyle}
              >
                Level
              </label>
              <select
                name="level"
                onChange={handleInputChange}
                placeholder="Enter a price for the course"
                className={inputStyle}
                id="selectLevel"
              >
                <option value="beginner">beginner</option>
                <option value="intermediate">intermediate</option>
                <option value="advanced">advanced</option>
              </select>
            </div>

            <AdminButton text={state ? 'Creating Course...' : 'Create Course'} disabled={state}/>
        </form> 
        }
      </div>
      </AdminDashboardLayout>
    </>
  );
};

export default CreateCourse;
