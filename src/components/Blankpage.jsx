import React, { useEffect, useState } from 'react';
import { axiosClient } from "../utils/axiosClient";
import Post from './Post';

const Blankpage = () => {
    const [feedData, setFeedData] = useState([]);
    
    useEffect(() => {
        const fetchFeedData = async () => {
          try {
            const response = await axiosClient.get('/api/posts/posts');
            setFeedData(response.result.posts);
          } catch (error) {
            console.error('Error fetching feed data:', error);
          }
        };

        fetchFeedData();
      }, []);

  return (
    <div>
        { feedData?.map((post) => <Post key={post._id} post={post} />) }
    </div>
  )
}

export default Blankpage;