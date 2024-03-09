import React from 'react';
import user from './user.png';

const Avatar = ({src}) => {
  return (
    <div className='w-[40px] h-[40px] rounded-full border border-gray-200'>
      <img
        src={src ? src : user}
        className='w-full h-full cursor-pointer rounded-full object-cover'
        alt="avatar"
      />
    </div>
  )
}

export default Avatar;