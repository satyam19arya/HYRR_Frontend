import React, { useEffect, useState } from 'react';
import './Profile.scss';
import Post from './Post'
import img from './user.png';
import {useNavigate, useParams} from 'react-router-dom';
import CreatePost from './CreatePost';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile } from '../redux/slices/postsSlice';
import { followAndUnfollowUser } from "../redux/slices/feedSlice";
import { KEY_ACCESS_TOKEN, removeItem } from "../utils/localStorageManager";
import { axiosClient } from "../utils/axiosClient";

const Profile = () => {
  const navigate = useNavigate();
  const params = useParams();
  const userProfile = useSelector( state => state.postsReducer.userProfile);
  const myProfile = useSelector( state => state.appConfigReducer.myProfile);
  const feedData = useSelector((state) => state.feedDataReducer.feedData);
  const dispatch = useDispatch();
  const [isMyProfile, setIsMyProfile] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    dispatch(getUserProfile({
      userId: params.userId
    }));                     
    setIsMyProfile(myProfile?._id === params.userId);
    setIsFollowing(feedData?.followings?.find((item) => item._id === params.userId));   // eslint-disable-next-line
  }, [myProfile, params.userId, feedData]);

  function handleUserFollow() {
    dispatch(followAndUnfollowUser({
        userIdToFollow: params.userId
    }))
}

async function handleLogoutClicked() {
  try {
      await axiosClient.post('/api/auth/logout');
      removeItem(KEY_ACCESS_TOKEN);
      navigate('/login')
    }catch (e){
      console.log(e);
    }
}

  return (
    <div className="Profile">
      <div className="containerd">
        <div className="left-part">
          {isMyProfile && <CreatePost/>}
          {userProfile?.posts?.map(post => <Post key={post._id} post={post}/>)}
        </div>
        <div className="right-part">
          <div className="profile-card">
            <div className="profile">
               <img className='user-img' src={userProfile?.avatar?.url ? userProfile?.avatar?.url : img} alt="" />
               <h3 className="user-name">{userProfile?.name}</h3>
            </div>
            <p className="bio">{userProfile?.bio}</p>
            <div className="follower-info">
              <h4>{`${userProfile?.followers?.length} Followers`}</h4>
              <h4>{`${userProfile?.followings?.length} Following`}</h4>
            </div>
            <div className="update">
              {!isMyProfile && <h5 onClick={handleUserFollow} className={isFollowing ? "hover-link follow-link" : "blue_button"}>{isFollowing ? "Unfollow" : "Follow"}</h5>}
              {isMyProfile && <button className="white_button" onClick={() => navigate('/updateprofile')}>Update Profile</button>}
              {isMyProfile && <button onClick={handleLogoutClicked} className="red_button">Logout</button>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Profile;