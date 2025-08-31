import React, { useState } from "react";
import axiosInstance from "../Config/axios.config";

const CreateCourse = () => {
  const [thumbnail, setThumbnail] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState();
  //   const [category, setCategory] = useState(0);
  //   const [tags, setTags] = useState([]);
  const [level, setLevel] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("title", title);
    formdata.append("level", level);
    formdata.append("description", description);
    formdata.append("price", price);
    // formdata.append("category", category);
    // formdata.append("tags", tags);

    if (thumbnail) formdata.append("thumbnail", thumbnail);

    let response = await axiosInstance.post("/course/create", formdata);

    let data = await response.json();
    console.log(data);
  }
  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <fieldset>
        {/* const {(title, description, price, category, tags, level)} =req.body; */}

        <figcaption></figcaption>
        <div id="title">
          <label htmlFor="inputTitle">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            id="inputTitle"
            placeholder="title"
          />
        </div>
        <div id="description">
          <label htmlFor="inputDescription">Description</label>
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            type="text"
            id="inputDescription"
            placeholder="Description"
          />
        </div>
        <div id="price">
          <label htmlFor="inputPrice">Price</label>
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type="number"
            id="inputPrice"
            placeholder="price"
          />
        </div>

        {/* <div id="thumbnail">
          <label htmlFor="inputThumbnail">thumbnail</label>
          <input
            value={thumbnail}
            onChange={(e) => setThumbnail(e.target.files[0])}
            type="file"
            accept="image/*"
            id="inputThumbnail"
            placeholder="thumbnail"
          />
        </div> */}

        <div id="level">
          <select
            name="level"
            // value={e.target.value}
            onChange={(e) => setLevel(e.target.value)}
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
