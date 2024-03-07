import React, { useEffect } from 'react';
import './Feed.scss';
import Post from './Post'
import BlankPage from './Blankpage.jsx';
import Follower from './Follower';
import {useSelector, useDispatch} from 'react-redux';
import { getFeedData } from '../redux/slices/feedSlice.js';

const Feed = () => {
  const dispatch = useDispatch();
  const feedData = useSelector(state => state.feedDataReducer.feedData)

  useEffect(() => {
    dispatch(getFeedData());
  }, [dispatch])  

  return (
    <div className="Feed">
      <div className="containerd">
        <div className="left-part">
          {feedData?.posts?.length === 0 ? (
            <BlankPage />
          ) : (
            feedData?.posts?.map((post) => <Post key={post._id} post={post} />)
          )}
        </div>
        <div className="right-part">
          <div className="following">
            <div className="title"><p>You are following</p></div>
            {feedData?.followings?.map(user => <Follower key={user._id} user={user}/>)}
          </div>
          <div className="suggestions">
            <div className="title"><p>Suggested for you</p></div>
            {feedData?.suggestions?.map(user => <Follower key={user._id} user={user}/>)}
          </div>
        </div>
      </div>

    </div>
  )
}

export default Feed;