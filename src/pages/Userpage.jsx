import React, { useState ,useEffect} from 'react'
import UserSearch from '../Components/UserSearch'
import UserInfo from '../Components/UserInfo'

// import React, { useEffect } from 'react';
// import particlesJS from 'particles.js';
import './Userpage.css';


export const Userpage = () => {
    const [info, setInfo] = useState({
        "Avatar": '',
        "UserName": '',
        "bio": '',
        "reposUrl": ''
    });


  useEffect(() => {
    // Access global particlesJS
    if (window.particlesJS) {
      window.particlesJS.load('particles-js', '/particles.json', () => {
        console.log('Particles.js config loaded');
      });
    }
  }, []);






    return (
        <div className='user-page'>
            <div id="particles-js"></div>

            <UserSearch info={info} setInfo={setInfo} />
            <UserInfo info={info} setInfo={setInfo} />
        </div>
    )
}


export default Userpage;
