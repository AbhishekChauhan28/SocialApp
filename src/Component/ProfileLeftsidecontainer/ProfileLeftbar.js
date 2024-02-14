import React, { useEffect } from "react";
import "../ProfileLeftsidecontainer/profileleftbar.css";
import image from "../Images/Profile.png"
import image2 from "../Images/image2.jpg";
import image1 from "../Images/image1.jpg";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

export default function ProfileLeftbar() {
    let location = useLocation();
    let id = location.pathname.split("/")[2];
    const userDetails = useSelector((state) => state.user);
    let user = userDetails.user;
    const [Follow, setUnFollow] = useState([user.other.Following.includes(id) ? "Unfollow": "Follow"]);
    const accessToken = user.accessToken;
    console.log(accessToken)
    let username = user?.other?.username;

    const [users, setuser] = useState([]);
    useEffect(() => {
        const getuser = async() => {
            try {
                const res = await axios.get(`http://localhost:5000/api/user/post/user/details/${id}`)
                setuser(res.data);
            } catch (error) {
                console.log("Some error occured")
            }
        }
        getuser();
    }, [])
    let followersCounter = users?.Followers?.length;
    let followingCounter = users?.Following?.length;

    const [Followinguser, setFollowinguser] = useState([]);
    useEffect(() => {
        const getFollowing = async() => {
            try {
                const res = await axios.get(`http://localhost:5000/api/post/following/${id}`);
                setFollowinguser(res.data);
            } catch (error) {
                console.log('Error')
            }
        }
        getFollowing();
    }, [])

    const handleFollow = async() => {
        if(Follow === "Follow"){
            await fetch(`http://localhost:5000/api/user/following/${id}`, {method:'PUT', headers:{'Content-Type':"application/JSON", token:accessToken}, body:JSON.stringify({user:`${user.other._id}`})})
            setUnFollow("UnFollow")
        }else{
            await fetch(`http://localhost:5000/api/user/following/${id}`, {method:'PUT', headers:{'Content-Type':"application/JSON", token:accessToken}, body:JSON.stringify({user:`${user.other._id}`})})
            setUnFollow("Follow")
        }
    }

    console.log(Followinguser)

    return (
        <div className = "ProfileLeftbar">
            <div className = "NotificationContainer">
                <img src = {`${image}`} className = "ProfilepageCover" alt = ' ' />
                <div style = { { display: 'flex', alignItems: 'center', marginTop: -30 } } >
                    <img src = {`${users.profile}`} className = "Profilepageimage" alt = "" />
                    <div>
                        <p style = { { marginLeft:6, marginTop:35, color:'black', textAlign:'start' } }>{users.username}</p>
                        <p style = { { marginLeft:6, marginTop:8, color:'black', textAlign:'start', marginTop:-10 , fontSize:11 } } >Full Stack Developer</p>
                    </div>
                </div>
                <div style = { { display: 'flex', justifyContent: 'space-between' } }>
                    <p style = { { color: 'black', marginLeft:20, fontSize: '14px' } }>Following</p>
                    <p style = { { color: 'black', marginRight:20, fontSize: '12px', marginTop:17 } }>{followingCounter}</p>
                </div>
                <hr style = { { marginTop: -10 } } />
                <div style = { { display: 'flex', justifyContent: 'space-between', marginTop: -20 } }>
                    <p style = { { color: 'black', marginLeft:20, fontSize: '14px' } }>Followers</p>
                    <p style = { { color: 'black', marginRight:20, fontSize: '12px', marginTop:17 } }>{followersCounter}</p>
                </div>
                <hr style = { { marginTop: -10 } } />
                <div style = { { marginTop: -20 } }>
                    <p style = { { color: 'black', marginLeft:10, fontSize: '14px', marginRight:30, marginTop:30, textAlign:'start' } }>User Bio..</p>
                    <p style = { { color: 'black', fontSize: '12px', marginTop:-10, marginLeft:'10px', textAlign:'start' } }>Having an experience in full Stack and in ML/DL</p>
                </div>
                {user.other._id !== id ? <div onClick={handleFollow}><button style= { { width: '100%', paddingTop:7, paddingBottom:7, border:'none', backgroundColor: 'green', color: 'white' }} >{Follow}</button></div> : <div><button style={{width:"100%" , paddingTop:7 , paddingBottom:7 , border:"none" , backgroundColor:"green" , color:"white"}}>Edit Bio</button></div>}
            </div>

            <div className = "NotificationContainer">
                <h3>Followings</h3>
                <div style = { { display: 'flex', justifyContent: 'space-between' } }>
                    <p style = { { marginLeft: 10 } }>Friends</p>
                    <p style = { { marginLeft: 10, color: '#aaa' } }>See all</p>
                </div>
                <div style = { { display:'flex', flexWrap: 'wrap', marginLeft:5 } }>
                    {Followinguser.map((item) => (
                        <Link to = {`/Profile/${item._id}`}>
                            <div style={{marginLeft:4, cursor:"pointer"}} key={item._id}>
                                <img src = {`${item.profile}`} className="friendimage" alt=""/>
                                <p style={{marginTop:-2}}>{item.username}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

        </div>
    )
}