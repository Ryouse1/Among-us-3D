import React, { useState } from 'react';
import MainMenu from './MainMenu.jsx';
import Lobby from './Lobby.jsx';
import Game from './Game.jsx';
import { players } from './network.js';

export default function App() {
  const [user, setUser] = useState(null); // {username,password,server}
  const [room, setRoom] = useState(null);

  if(!user) return <MainMenu onLogin={setUser}/>;
  if(user && !room) return <Lobby user={user} onJoin={setRoom}/>;

  return <Game user={user} room={room} players={players}/>;
}
