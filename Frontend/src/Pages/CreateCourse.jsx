import React, { useState } from "react";
import axiosInstance from "../Config/axios.config";

const CreateCourse = () => {
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

    let response = await axiosInstance.post("/course/create", formdata);

    let data = await response.json();
    console.log(data);
  }

  function handleChange(e) {
    const { name, files, value } = e.target;
    if (name === "thumbnail") {
      setData({ ...data, file: files });
    } else {
      setData({ ...data, [name]: value });
    }
  }
  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <fieldset>
        <figcaption></figcaption>
        <div id="title">
          <label htmlFor="inputTitle">Title</label>
          <input
            value={title}
            onChange={(e) => handleChange(e)}
            type="text"
            id="inputTitle"
            placeholder="title"
          />
        </div>
        <div id="description">
          <label htmlFor="inputDescription">Description</label>
          <input
            value={description}
            onChange={(e) => handleChange(e)}
            type="text"
            id="inputDescription"
            placeholder="Description"
          />
        </div>
        <div id="price">
          <label htmlFor="inputPrice">Price</label>
          <input
            value={price}
            onChange={(e) => handleChange(e)}
            type="number"
            id="inputPrice"
            placeholder="price"
          />
        </div>

        <div id="thumbnail">
          <label htmlFor="inputThumbnail">thumbnail</label>
          <input
            value={thumbnail}
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
            value={level}
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
    </form>
  );
};

export default CreateCourse;
