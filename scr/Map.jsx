import React from 'react';
import { useGLTF } from '@react-three/drei';

export default function Map() {
  const { scene } = useGLTF('/models/among_us_-_map_the_skeld.glb');
  return <primitive object={scene}/>;
}
