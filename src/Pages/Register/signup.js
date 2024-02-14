import React from 'react'
import './signup.css'

export default function signup() {
  return (
    <div className = 'mainContainerForsignup'>
        <div className = 'submainContainer'>
            <div style = { { flex: 1, marginLeft: 150, marginBottom: '170px' } }>
                <p className = 'LogoText'>Lame<span className = 'part'>Book</span></p>
                <p className = 'introText'>Find and Connect<span  className = 'part'> with your friends</span></p>
            </div>
            <div style = { { flex: 3 } }>
                <p className = 'createaccountTxt'>Create new Account</p>
                <input type = 'text' placeholder = 'Username' className = 'inputText'/>
                <input type = 'text' placeholder = 'Phonenumber' className = 'inputText'/>
                <input type = 'email' name = '' id = '' placeholder = 'email' className = 'inputText'/>
                <input type = 'password' name = '' id = '' placeholder = '*****' className = 'inputText'/>
                <button className = 'btnforsignup'>Signup</button>
                <p style = { { textAlign: 'start', marginLeft: '30.6%' } }>Already have an account</p>
            </div>
        </div>
    </div>
  )
}
