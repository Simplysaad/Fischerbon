import { Eye, EyeOff } from 'lucide-react';
import AuthAlert from './AuthAlert';
import AdminButton from './AdminButton';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfileTemplate = ({ stats, form, name, email }) => {
  const BASE_URL = 'fischerbon.onrender.com';
  const navigate = useNavigate();

  const [formData, setFormData] = useState(form);

  const [errors, setErrors] = useState({});
  const [editProfile, setEditProfile] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState('');

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.password.trim()) newErrors.password = 'Password is required';
    if (formData.password.trim().length < 8 && formData.password.trim())
      newErrors.password = 'Password must have a minimum of 8 characters';
    return newErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/auth/profile`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!result.success || !response.ok) {
        setAlert('failure');
      } else {
        setAlert('success');
        navigate('/dashboard');
      }
    } catch (error) {
      setAlert('network');
    } finally {
      setLoading(false);
    }
  };

  const labelStyle =
    'text-gray font-serif leading-9 md:text-lg text-md block mb-1';

  return (
    <>
      {alert === 'success' ? (
        <AuthAlert
          header={'Successful'}
          message={`You've successfully updated your details`}
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
      <div className="bg-[#F1F2F3] rounded-lg md:p-5 p-3 flex flex-col space-y-5">
        {!editProfile && (
          <div className="space-y-5">
            <section className="flex flex-col items-center md:justify-center">
              <div className="md:mb-3 size-15 md:size-20 bg-primary text-white text-3xl font-bold justify-center rounded-full flex items-center text-center hover:bg-primaryHover">
                {name.split(' ')[0][0].toUpperCase()}
                {name.split(' ')[1][0].toUpperCase()}
              </div>

              <h4 className="text-lg font-serif text-dark leading-9">
                {name} /{' '}
                <span className="font-gray text-secondary">
                  {formData.role}
                </span>
              </h4>
            </section>

            <section className="grid md:grid-cols-2 grid-cols-1 gap-3">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <article
                    key={index}
                    className="rounded-lg bg-[#F1F6F3] font-serif border-1 border-gray flex-1 p-3 md:p-5 gap-5 mb-3 md:mb-0 flex justify-around items-center"
                  >
                    <div
                      className={`bg-primary p-5 rounded-full flex items-center justify-center`}
                    >
                      <Icon size="24" />
                    </div>
                    <p className="text-[#2F3437] text-base leading-6 font-medium">
                      <span className="text-3xl">{`${stat.count}`}</span>{' '}
                      {`${stat.label}`}
                    </p>
                  </article>
                );
              })}
            </section>
          </div>
        )}

        <div>
          {editProfile && (
            <form onSubmit={handleSubmit} className="space-y-3 mb-3">
              <h4 className="text-dark leading-9 text-lg">Edit Profile</h4>
              <div className="grid md:grid-cols-2 gap-3 grid-cols-1 items-center">
                <div>
                  <label htmlFor="password" className={labelStyle}>
                    Email
                  </label>
                  <input
                    readOnly
                    value={email}
                    className="bg-accent w-full p-3 border-2 rounded-md border-accent placeholder:text-accent outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="fullName" className={labelStyle}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Update Full Name"
                    className="w-full p-3 border-2 rounded-md border-accent placeholder:text-accent focus:border-primary outline-none"
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                <div className="relative">
                  <label htmlFor="password" className={labelStyle}>
                    Password
                  </label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Update Password"
                    className="w-full p-3 border-2 rounded-md border-accent placeholder:text-accent focus:border-primary outline-none"
                  />
                  <span
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-14 cursor-pointer text-accent"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </span>
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password}
                    </p>
                  )}
                </div>
              </div>

              <AdminButton
                text={loading ? 'Updating Profile' : 'Update'}
                disabled={loading}
              />
            </form>
          )}

          <div>
            <button
              onClick={() => setEditProfile(!editProfile)}
              className="py-3 px-5 bg-primary hover:bg-primaryHover cursor-pointer rounded-sm font-medium leading-6 text-white ease-in-out duration-300"
            >
              {editProfile ? 'Back to Profile' : 'Edit Profile'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileTemplate;
