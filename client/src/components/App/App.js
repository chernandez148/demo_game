import Fade from '../Fader/Fader'
import MainMenu from '../MainMenu/MainMenu';
import './App.css'
import '../../index.css'

function App() {
  return (
    <div className="App h-screen bg-zinc-950">
      <Fade />
      <MainMenu />
    </div>
  );
}

export default App;
