import React from 'react';
import './Navbar.scss';
import {useNavigate} from 'react-router-dom';
import Avatar from './Avatar';
import {AiOutlineHome} from 'react-icons/ai';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const navigate = useNavigate();
  const myProfile = useSelector(state => state.appConfigReducer.myProfile);

  return (
    <div className="Navbar">
      <div className="containerd">
          <h2 className= "banner hover-link" onClick={() => navigate('/')}>MediaADO</h2>
          <div className="right-side">
            <div className="profile hover-link" onClick={() => navigate('/')}>
              <AiOutlineHome style={{fontSize: "28px", color: "rgb(66, 66, 115)"}}/>
            </div>
            <div className="profile hover-link" onClick={() => navigate(`/profile/${myProfile?._id}`)}>
              <Avatar src={myProfile?.avatar?.url}/>
            </div>
          </div>
      </div>
    </div>
  )
}

export default Navbar