import { BrowserRouter } from "react-router-dom";
import Fade from '../Fader/Fader'
import MainMenu from '../MainMenu/MainMenu';
import './App.css'
import '../../index.css'

function App() {
  return (
    <div className="App h-screen bg-zinc-950">
      <Fade />
      <BrowserRouter>
        <MainMenu />
      </BrowserRouter>
    </div>
  );
}

export default App;
