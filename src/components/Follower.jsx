import React, { useEffect, useState } from 'react';
import Avatar from './Avatar';
import './Follower.scss';
import { useSelector, useDispatch } from "react-redux";
import { followAndUnfollowUser } from "../redux/slices/feedSlice.js";
import { useNavigate } from "react-router";

const Follower = ({user}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const feedData = useSelector((state) => state.feedDataReducer.feedData);
  const [isFollowing, setIsFollowing] = useState();

  useEffect(() => {
    setIsFollowing(feedData.followings.find((item) => item._id === user._id)); // eslint-disable-next-line
}, [feedData]);

function handleUserFollow () {
  dispatch(followAndUnfollowUser({ 
      userIdToFollow: user._id 
  }));
}

  return (
    <div className="Follower">
      <div className="user-info"  onClick={() => navigate(`/profile/${user._id}`)}>
        <Avatar src={user?.avatar?.url}/>
        <h5 className="name">{user?.name}</h5>
      </div>
      <h5 onClick={handleUserFollow} className={isFollowing ? "hover-link follow-link" : "blue_button"}>
        {isFollowing ? "Unfollow" : "Follow"}</h5>
    </div>
  )
}

export default Follower;