import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import LobbyMap from './LobbyMap.jsx';
import Player from './Player.jsx';
import { players, socket } from './network.js';

export default function Lobby({ user, onJoin, onStart, room }) {
  const isHost = !room || room.hostId===user.username;

  const startGame = ()=>{
    if(isHost){
      socket.send(JSON.stringify({type:"start_game", roomName:room?.name || "ロビー"}));
      onStart();
    }
  };

  const joinRoom = ()=>{
    if(onJoin) onJoin({name:"ロビー", hostId:user.username});
  };

  return (
    <>
      <Canvas camera={{position:[0,5,10], fov:75}}>
        <ambientLight intensity={0.5}/>
        <directionalLight position={[10,10,10]} intensity={1}/>
        <LobbyMap/>
        {Object.entries(players).map(([id,p])=>
          <Player key={id} id={id} position={p.position} color={p.color||"red"}/>
        )}
        <OrbitControls/>
      </Canvas>
      {!room && <button style={{position:"absolute",top:10,left:10}} onClick={joinRoom}>ロビー参加</button>}
      {isHost && <button style={{position:"absolute",top:50,left:10}} onClick={startGame}>ゲーム開始</button>}
    </>
  );
}
