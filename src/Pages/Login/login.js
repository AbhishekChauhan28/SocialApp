import React from 'react'
import '../Login/login.css'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react';
import { login } from '../../Component/ReduxContainer/apiCall';

export default function Login() {
  const dispatch = useDispatch();
  const {isFetching, error} = useSelector((state) => state.user);
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');

  const handleClick = (e) => {
    e.prevenDefault();
    login(dispatch, {email, password});
  }

  return (
    <div className = 'mainContainerForsignup'>
        <div className = 'submainContainer'>
            <div style = { { flex: 1, marginLeft: 150, marginBottom: '170px' } }>
                <p className = 'LogoText'>Lame<span className = 'part'>Book</span></p>
                <p className = 'introText'>Find and Connect<span  className = 'part'>family and friends</span></p>
            </div>
            <div style = { { flex: 3 } }>
                <p className = 'createaccountTxt'>Login Account</p>
                <input type = 'email' name = '' id = 'email' placeholder = 'Email' onChange={(e) => setemail(e.target.value)} className = 'inputText'/>
                <input type = 'password' name = '' placeholder = '*****' onChange={(e) => setPassword(e.target.value)} id = "password" className = 'inputText'/>
                <button className = 'btnforsignup' onClick={handleClick}>Login</button>
                <Link to = {"/forgot/password"}>
                <p style = { { textAlign: 'start', marginLeft: '30.6%' } }>Forgot password</p>
                </Link>
                <Link to = {"/signup"}>
                <p style = { { textAlign: 'start', marginLeft: '30.6%' } }>Create new Account</p>
                </Link>
            </div>
        </div>
    </div>
  )
}
