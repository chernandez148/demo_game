import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MenuSelection from '../MenuSelection/MenuSelection'
import SignUpForm from '../SignUpForm/SignUpForm';
import './MainMenu.css'

function MainMenu() {
    const [user, setUser] = useState(null)
    const [fadeIn, setfFdeIn] = useState(false)
    console.log(user)

    useEffect(() => {
        const MainMenuFadeIn = setTimeout(() => {
            setfFdeIn(true);
        }, 10000);

        return () => {
            clearTimeout(MainMenuFadeIn);
        };
    }, []);

    const backgroundFadeIn = fadeIn ? "fadeIn" : ""

    const updateUser = (user) => setUser(user)

    return (
        <div className={`MainMenu h-full ${backgroundFadeIn}`}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MenuSelection updateUser={updateUser} />}>
                        <Route path="/signup" element={<SignUpForm />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default MainMenu;
