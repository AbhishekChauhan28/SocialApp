import React, { useEffect, useState } from 'react'
import "../ProfileMainPostContainer/profilemainPost.css";
import coverimage from '../Images/Profile.png'
import ContentPost from '../ContentPostContainer/ContentPost';
import Post from '../ProfilePostContainer/Post';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

export default function ProfileMainPost() {
  const [post, setPost] = useState([]);
  let location = useLocation();
  let id = location.pathname.split("/")[2];

  useEffect(() => {
    const getPost = async() => {
      try {
        const res = await axios.get(`http://localhost:5000/api/post/get/post/${id}`)
        setPost(res.data);
      } catch (error) {
        console.log("error occured")
      }
    }
    getPost();
  }, [])

  return (
    <div className = 'ProfilemainPostContainer'>
        <div>
            <img src = {`${coverimage}`} className = 'profileCoverimage' alt = '' />
            <h2 style = { { marginTop: -43, color: 'white', textAlign:'start', marginLeft: '40px' } } >Your Profile</h2>
        </div>
      <ContentPost />
      {
        post.map((item) => (
          <Post detail={item}/>
        ))
      }
      {/* <Post />
      <Post />
      <Post /> */}
    </div>
  )
}