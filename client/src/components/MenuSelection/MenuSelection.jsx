import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import LogInForm from '../LogInForm/LogInForm';
import { Link } from "react-router-dom";
import './MenuSelection.css'


function MenuSelection({ updateUser, user }) {
    const [fadeIn, setFadeIn] = useState(false)
    const navigate = useNavigate()

    const handleFade = () => {
        setFadeIn(true)
    }

    const handleFadeOut = () => {
        setFadeIn(false)
    }

    const logout = () => {
        fetch("/logout", {
            method: "DELETE",
        }).then(res => {
            if (res.ok) {
                updateUser(null)
                navigate('/')
            }
        })
    }

    return (
        <div className='MenuSelection h-full flex items-end text-white pl-28 pb-36'>
            <nav>
                <ul>
                    <li>
                        {!user ? <Link onClick={handleFade}>Log In</Link> : <Link to="/character_selection">Demo</Link>}
                    </li>

                    <li>
                        {!user ? <Link to="/signup">Sign Up</Link> : <Link>Options</Link>}
                    </li>
                    {!user ? "" : <li><Link onClick={logout}>Log Out</Link></li>}
                </ul>
            </nav>
            <LogInForm fadeIn={fadeIn} setFadeIn={setFadeIn} handleFadeOut={handleFadeOut} updateUser={updateUser} />
        </div>
    )
}

export default MenuSelection;
