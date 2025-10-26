import React from 'react';

export default function Player({ id, position, color }) {
  return (
    <mesh position={[position.x, position.y, position.z]}>
      <boxGeometry args={[0.5,1,0.5]}/>
      <meshStandardMaterial color={color}/>
    </mesh>
  );
}
