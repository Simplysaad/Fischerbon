import React from 'react';
import ProfileImage from '../assets/autocadImage.jpg';
import { Facebook, Icon, Instagram, Phone, Star, Twitter } from 'lucide-react';
import EmptyMessage from './EmptyMessage';

const ProfileCard = ({ user = null }) => {
  if (!user)
    return <EmptyMessage message={'Instructor details Not avilable'} />;
  return (
    <section
      id="profile"
      className="shadow rounded min-w-[100%] flex-shrink-0 p-2 py-4 "
    >
      <div className="flex gap-2 items-center ">
        <div className="profile-image border flex-shrink-0 w-[3rem] h-[3rem] rounded-full overflow-hidden">
          <img src={ProfileImage} className="w-[3rem] h-[3rem]" alt="profile" />
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

export default ProfileCard;
