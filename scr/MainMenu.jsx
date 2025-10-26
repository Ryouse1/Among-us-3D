import React, { useState } from 'react';

export default function MainMenu({ onLogin }) {
  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  const [server,setServer] = useState("public");

  const handleLogin = ()=>{
    if(username && password){
      onLogin({username,password,server});
    }
  };

  return (
    <div style={{color:"#fff"}}>
      <h2>Main Menu</h2>
      <input placeholder="ユーザー名" value={username} onChange={e=>setUsername(e.target.value)}/>
      <input type="password" placeholder="パスワード" value={password} onChange={e=>setPassword(e.target.value)}/>
      <select value={server} onChange={e=>setServer(e.target.value)}>
        <option value="public">Public Server</option>
        <option value="private">Private Server</option>
      </select>
      <button onClick={handleLogin}>ログイン</button>
    </div>
  );
}
