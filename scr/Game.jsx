import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Map from './Map.jsx';
import Player from './Player.jsx';
import UI from './UI.jsx';
import AdminPanel from './AdminPanel.jsx';

export default function Game({ user, room, players }) {
  return (
    <>
      <Canvas camera={{ position:[0,5,10], fov:75 }}>
        <ambientLight intensity={0.5}/>
        <directionalLight position={[10,10,10]} intensity={1}/>
        <Map/>
        {Object.entries(players).map(([id,p])=>
          <Player key={id} id={id} position={p.position} color={p.color||"red"}/>
        )}
        <OrbitControls/>
      </Canvas>
      <UI user={user}/>
      <AdminPanel players={players}/>
    </>
  );
}
