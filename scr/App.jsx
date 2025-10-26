import React, { useState } from 'react';
import MainMenu from './MainMenu.jsx';
import Lobby from './Lobby.jsx';
import Game from './Game.jsx';
import { players } from './network.js';

export default function App() {
  const [user,setUser] = useState(null);
  const [room,setRoom] = useState(null);
  const [inGame,setInGame] = useState(false);

  if(!user) return <MainMenu onLogin={setUser}/>;
  if(user && !room) return (
    <Lobby user={user} onJoin={(r)=>setRoom(r)} onStart={()=>setInGame(true)} />
  );
  if(inGame) return <Game user={user} room={room} players={players}/>;
  
  return <Lobby user={user} room={room} onStart={()=>setInGame(true)}/>;
}
