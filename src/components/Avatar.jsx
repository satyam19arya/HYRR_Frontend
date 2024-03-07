import React from 'react';
import './Avatar.scss';
import user from './user.png';

const Avatar = ({src}) => {
  return (
    <div className="Avatar">
        <img src= {src ? src : user} alt=""/>
    </div>
  )
}

export default Avatar;