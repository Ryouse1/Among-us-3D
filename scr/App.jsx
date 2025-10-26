import React, { useState } from 'react';
import { Routes, Route, useParams, Navigate } from 'react-router-dom';
import MainMenu from './MainMenu.jsx';
import Lobby from './Lobby.jsx';
import Game from './Game.jsx';
import { players } from './network.js';

export default function App() {
  const [user, setUser] = useState(null);
  const [room, setRoom] = useState(null);
  const [inGame, setInGame] = useState(false);

  return (
    <Routes>
      <Route path="/" element={!user ? <MainMenu onLogin={setUser}/> : <Navigate to={`/server:default`} />} />
      <Route path="/server::serverId" element={<ServerEntry user={user} inGame={inGame} room={room} setRoom={setRoom} setInGame={setInGame}/>} />
    </Routes>
  );
}

function ServerEntry({ user, inGame, room, setRoom, setInGame }) {
  const { serverId } = useParams();

  if(!user) return <MainMenu onLogin={(u)=>window.location.reload()}/>;

  // サーバー開始後は入れない
  if(room && room.serverId !== serverId && room.started){
    return <div>このサーバーには入れません。</div>;
  }

  if(!room){
    // ロビーに自動参加
    const r = {name:"ロビー", serverId, hostId:user.username, started:false};
    setRoom(r);
    return <Lobby user={user} onStart={()=>setInGame(true)} room={r}/>;
  }

  if(!inGame){
    return <Lobby user={user} onStart={()=>setInGame(true)} room={room}/>;
  }

  return <Game user={user} room={room} players={players}/>;
}
