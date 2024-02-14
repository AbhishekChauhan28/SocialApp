import React, { useState } from 'react'
import { useEffect } from 'react'
import "./mainPost.css";
import ContentPost from '../ContentPostContainer/ContentPost';
import Post from '../PostContainer/Post'
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function MainPost() {
  const userDetails = useSelector((state) => state.user);
  let user = userDetails.user;
  console.log(user);
  let id = user?.other?._id;
  const accessToken = user.accessToken;
  console.log(accessToken)
  //const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MWFjZWE1MGVlOGQwYzc1ZmNiOGM3OSIsInVzZXJuYW1lIjoiQWJoaXNoZWsiLCJpYXQiOjE2OTY0NDQ1MzZ9.Q-NxdgaMQQFBN243ftJbu3oceZrXP9JVUIGAci5dpLI";
  const [post, setPost] = useState([]);
  useEffect(() => {
    const getPost = async() => {
      try {
        const res = await axios.get(`http://localhost:5000/api/user/flw/${id}`, {
          headers:{
            token:accessToken
          }
        })
        setPost(res.data);
      } catch (error) {

      }
    }
    getPost();
  }, [])

  console.log(post);
  
  return (
    <div className = 'mainPostContainer'>
      <ContentPost />
      {post.map((item) => (
        <post post = {item}/>
      ))}
    </div>
  )
}
