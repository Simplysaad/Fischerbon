import React from 'react';
import { Facebook, Icon, Instagram, Phone, Star, Twitter } from 'lucide-react';
import EmptyMessage from './EmptyMessage';
import getProfileColor from '../utils/profileColor';
import { Link } from 'react-router-dom';

function GuestUserCard() {
  return (
    <section
      id="guest-profile"
      className="shadow rounded min-w-[100%] flex-shrink-0 p-2 py-4 bg-gray-100 text-gray-700"
    >
      <div className="flex gap-2 items-center">
        <div className="profile-image border flex-shrink-0 w-[3rem] h-[3rem] rounded-full overflow-hidden flex justify-center items-center bg-gray-300 text-gray-600 font-extrabold text-3xl">
          ?
        </div>
        <div className="flex flex-col">
          <span className="text-[1.5rem] p-0 m-0">Guest User</span>
          <span className="text-gray-600 text-[.9rem] p-0 m-0">
            Please log in to see your profile
          </span>
        </div>
      </div>
      <div className="description my-4 text-[.9rem]">
        <p className="text-gray-600">
          You are currently browsing as a guest. Sign up or log in for a
          personalized experience.
        </p>
      </div>
      <div className="contact text-[.8rem] flex flex-col gap-3">
        <span>Connect with us to learn more!</span>
        <div className="flex text-center flex-col gap-4 mt-2">
          <Link
            to={'/login'}
            className="bg-blue-600 w-full font-semibold text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Log In
          </Link>
          <Link
            to={'/signup'}
            className="border border-blue-600 font-semibold text-blue-600 hover:text-white w-full px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </section>
  );
}

const ProfileCard = ({ user = null }) => {
  if (!user) return <GuestUserCard />;
  // return <EmptyMessage message={'Instructor details Not avilable'} />;

  const userInitials =
    (user.name || '')
      .split(' ')
      .filter((n) => n.length > 0)
      .map((n) => n[0])
      .join('')
      .toUpperCase() || '?';

  const { textColor = '', bgColor = '' } = getProfileColor(user._id);
  console.log(textColor, bgColor);

  return (
    <section
      id="profile"
      className="shadow rounded min-w-[100%] flex-shrink-0 p-2 py-4 "
    >
      <div className={`flex gap-2 items-center`}>
        <div className="profile-image border flex-shrink-0 w-[3rem] h-[3rem] rounded-full overflow-hidden">
          {user.profileImage ? (
            <img
              src={user.profileImage}
              className="w-[3rem] h-[3rem]"
              alt="profile"
            />
          ) : (
            <div
              style={{ backgroundColor: bgColor, color: textColor }}
              className={`flex justify-center font-extrabold items-center w-[3rem] h-[3rem] rounded-full`}
            >
              {/* <p className={`text-center text-3xl text-[${textColor}]`}> */}
              <p className={`text-center text-3xl`}>{userInitials}</p>
            </div>
          )}
        </div>
        <div className="flex flex-col ">
          <span className="text-[1.5rem] p-0 m-0">{user.name}</span>
          <span className="text-gray-700 flex gap-2 text-[.9rem] p-0 m-0">
            <span>{user.role === 'admin' ? 'Instructor' : 'Student'}</span>
            <span>
              <Star fill="#ffa" size={12} className="inline text-yellow-500" />{' '}
              5.0
            </span>
          </span>
        </div>
      </div>
      <div className="description my-4 text-[.9rem]">
        <p className="text-gray-700">{user.bio}</p>
      </div>
      <div className="contact text-[.8rem] flex flex-col gap-3">
        {!user.socials
          ? 'null'
          : user.socials?.map(({ username, url, type }, idx) => (
              <a
                key={idx}
                href={url}
                target="_blank"
                rel="noreferrer"
                className=" flex gap-1 text-blue-600 hover:underline"
              >
                {type === 'instagram' ? (
                  <Instagram className="inline" />
                ) : type === 'facebook' ? (
                  <Facebook className="inline" />
                ) : type === 'whatsapp' ? (
                  <Phone className="inline" />
                ) : // ) : type === 'whatsapp' ? (
                // <Icon className="inline" />
                null}
                <span>{username}</span>
              </a>
            ))}
      </div>
    </section>
  );
};

ProfileCard.ProfileCardSkeleton = () => {
  return (
    <div className="shadow rounded min-w-[100%] flex-shrink-0 p-2 py-4 ">
      <div className="flex gap-2 items-center ">
        <div className="profile-image border flex-shrink-0 w-[3rem] h-[3rem] rounded-full overflow-hidden">
          <div className="w-[3rem] h-[3rem] bg-gray-300 animate-pulse"></div>
        </div>
        <div className="flex flex-col ">
          <div className="w-24 h-6 bg-gray-300 animate-pulse mb-2"></div>
          <div className="w-16 h-4 bg-gray-300 animate-pulse"></div>
        </div>
      </div>
      <div className="description my-4">
        <div className="w-full h-4 bg-gray-300 animate-pulse mb-2"></div>
        <div className="w-full h-4 bg-gray-300 animate-pulse mb-2"></div>
        <div className="w-3/4 h-4 bg-gray-300 animate-pulse"></div>
      </div>
      <div className="contact flex flex-col gap-3">
        <div className="w-32 h-4 bg-gray-300 animate-pulse"></div>
        <div className="w-28 h-4 bg-gray-300 animate-pulse"></div>
      </div>
    </div>
  );
};

export default ProfileCard;
