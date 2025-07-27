import React, { useState } from 'react'
import './UserInfo.css'

import { useNavigate } from 'react-router-dom'

// import React from 'react';
// import astro from '../assets/astro.jpeg'


import VRBot from '../assets/astro.jpeg'; 

const UserInfo = ({ info}) => {

    const navigate = useNavigate()

    function handlebutton() {
        navigate('/repo', { state: info.reposUrl })
    }

    return (
        <>
            {/* {info.Avatar ?

                <div className='box1'>
                     <div className='imgbox'>
                        <img src={info.Avatar} alt="photo" className='photo' />
                    </div>

                     <div className='data'>
                         <p className='name'>{info.UserName}</p>
                         <p className='bio'>{info.bio}</p>
                         <button onClick={handlebutton}>Repositories</button>
                     </div>

                // </div>
                : <></>} */}

                            {info.Avatar && (
                <div className='userinfo-container'>
                    <div className="left-section">
                        <div className="user-card">
                            <img src={info.Avatar} alt="avatar" className='avatar-glow' />
                            <h2 className='username'>{info.UserName}</h2>
                            <p className='bio-text'>{info.bio}</p>
                            <button className='glow-button' onClick={handlebutton}>View Repositories</button>
                        </div>
                    </div>
                    <div className="right-section">
                        <img src={VRBot} alt="astro background" className="astro-bg" />
                    </div>
                </div>
            )}


        </>
    )
}

export default UserInfo