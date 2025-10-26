export const players = {};
export let socket = null;

export function connectServer(userId){
  socket = new WebSocket("ws://localhost:8080");

  socket.onopen = ()=>{
    socket.send(JSON.stringify({type:"login", id:userId}));
  };

  socket.onmessage = (msg)=>{
    const data = JSON.parse(msg.data);
    if(data.type==="state_broadcast"){
      Object.assign(players, data.players);
    }
    if(data.type==="ban"){
      alert(data.message);
      window.location.reload();
    }
    if(data.type==="force_join"){
      joinRoom(data.room);
    }
    if(data.type==="start_game"){
      joinGameServer(data.room);
    }
  };
}

export function sendState(player){
  if(socket && socket.readyState===WebSocket.OPEN){
    socket.send(JSON.stringify({
      type:"update_state",
      id:player.id,
      position:player.position,
      rotation:player.rotation,
      taskProgress:player.taskProgress
    }));
  }
}

export function joinRoom(room){
  socket.send(JSON.stringify({type:"join_room", roomName:room.name, password:room.password}));
}

export function joinGameServer(room){
  socket.send(JSON.stringify({type:"join_game_server", roomName:room.name}));
}
