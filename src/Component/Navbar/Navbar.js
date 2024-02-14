import React from 'react'
import "./navbar.css"
import { Link } from 'react-router-dom'
import searchIcon from "../Images/search.png"
import Notification from "../Images/bell.png"
import Message from "../Images/message.png"
import ProfileImage from "../Images/Profile.png"
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../ReduxContainer/userReducer';

export default function Navbar() {
    const userDetails = useSelector((state) => state.user);
    let user = userDetails?.user
    console.log(user);
    let id = user?.other?._id;
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(logout())
    }
  return (
    <div className = 'mainNavbar'>

        <div className = 'LogoContainer'>
            <p>LameBook</p>
        </div>

        <div>
            <div className = 'searchInputContainer'>
                <img src = {`${searchIcon}`} className='searchIcon' alt = "" />
                <input className = 'searchInput' placeholder='search your friends' type='text' name="" id="" />
            </div>
        </div>

        <div className = 'IconsContainer'>
            <img src = {`${Notification}`} className='Icons' alt='' />
            <img src = {`${Message}`} className='Icons' alt='' />
            <Link to = {`/profile/${id}`}>
            <div style = { {display: 'flex', alignItems: 'center'} }>
                <img src = {`${user?.other?.profile}`} className='ProfileImage' alt='' />
                <p style={ { marginLeft: '5px'} }>{user?.other?.username}</p>
            </div>
            </Link>
            <div style={{marginRight:"30px", marginLeft:"20px", cursor:"pointer"}} onClick={handleLogout}>
                <p>Logout</p>
            </div>
        </div>

    </div>
  )
}
