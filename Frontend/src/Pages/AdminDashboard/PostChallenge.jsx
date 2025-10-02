import React, { useState } from 'react';
import AdminDashboardLayout from './AdminDashboardLayout';
import { Upload } from 'lucide-react';
import AuthAlert from '../../Components/AuthAlert';
import AdminButton from './AdminButton';

const PostChallenge = () => {
  const [loading, setLoading] = useState(false);

  const labelStyle = 'text-gray font-serif leading-9 md:text-lg text-md';
  const inputStyle =
    'text-white text-[16px] py-3 px-3 rounded-sm w-[102px] bg-primary font-medium hover:bg-primaryHover ease-in-out duration-300 cursor-pointer mt-2';
  const [alert, setAlert] = useState('');

  const [challenge, setChallenge] = useState(null);
  const [challengePreview, setChallengePreview] = useState(null);

  const [data, setData] = useState({
    display: '',
    challenge: File,
  });

  const handleInputChange = (e) => {
    const { name, files, value, type, checked } = e.target;
    if (name === 'challenge') {
      setData({ ...data, file: files });
    } else {
      setData((prevForm) => ({
        ...prevForm,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const inputName = e.target.name;
    if (!file) return;
    const previewURL = URL.createObjectURL(file);
    setChallenge(file);
    setChallengePreview(previewURL);
    setData((prevForm) => ({
      ...prevForm,
      [inputName]: file,
      [`${inputName}Preview`]: previewURL,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/challenge/post`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = response.json();
      if (!result.success) {
        setAlert('failure');
      } else {
        setAlert('success');
      }
    } catch (error) {
      setAlert('network');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {alert === 'success' ? (
        <AuthAlert
          header={'Success'}
          message={`${data.display} Challenge Posted Successfuly`}
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
        <div className="bg-[#F1F2F3] rounded-lg p-3">
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="challenge" className={labelStyle}>
                Upload Challenge
              </label>
              <div className="border-3 border-accent p-10 border-double space-y-5 flex-col justify-center text-center rounded-2xl focus:border-primary transition-colors duration-200 ease-in-out">
                <>
                  <div className="size-15 mx-auto rounded-full text-secondary bg-[#c1d4de] flex items-center justify-center">
                    <Upload size="24" />
                  </div>
                  <p className="my-4 md:text-lg font-serif">
                    Upload a challenge image
                  </p>
                  <div className="flex gap-3 items-center justify-center">
                    <label className={labelStyle} htmlFor="display">
                      Challenge Type
                    </label>
                    <select
                      value={data.display}
                      className="py-1 px-2 outline-none border-accent rounded-lg border-2"
                      onChange={handleInputChange}
                      name="display"
                      id="display"
                      required
                    >
                      <option value="2d">2D</option>
                      <option value="3d">3D</option>
                    </select>
                  </div>
                  <input
                    id="challenge"
                    onChange={handleImageChange}
                    required
                    name="challenge"
                    type="file"
                    accept="image/*"
                    className={inputStyle}
                  />
                </>

                {data.challengePreview && (
                  <img
                    src={data.challengePreview}
                    className="w-full"
                    alt={`${data.display} challenge`}
                  />
                )}
              </div>
            </div>

            <AdminButton
              text={loading ? 'Posting...' : 'Post Challenge'}
              disabled={loading}
            />
          </form>
        </div>
      </AdminDashboardLayout>
    </>
  );
};

export default PostChallenge;
