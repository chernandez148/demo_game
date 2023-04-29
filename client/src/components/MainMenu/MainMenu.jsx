import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MenuSelection from '../MenuSelection/MenuSelection'
import SignUpForm from '../SignUpForm/SignUpForm';
import CharacterSelection from '../CharacterSelection/CharacterSelection';
import './MainMenu.css'

function MainMenu() {
    const [user, setUser] = useState(null)
    const [fadeIn, setfFdeIn] = useState(false)
    console.log(user)

    useEffect(() => {
        mainMenu()
        fetchUser()
    }, []);

    const mainMenu = () => {
        const MainMenuFadeIn = setTimeout(() => {
            setfFdeIn(true);
        }, 10000);

        return () => {
            clearTimeout(MainMenuFadeIn);
        };
    }

    const fetchUser = () => {
        fetch("/authorized")
            .then(resp => {
                if (resp.ok) {
                    resp.json()
                        .then(data => {
                            setUser(data)
                        })
                } else {
                    setUser(null)
                }
            })
    }

    const backgroundFadeIn = fadeIn ? "fadeIn" : ""

    const updateUser = (user) => setUser(user)

    return (
        <div className={`MainMenu h-full ${backgroundFadeIn}`}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MenuSelection user={user} updateUser={updateUser} />}>
                        <Route exact path="/signup" element={<SignUpForm />} />
                        <Route exact path='/character_selection' element={<CharacterSelection />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default MainMenu;
