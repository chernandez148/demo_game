import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MenuSelection from '../MenuSelection/MenuSelection'
import SignUpForm from '../SignUpForm/SignUpForm';
import './MainMenu.css'

function MainMenu() {
    const [fadeIn, setfFdeIn] = useState(false)

    useEffect(() => {
        const MainMenuFadeIn = setTimeout(() => {
            setfFdeIn(true);
        }, 10000);

        return () => {
            clearTimeout(MainMenuFadeIn);
        };
    }, []);

    const backgroundFadeIn = fadeIn ? "fadeIn" : ""

    return (
        <div className={`MainMenu h-full ${backgroundFadeIn}`}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MenuSelection />}>
                        <Route path="/signup" element={<SignUpForm />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default MainMenu;
