import React, { useState } from 'react'
import LogInForm from '../LogInForm/LogInForm';
import { Link } from "react-router-dom";
import './MenuSelection.css'


function MenuSelection() {
    const [fadeIn, setFadeIn] = useState(false)

    const handleFade = () => {
        setFadeIn(true)
    }

    const handleFadeOut = () => {
        setFadeIn(false)
    }

    return (
        <div className='MenuSelection h-full flex items-end text-white pl-28 pb-36'>
            <nav>
                <ul>
                    <li>
                        <Link onClick={handleFade}>Log In</Link>
                    </li>

                    <li>
                        <Link to="/signup">Sign Up</Link>
                    </li>
                </ul>
            </nav>
            <LogInForm fadeIn={fadeIn} handleFadeOut={handleFadeOut} />
        </div>
    )
}

export default MenuSelection;
