import React, { useState } from 'react'
import './App.css'

function App() {
  const [fadeInP1, setFadeInP1] = useState(false)
  const [fadeInP2, setFadeInP2] = useState(false)

  window.addEventListener('load', () => {
    setTimeout(() => {
      setFadeInP1(true)
    }, 2000);
    setTimeout(() => {
      setFadeInP1(false)
    }, 4000);
    setTimeout(() => {
      setFadeInP2(true)
    }, 6000);
    setTimeout(() => {
      setFadeInP2(false)
    }, 8000);
  });

  const showCreditsP1 = fadeInP1 == true ? "opacity-1" : "opacity-0"
  const showCreditsP2 = fadeInP2 == true ? "opacity-1" : "opacity-0"

  return (
    <div className='App vh-100 d-flex flex-column align-items-center justify-content-center'>
      <h6 className={showCreditsP1}>a demo, made by: Christian Hernandez</h6>
      <h6 className={showCreditsP2}>enjoy</h6>
    </div>
  )
}

export default App
