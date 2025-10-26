import React from 'react';
import { useGLTF } from '@react-three/drei';

export default function LobbyMap() {
  const { scene } = useGLTF('/models/lobby_map.glb');
  return <primitive object={scene}/>;
}
