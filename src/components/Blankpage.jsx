import React, { useEffect } from 'react';
import Post from './Post';
import { useSelector, useDispatch } from 'react-redux';
import { getAllPosts } from '../redux/slices/feedSlice.js';
import { likeAndUnlikePost } from "../redux/slices/postsSlice";

const Blankpage = () => {
  const dispatch = useDispatch();
  const allPosts = useSelector(state => state.feedDataReducer.allPosts)

  useEffect(() => {
    dispatch(getAllPosts()); // eslint-disable-next-line
  }, [dispatch])

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
    <div>
        { allPosts?.posts?.map((post) => <Post key={post._id} post={post} onLike={handlePostLiked}/>) }
    </div>
  )
}

export default Blankpage;