import { useState, useEffect } from 'react';
import AdminDashboardLayout from './AdminDashboardLayout';
import AuthAlert from '../../Components/AuthAlert';
import AdminButton from './AdminButton';
import { useNavigate } from 'react-router-dom';
import objectToFormData from '../../utils/objectToFormdata';
import axiosInstance from '../../utils/axios.util';

const CreateCourse = () => {
  const navigate = useNavigate;
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState('');
  const [lessonCount, setLessonCount] = useState(0);

  const [data, setData] = useState({
    title: '',
    description: '',
    price: '',
    thumbnail: File,
    lessonTitles: [],
    lessonVideos: [],
  });

  const adjustFormArrayLength = (arrayName, targetLength) => {
    setData((prevForm) => {
      const currentArray = prevForm[arrayName] || [];
      const newArray = currentArray.slice(0, targetLength);
      while (newArray.length < targetLength) {
        newArray.push('');
      }
      return {
        ...prevForm,
        [arrayName]: newArray,
      };
    });
  };

  useEffect(() => {
    adjustFormArrayLength('lessons', parseInt(lessonCount) || 0);
  }, []);

  const handleInputChange = (e) => {
    const { name, files, value } = e.target;
    if (name === 'thumbnail') {
      setData({ ...data, file: files });
    } else {
      setData({ ...data, [name]: value });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!data.title.trim()) newErrors.title = 'Course title is required';
    if (!data.description.trim())
      newErrors.description = 'Course Description is required';
    if (!data.price.trim()) newErrors.price = 'Course Price is required';
    return newErrors;
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const inputName = e.target.name;
    if (!file) return;
    const previewURL = URL.createObjectURL(file);
    setThumbnail(file);
    setThumbnailPreview(previewURL);
    setData((prevForm) => ({
      ...prevForm,
      [inputName]: file,
      [`${inputName}Preview`]: previewURL,
    }));
  };

  const handleArrayChange = (arrayName, index, value) => {
    setData((prevForm) => {
      const updatedArray = [...(prevForm[arrayName] || [])];
      updatedArray[index] = value;
      return {
        ...prevForm,
        [arrayName]: updatedArray,
      };
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);

    const { lessonTitles, lessonVideos, ...newData } = data;
    const newForm = objectToFormData(newData);
    try {
      // const response = await fetch(`${BASE_URL}/courses/create`, {
      //   method: 'POST',
      //   credentials: 'include',
      //   headers: {
      //     'Content-Type': 'multipart/formdata',
      //   },
      //   body: newForm,
      // });

      const response = await axiosInstance.post('/courses/create', newForm, {
        headers: { 'Content-Type': 'multipart/formdata' },
      });

      const result = await response.json();
      console.log(result);

      if (!result.success) {
        setAlert('failure');
      } else {
        setAlert('success');
        navigate('/courses/create');
      }
    } catch (error) {
      setAlert('network');
    } finally {
      setLoading(false);
    }
  }

  const labelStyle = 'text-gray font-serif leading-9 md:text-lg text-md';
  const inputStyle =
    'w-full p-3 border-2 border-[#C8CDD0] rounded-lg outline-none placeholder:text-[#ACB4B9] text-[16px] leading-6 focus:border-primary transition-colors duration-200 ease-in-out';

  return (
    <>
      {alert === 'success' ? (
        <AuthAlert
          header={'Success'}
          message={`${data.title} has been successfully created`}
          iconType={'success'}
          border={'#3c97d0'}
          onClose={() => setAlert('')}
        />
      ) : alert === 'failure' ? (
        <AuthAlert
          header={'Oops'}
          message={'Something went wrong, try that again later'}
          iconType={'error'}
          onClose={() => setAlert('')}
        />
      ) : alert === 'network' ? (
        <AuthAlert
          header={'Network Error'}
          message={"You're not connected to the internet"}
          iconType={'error'}
          onClose={() => setAlert('')}
        />
      ) : (
        ''
      )}
      <AdminDashboardLayout>
        <div className="md:bg-[#F1F2F3] bg-none rounded-lg md:p-3">
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="space-y-5 mt-5 p-5 bg-white rounded-lg"
          >
            <h4 className="font-medium text-lg bg-primary p-2 w-fit text-white">
              Step 1 - Course Details
            </h4>
            <div>
              <label htmlFor="title" className={labelStyle}>
                Course Title
              </label>
              <input
                type="text"
                name="title"
                value={data.title}
                id="title"
                onChange={handleInputChange}
                placeholder="Enter a title for the course"
                className={inputStyle}
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
              )}
            </div>

            <div>
              <label htmlFor="description" className={labelStyle}>
                Course Description
              </label>
              <input
                type="text"
                name="description"
                value={data.description}
                id="description"
                onChange={handleInputChange}
                placeholder="Enter a description title for the course"
                className={inputStyle}
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="price" className={labelStyle}>
                Course Price
              </label>{' '}
              <br />
              <span className="w-full flex items-center border-2 gap-3 p-3 border-[#C8CDD0] rounded-lg">
                &#8358;
                <input
                  type="number"
                  value={data.price}
                  id="price"
                  name="price"
                  onChange={handleInputChange}
                  placeholder="Enter the price of the course"
                  className="w-full outline-none border-none placeholder:text-[#ACB4B9] text-[16px]"
                />
              </span>
              {errors.price && (
                <p className="text-red-500 text-sm mt-1">{errors.price}</p>
              )}
            </div>

            <div>
              <label htmlFor="thumbnail" className={labelStyle}>
                Upload Course Thumbnail
              </label>
              <input
                id="thumbnail"
                onChange={handleImageChange}
                name="thumbnail"
                type="file"
                accept="image/*"
                className={inputStyle}
              />
              {data.thumbnailPreview && (
                <img
                  src={data.thumbnailPreview}
                  alt={`${data.title} Thumbnail`}
                  className="w-full mt-5 rounded-lg"
                />
              )}
            </div>

            <h4 className="font-medium text-lg bg-primary p-2 w-fit text-white">
              Step 2 - Lessons
            </h4>
            <div>
              <label htmlFor="price" className={labelStyle}>
                No of Lessons
              </label>
              <input
                type="number"
                id="lessons"
                onChange={(e) => setLessonCount(e.target.value)}
                placeholder="Enter the number of lessons"
                className={inputStyle}
                value={lessonCount}
                // min={1}
              />

              {Array.from(
                { length: parseInt(lessonCount) || 0 },
                (_, index) => (
                  <div className="space-y-2 my-5">
                    <div>
                      <label htmlFor="title" className="text-gray text-md">
                        {`Lesson Title ${index + 1}`}
                      </label>
                      <input
                        key={`lessonTitle-${index}`}
                        type="text"
                        className={inputStyle}
                        placeholder={`Lesson Title ${index + 1}`}
                        value={data.lessonTitles[index] || ''}
                        required
                        onChange={(e) =>
                          handleArrayChange(
                            'lessonTitles',
                            index,
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div>
                      <label htmlFor="title" className="text-gray text-md">
                        Video
                      </label>
                      <input
                        key={`lessonVideo-${index}`}
                        accept=".mp4"
                        type="file"
                        className={inputStyle}
                        placeholder={`Lesson Video ${index + 1}`}
                        value={data.lessonVideos[index] || ''}
                        required
                        min={1}
                        onChange={(e) =>
                          handleArrayChange(
                            'lessonVideos',
                            index,
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                )
              )}
            </div>

            <AdminButton
              text={loading ? 'Creating Course...' : 'Create Course'}
              disabled={loading}
            />
          </form>
        </div>
      </AdminDashboardLayout>
    </>
  );
};

export default CreateCourse;
