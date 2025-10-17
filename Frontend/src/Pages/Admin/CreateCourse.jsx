// import React, { useState } from 'react';
// import axiosInstance from '../../utils/axios.util';

// const levels = ['beginner', 'intermediate', 'advanced'];
// const payments = ['free', 'paid'];

// const CreateCourse = () => {
//   const [courseForm, setCourseForm] = useState({
//     title: '',
//     description: '',
//     price: 0,
//     payment: 'paid',
//     category: '',
//     level: 'beginner',
//   });
//   const [thumbnail, setThumbnail] = useState(null);
//   const [thumbnailPreview, setThumbnailPreview] = useState('');

//   const handleImageChange = (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     // Revoke previous URL if it exists
//     if (thumbnailPreview && thumbnailPreview.startsWith('blob:')) {
//       URL.revokeObjectURL(thumbnailPreview);
//     }

//     const previewURL = URL.createObjectURL(file);

//     setThumbnail(file);
//     setThumbnailPreview(previewURL);
//   };

//   const handleCourseSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const formdata = new FormData();

//       thumbnail && formdata.append('thumbnail', thumbnail, thumbnail.name)
//       // console.log(thumbnail);
//       for (const key in courseForm) {
//         formdata.append(key, courseForm[key]);
//       }

//       const entries = formdata.entries();
//       entries.forEach((element) => {
//         console.log(element);
//       });

//       const { data: response } = await axiosInstance.post(
//         '/courses/create',
//         formdata
//       );
//       console.log(response);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <form
//       id="courseForm"
//       onSubmit={(e) => handleCourseSubmit(e)}
//       className="mb-8 space-y-4"
//     >
//       <h2 className="text-xl font-semibold mb-4">Create New Course</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div>
//           <label className="block font-medium mb-1">Title</label>
//           <input
//             type="text"
//             className="w-full border rounded px-3 py-2"
//             value={courseForm.title}
//             onChange={(e) =>
//               setCourseForm({ ...courseForm, title: e.target.value })
//             }
//             required
//           />
//         </div>
//         <div>
//           <label className="block font-medium mb-1">Category</label>
//           <input
//             type="text"
//             className="w-full border rounded px-3 py-2"
//             value={courseForm.category}
//             onChange={(e) =>
//               setCourseForm({ ...courseForm, category: e.target.value })
//             }
//             placeholder="e.g. AutoCAD"
//           />
//         </div>
//         <div>
//           <label className="block font-medium mb-1">Level</label>
//           <select
//             className="w-full border rounded px-3 py-2"
//             value={courseForm.level}
//             onChange={(e) =>
//               setCourseForm({ ...courseForm, level: e.target.value })
//             }
//             required
//           >
//             {levels.map((lvl) => (
//               <option key={lvl} value={lvl}>
//                 {lvl.charAt(0).toUpperCase() + lvl.slice(1)}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div>
//           <label className="block font-medium mb-1">Payment</label>
//           <select
//             className="w-full border rounded px-3 py-2"
//             value={courseForm.payment}
//             onChange={(e) =>
//               setCourseForm({ ...courseForm, payment: e.target.value })
//             }
//             required
//           >
//             {payments.map((pay) => (
//               <option key={pay} value={pay}>
//                 {pay.charAt(0).toUpperCase() + pay.slice(1)}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div>
//           <label className="block font-medium mb-1">Price (USD)</label>
//           <input
//             type="number"
//             min="0"
//             className="w-full border rounded px-3 py-2"
//             value={courseForm.price}
//             onChange={(e) =>
//               setCourseForm({
//                 ...courseForm,
//                 price: parseFloat(e.target.value),
//               })
//             }
//             disabled={courseForm.payment === 'free'}
//             required={courseForm.payment !== 'free'}
//           />
//         </div>
//         <div>
//           <label className="block font-medium mb-1">Thumbnail</label>
//           <input
//             type="file"
//             accept="image/*"
//             className="w-full border rounded px-3 py-2"
//             onChange={handleImageChange}
//           />
//           {thumbnailPreview && (
//             <img
//               src={thumbnailPreview}
//               alt="Thumbnail Preview"
//               className="mt-2 rounded max-h-32 object-contain"
//             />
//           )}
//         </div>
//       </div>
//       <div>
//         <label className="block font-medium mb-1">Description</label>
//         <textarea
//           className="w-full border rounded px-3 py-2"
//           rows={4}
//           value={courseForm.description}
//           onChange={(e) =>
//             setCourseForm({
//               ...courseForm,
//               description: e.target.value,
//             })
//           }
//         />
//       </div>
//       <button
//         type="submit"
//         className="bg-blue-600 text-white rounded px-6 py-3 mt-2 hover:bg-blue-700 font-semibold"
//       >
//         Create Course
//       </button>
//     </form>
//   );
// };

// export default CreateCourse;

import React, { useState } from 'react';
import axiosInstance from '../../utils/axios.util';

function CourseCreateForm() {
  const [thumbnail, setThumbnail] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (thumbnail) {
      formData.append('thumbnail', thumbnail, thumbnail.name);
    }
    formData.append('title', title);
    formData.append('description', description);
    formData.append('price', price);

    try {
      const response = await axiosInstance.post('/courses/create', formData);

      if (response.success) {
        console.log(response);
        alert('Course created successfully!');
      } else {
        alert('Failed to create course.');
      }
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <div>
        <label>Thumbnail (image):</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setThumbnail(e.target.files[0])}
          required
        />
      </div>

      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Price:</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>

      <button type="submit">Create Course</button>
    </form>
  );
}

export default CourseCreateForm;
