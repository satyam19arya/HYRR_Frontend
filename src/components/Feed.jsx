import React, { useEffect } from 'react';
import './Feed.scss';
import Post from './Post'
import BlankPage from './Blankpage.jsx';
import Follower from './Follower';
import {useSelector, useDispatch} from 'react-redux';
import { getFeedData } from '../redux/slices/feedSlice.js';
import { followAndUnfollowUser } from '../redux/slices/feedSlice.js';
import Spinner from './Spinner';
import { likeAndUnlikePost } from "../redux/slices/postsSlice";
import { getAllPosts } from '../redux/slices/feedSlice.js';

const Feed = () => {
  const dispatch = useDispatch();
  const feedData = useSelector(state => state.feedDataReducer.feedData)
  const feedData_status = useSelector(state => state.feedDataReducer.feedData_status)

  useEffect(() => {
    dispatch(getFeedData());
  }, [dispatch]) 

  if(feedData_status === 'loading') {
      return <Spinner />
  }

  const handleUserFollow = (userId) => {
    dispatch(followAndUnfollowUser({ userIdToFollow: userId }))
      .then(() => {
        dispatch(getFeedData());
      })
      .catch(error => {
        console.error("Error occurred while following/unfollowing user:", error);
      });
  };

  const handlePostLiked = (postId) => {
    dispatch(likeAndUnlikePost({ postId }))
      .then(() => {
        dispatch(getAllPosts());
      })
      .catch(error => {
        console.error("Error occurred while liking/unliking post:", error);
      });
  }

  return (
    <div className="Feed">
      <div className="containerd">
        <div className="left-part">
          {feedData?.posts?.length === 0 ? (
            <BlankPage />
          ) : (
            feedData?.posts?.map((post) => <Post key={post._id} post={post} onLike={handlePostLiked}/>)
          )}
          <div className='p-4 text-center'>
            <p>You're all caught up</p>
          </div>
        </div>
        <div className="right-part">
          <div className="following">
            <div className="title"><p>You are following</p></div>
            {feedData?.followings?.map(user => <Follower key={user._id} user={user} onFollow={handleUserFollow}/>)}
          </div>
          <div className="suggestions">
            <div className="title"><p>Suggested for you</p></div>
            {feedData?.suggestions?.map(user => <Follower key={user._id} user={user} onFollow={handleUserFollow}/>)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Feed;