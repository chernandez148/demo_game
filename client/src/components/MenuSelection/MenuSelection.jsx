import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link, Outlet } from "react-router-dom";
import LogInForm from '../LogInForm/LogInForm';
import './MenuSelection.css'


function MenuSelection({ updateUser, user }) {
    const [fadeIn, setFadeIn] = useState(false)
    const [logIn, setLogIn] = useState(false)
    const [hide, setHide] = useState(false)
    console.log(logIn)

    const navigate = useNavigate()

    const handleFade = () => {
        setFadeIn(true)
    }

    const handleFadeOut = () => {
        setFadeIn(false)
    }

    const handleLogIn = () => {
        setLogIn(true)
    }

    const logout = () => {
        setHide(false)
        setFadeIn(false)

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
                        {!user ? <Link onClick={() => { handleFade(); handleLogIn(); }}>Log In</Link> : <Link to="/character_selection">Demo</Link>}
                    </li>

                    <li>
                        {!user ? <Link onClick={handleFade}>Sign Up</Link> : <Link>Options</Link>}
                    </li>
                    {!user ? "" : <li><Link onClick={logout}>Log Out</Link></li>}
                </ul>
            </nav>
            <Outlet />

            <LogInForm logIn={logIn} fadeIn={fadeIn} handleFadeOut={handleFadeOut} hide={hide} setHide={setHide} updateUser={updateUser} />
        </div>
    )
}

export default MenuSelection;
