import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link, Outlet } from "react-router-dom";
import LogInForm from '../LogInForm/LogInForm';
import './MenuSelection.css'


function MenuSelection({ updateUser, user, setfFadeIn }) {
    const [fadeIn, setFadeIn] = useState(false)
    const [logIn, setLogIn] = useState(false)
    const [hide, setHide] = useState(false)
    const [characterSelectBG, setCharacterSelectBG] = useState(false)
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

    const handleSignUp = () => {
        setLogIn(false)
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

    const handleCharacterScreen = () => {
        setCharacterSelectBG(true)
    }

    return (
        <div className='MenuSelection h-full flex items-end text-white pl-28 pb-36'>
            <nav>
                <ul>
                    <li>
                        {!user ? <Link onClick={() => { handleFade(); handleLogIn(); }}>Log In</Link> : <Link onClick={handleCharacterScreen} to="/character_selection">Demo</Link>}
                    </li>

                    <li>
                        {!user ? <Link onClick={() => { handleFade(); handleSignUp() }}>Sign Up</Link> : <Link>Options</Link>}
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
