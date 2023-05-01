import React, { useState, useEffect } from 'react'
import { Routes, Route } from "react-router-dom";
import MenuSelection from '../MenuSelection/MenuSelection'
import CharacterSelection from '../CharacterSelection/CharacterSelection';
import './MainMenu.css'

function MainMenu() {
    const [user, setUser] = useState(null)
    const [fadeIn, setfFadeIn] = useState(false)
    const [character, setCharacter] = useState([])
    const [jobData, setJobData] = useState([])
    console.log(user)
    console.log(character)
    console.log(jobData)

    useEffect(() => {
        mainMenu()
        fetchUser()
        fetchJobStats()
        fetchCharacters()
    }, []);

    const mainMenu = () => {
        const MainMenuFadeIn = setTimeout(() => {
            setfFadeIn(true);
        }, 10000);

        return () => {
            clearTimeout(MainMenuFadeIn);
        };
    }

    const fetchJobStats = () => {
        fetch("/job_stats")
            .then(resp => resp.json())
            .then(data => setJobData(data))
    }

    const fetchCharacters = () => {
        fetch("/character")
            .then(resp => resp.json())
            .then(data => setCharacter(data))
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

    const addCharacter = (character) => setCharacter(current => [...current, character])

    const updateUser = (user) => setUser(user)

    return (
        <div className={`MainMenu h-full ${backgroundFadeIn}`}>
            <Routes>
                <Route exact path="/" element={<MenuSelection user={user} updateUser={updateUser} setfFadeIn={setfFadeIn} />} />
                <Route exact path='/character_selection' element={<CharacterSelection setfFadeIn={setfFadeIn} jobData={jobData} addCharacter={addCharacter} />} />
            </Routes>
        </div>
    )
}

export default MainMenu;
