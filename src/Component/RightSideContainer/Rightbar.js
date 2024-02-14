import React, { useState } from 'react'
import './rightbar.css'
import ads from "../Images/ads.jpg";
import Follow from './Follow';
import image1 from "../Images/image3.jpg";
//import image2 from "../Images/image2.jpg";
// import image5 from "../Images/image5.jpg";
// import image4 from "../Images/image4.jpg";
// import image6 from "../Images/image6.jpg";
// import image7 from "../Images/image1.jpg";
// import addFriends from "../Images/add-user.png";
import axios from 'axios';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function Rightbar() {
  const userDetails = useSelector((state) => state.user);
  const user = userDetails?.user;
  const id = user?.other?._id;
  const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MWFjZWE1MGVlOGQwYzc1ZmNiOGM3OSIsInVzZXJuYW1lIjoiQWJoaXNoZWsiLCJpYXQiOjE2OTY0NDQ1MzZ9.Q-NxdgaMQQFBN243ftJbu3oceZrXP9JVUIGAci5dpLI"
  const [users, setuser] = useState([]);
  useEffect(() => {
    const getuser = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/user/all/user/${id}`, {
          headers: {
            token: accessToken
          }
        })
        setuser(res.data);
      } catch (error) {
        console.log("Some error occured")
      }
    }
    getuser();
  }, [])

  console.log(users);

  return (
    <div className='rightbar'>

      <div className='rightcontainer'>

        <div className='adsContainer'>
          <img src={`${ads}`} className='adsimg' alt='' />

          <div>
            <p style={{ textAlign: 'start', marginLeft: '10px', marginTop: -20 }}>Compy</p>
            <p style={{ textAlign: 'start', marginLeft: '10px', fontSize: "12px", marginTop: "-16px" }}>Buy compy course</p>
          </div>
        </div>

        <div className='adsContainer'>
          <img src={`${image1}`} className='adsimg' alt=' ' />

          <div>
            <p style={{ textAlign: 'start', marginLeft: '10px', marginTop: -20 }}>Compy</p>
            <p style={{ textAlign: 'start', marginLeft: '10px', fontSize: "12px", marginTop: "-16px" }}>Buy compy course</p>
          </div>
        </div>

        <div className='adsContainer'>
          <img src={`${image1}`} className='adsimg' alt='' />

          <div>
            <p style={{ textAlign: 'start', marginLeft: '10px', marginTop: -20 }}>Compy</p>
            <p style={{ textAlign: 'start', marginLeft: '10px', fontSize: "12px", marginTop: "-16px" }}>Buy compy course</p>
          </div>
        </div>

      </div>

      <div className='rightcontainer2'>
        <h3 style={{ textAlign: "start", marginLeft: "10px" }}>Suggested for you</h3>
        {users.map((item) => (
          <Follow userDetails={item}/>
        ))}

      </div>

    </div>
  )
}
