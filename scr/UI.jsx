import React, { useState } from 'react';
import { sendState, players } from './network.js';

export default function UI({ user }) {
  const [task,setTask] = useState(0);

  const updateTask = ()=>{
    const newTask = Math.min(task+5,100);
    setTask(newTask);
    if(players[user.username]){
      players[user.username].taskProgress = newTask;
      sendState(players[user.username]);
    }
  };

  return (
    <div style={{position:"absolute",top:10,left:10,color:"#fff"}}>
      <button onClick={updateTask}>タスク進める</button>
      <div style={{width:200,height:20,background:"#444"}}>
        <div style={{width:task+"%",height:"100%",background:"#0f0"}}></div>
      </div>
    </div>
  );
}
