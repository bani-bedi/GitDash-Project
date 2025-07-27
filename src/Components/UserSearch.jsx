import React, { useEffect, useState , useRef } from 'react'
import './Usersearch.css'
import { fetchData } from '../services/userINPservice';


const UserSearch = ({ info, setInfo }) => {
    const [name, setName] = useState('');

                // Smooth scroll
    const userInfoRef = useRef(null);




    useEffect(() => {
        console.log(info)

    }, [info])


    async function handleClick() {
        try {
            const userInfo = await fetchData(name)
            console.log(userInfo)
            setInfo(
                {
                    "Avatar": userInfo.data.avatar_url,
                    "UserName": userInfo.data.name,
                    "bio": userInfo.data.bio,
                    "reposUrl": userInfo.data.repos_url
                }
            )

                        // Smooth scroll

            setTimeout(() => {
                userInfoRef.current?.scrollIntoView({ behavior: 'smooth' });
            }, 300);

        }
        catch (err) {
            console.log("error", err)
        }

    } 

    return (
        <>
        <div className='mainbox'>
            <div className='quote' >Explore. Analyze. Inspire.</div>
            <div className="tagline">Harnessed for productivity . Designed for collboration.
                <br />
                Celebrated for built-in security . Welcome to the platform developers love
            </div>
            <div className="input-group">
                <p>User-Id</p>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </div>

            <input type="submit" value='Discover' onClick={handleClick} />

        </div>

            <div ref={userInfoRef}></div>
        </>

    )
}

export default UserSearch