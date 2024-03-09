import React, { useEffect } from 'react';
import './Feed.scss';
import Post from './Post'
import BlankPage from './Blankpage.jsx';
import Follower from './Follower';
import {useSelector, useDispatch} from 'react-redux';
import { getFeedData } from '../redux/slices/feedSlice.js';
import Spinner from './Spinner';

const Feed = () => {
  const dispatch = useDispatch();
  const feedData = useSelector(state => state.feedDataReducer.feedData)
  const feedData_status = useSelector(state => state.feedDataReducer.feedData_status)

  useEffect(() => {
    dispatch(getFeedData()); // eslint-disable-next-line
  }, []) 

  if(feedData_status === 'loading') {
      return <Spinner />
  }

  return (
    <div className="Feed">
      <div className="containerd">
        <div className="left-part">
          {feedData?.posts?.length === 0 ? (
            <BlankPage />
          ) : (
            feedData?.posts?.map((post) => <Post key={post._id} post={post} />)
          )}
          <div className='p-4 text-center'>
            <p>You're all caught up</p>
          </div>
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