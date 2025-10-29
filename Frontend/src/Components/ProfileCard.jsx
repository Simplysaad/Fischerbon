import React from 'react';
import ProfileImage from '../assets/autocadImage.jpg';
import { Facebook, Icon, Instagram, Phone, Star, Twitter } from 'lucide-react';
import EmptyMessage from './EmptyMessage';

const ProfileCard = ({ user = null }) => {
  if (!user)
    return <EmptyMessage message={'Instructor details Not avilable'} />;

  const userInitials = user.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
  const color = '#000'; //  `#${user._id.slice(-6)}`;
  console.log(color);

  return (
    <section
      id="profile"
      className="shadow rounded min-w-[100%] flex-shrink-0 p-2 py-4 "
    >
      <div className="flex gap-2 items-center ">
        <div className="profile-image border flex-shrink-0 w-[3rem] h-[3rem] rounded-full overflow-hidden">
          {user.profileImage ? (
            <img
              src={user.profileImage}
              className="w-[3rem] h-[3rem]"
              alt="profile"
            />
          ) : (
            <div
              className={`flex justify-center font-extrabold items-center w-[3rem] h-[3rem] bg-[#000000] rounded-full`}
            >
              <p className="text-center text-3xl text-white">{userInitials}</p>
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
