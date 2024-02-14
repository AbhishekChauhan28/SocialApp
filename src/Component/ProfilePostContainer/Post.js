import React, { useEffect, useState } from 'react'
import "./post.css";
import ProfileImage from "../Images/Profile.png"
import LikeIcon from "../Images/like.png"
import CommentIcon from "../Images/speech-bubble.png";
import shareicon from "../Images/share.png";
import Moreoption from "../Images/more.png";
import anotherlikeicon from "../Images/setLike.png"
import { Link } from 'react-router-dom';
import axios from 'axios';


export default function Post({ detail }) {
    console.log(detail)
    const [count, setCount] = useState(0);
    const [Comments, setComments] = useState([]);
    const [commentwriting, setcommentwriting] = useState('');
    const [show, setshow] = useState(false);
    const [user, setuser] = useState([]);

    useEffect(() => {
        const getuser = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/user/post/user/details/${detail.user}`)
                setuser(res.data)
            } catch (error) {
                console.log("Some Error Occured")
            }
        }
        getuser();
    }, [])

    console.log(user)

    const handleLike = async () => {

    }

    const addComment = () => {
        const comment = {
            "id": "652146f845b498e49a277e61",
            "username": "Abhishek12",
            "title": `${commentwriting}`
        }
        setComments(Comments.concat(comment));
    }

    const handleComment = () => {
        addComment();
    }
    console.log(Comments)

    const handleShow = () => {
        if (show === false) {
            setshow(true)
        } else {
            setshow(false)
        }
    }

    console.log(detail.like.length)

    return (
        <div className='PostContainer'>
            <div className='SubPostContainer'>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img src={`${user.profile}`} className='postImage' alt='' />
                        <div>
                            <p style={{ marginLeft: '5px', textAlign: 'start', }}>{user.username}</p>
                            <p style={{ fontSize: '11px', textAlign: 'start', marginLeft: 5, marginTop: -13, color: '#aaa' }}>Following by Abhishek</p>
                        </div>
                        <img src={`${Moreoption}`} className='moreicons' alt='' />
                    </div>
                    <p style={{ textAlign: 'start', width: "96%", marginLeft: 20, marginTop: 0 }}>{detail.title}</p>
                    <img src={`${detail.image}`} className='PostImages' alt='' />
                    <div style={{ display: 'flex' }}>
                        <div style={{ display: 'flex', marginLeft: '10px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                                <img src={`${Link}`} className='iconsforPost' onClick={handleLike} alt='' />
                                <p style={{ marginLeft: '6px', }}>{detail.like.length} likes</p>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', marginLeft: 20, cursor: 'pointer' }}>
                                <img src={`${CommentIcon}`} className='iconsforPost' onClick={handleShow} alt='' />
                                <p style={{ marginLeft: '6px' }}>{detail.Comments.length} Comments</p>
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', marginLeft: 200, cursor: 'pointer' }}>
                            <img src={`${shareicon}`} className='iconsforPost' alt='' />
                            <p style={{ marginLeft: '6px' }}>Share</p>
                        </div>
                    </div>

                    {show === true ?
                        <div style={{ padding: '10px' }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <img src={`${ProfileImage}`} className='PostImage' alt='' />
                                {/* <p style={{ marginLeft: '6px' }}>Abhishek</p> */}
                                <input type='text' className='commentinput' placeholder='Write your thought' onChange={(e) => setcommentwriting(e.target.value)} />
                                <button className='addCommentbtn' onClick={handleComment}>Post</button>
                            </div>
                            {Comments.map((item) => (
                                <div style={{ alignItems: 'center' }}>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <img src={`${ProfileImage}`} className='PostImage' alt='' />
                                        <p style={{ marginLeft: '6px', fontSize: 18, marginTop: 6 }}>{item.username}</p>
                                    </div>
                                    <p style={{ marginLeft: '55px', textAlign: 'start', marginTop: -16 }}>{item.title}</p>
                                    <p style={{ fontSize: 11, marginLeft: '55px', textAlign: 'start', marginTop: -10, color: '#aaa' }}>Reply</p>
                                </div>
                            ))}

                        </div> : ''
                    }
                </div>

            </div>

        </div>
    )
}
