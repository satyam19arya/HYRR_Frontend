import React, { useEffect } from 'react';
import Post from './Post';
import { useSelector, useDispatch } from 'react-redux';
import { getAllPosts } from '../redux/slices/feedSlice.js';
import Spinner from './Spinner';

const Blankpage = () => {
  const dispatch = useDispatch();
  const allPosts = useSelector(state => state.feedDataReducer.allPosts)
  const allPosts_status = useSelector(state => state.feedDataReducer.allPosts_status)

  console.log(allPosts)

  useEffect(() => {
    dispatch(getAllPosts()); // eslint-disable-next-line
  }, [])

  if(allPosts_status === 'loading') {
      return <Spinner />
  }

  return (
    <div>
        { allPosts?.posts?.map((post) => <Post key={post._id} post={post} />) }
    </div>
  )
}

export default Blankpage;