import React, { useState, useEffect } from 'react'
import './Fader.css'

const Fader = () => {
    const [fade, setFade] = useState(false)
    const [secondFade, setSecondFade] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setFade(true);
        }, 2000);

        setTimeout(() => {
            setFade(false);
        }, 4000);

        setTimeout(() => {
            setSecondFade(true);
        }, 6000);

        const fadeOutTimeout = setTimeout(() => {
            setSecondFade(false);
        }, 8000);

        return () => {
            clearTimeout(fadeOutTimeout);
        };
    }, []);

    const fadeIn = fade === true ? "fade-in" : "fade-out"
    const secondFadeIn = secondFade === true ? "fade-in" : "fade-out"
    return (
        <div className='Fade h-full w-full flex flex-col justify-center items-center absolute text-white'>
            <h6 className={fadeIn}>created by: Christian Hernandez</h6>
            <h6 className={secondFadeIn}>enjoy</h6>
        </div>
    );
}


export default Fader