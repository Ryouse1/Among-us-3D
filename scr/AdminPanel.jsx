import React, { useState } from 'react';
import { socket } from './network.js';

export default function AdminPanel({ players }) {
  const [targetUser,setTargetUser]=useState("");

  const forceConnect = ()=>socket.send(JSON.stringify({type:"force_connect", targetId:targetUser}));
  const banUser = ()=>socket.send(JSON.stringify({type:"ban", targetId:targetUser}));

  return (
    <div style={{position:"absolute",top:200,left:10,color:"#f88"}}>
      <h3>管理者パネル</h3>
      <input placeholder="ユーザーID" value={targetUser} onChange={e=>setTargetUser(e.target.value)}/>
      <button onClick={forceConnect}>強制接続</button>
      <button onClick={banUser}>BAN</button>
      <div>
        <h4>現在のプレイヤー</h4>
        <ul>{Object.keys(players).map(id=><li key={id}>{id}</li>)}</ul>
      </div>
    </div>
  );
}
