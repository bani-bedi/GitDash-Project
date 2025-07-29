import React, { useEffect, useState } from 'react'
import { fetchContributers } from '../services/userINPservice'

const RepoContributers = ({ name, owner }) => {

    const [contributers, setContributers] = useState([])

    useEffect(() => {
        console.log(name,owner);
        
        repoContri()

    }, [name, owner])


    async function repoContri() {
        try {
            const contri = await fetchContributers(name, owner)
            console.log("the contributors are ", contri.data)
            setContributers(contri.data)

        }
        catch (err) {
            console.log(err)
        }
    }
    return (
        <div>
            {contributers.map(item => (
                <div>
                    <img src={item.avatar_url} alt="avatar" />
                    <p>{item.login}</p>
                </div>

            ))}
        </div>
    )
}

export default RepoContributers