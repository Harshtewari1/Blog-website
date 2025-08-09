import React from 'react'
import PostCreate from '../components/dashboard/PostCreate'
import Navbar from '../components/Navbar'
import AllPosts from '../components/dashboard/AllPosts'
import { useState } from 'react'
import API from "../utils/api";
import { useEffect } from 'react'

const Dashboard = () => {
  
  const [posts, setPosts] = useState([]);

  // Fetch all posts
  const fetchPosts = async () => {
    try {
      const res = await API.get("/posts/getAllPost");
      setPosts(res.data.posts);
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Function to add a new post instantly
  const handlePostCreated = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };
  return (
    <div className='bg-emerald-100'>
      <Navbar />
      <PostCreate onPostCreated={handlePostCreated} />
      <AllPosts posts={posts} />
    </div>
  )
}

export default Dashboard