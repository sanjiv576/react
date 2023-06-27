import React, { useEffect, useState } from 'react'

export default function Skill({ skills }) {
    const [loggedIn, setLoggedIn] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            setLoggedIn(true);
        }, 1001)
    }, [])
    return (
        <div>
            <h2>List of skills</h2>
            <ul>
                {
                    skills.map(skill => (
                        <li key={skill.id}>{skill.name}</li>
                    ))
                }

            </ul>

            {
                loggedIn 
                ? <button>start working</button> 
                : <button onClick={() => setLoggedIn(true)}>login</button>
            }
        </div>
    )
}
