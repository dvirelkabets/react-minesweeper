import './App.css';
import MainHeader from './components/MainHeader';
import GameGrid from './components/GameGrid';
import { useState } from 'react';

function App() {
  const [showNewGame,setShowNewGame]= useState(false)
  const [showEndGame,setShowEndGame] = useState(false)


  function HideModalHandler() {
    setShowNewGame(false)
  }

  function showModalHandler() {
    setShowNewGame(true)
  }

  return (
    <>
    
      <MainHeader click={showModalHandler}/>
      <GameGrid newGame={showNewGame} hideModal={HideModalHandler}/>
    </>
  );
}

export default App;
