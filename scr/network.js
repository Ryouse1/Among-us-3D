export const players = {};
export let socket = null;
export const activeServers = {}; // serverId: { started: true/false }

export function connectServer(userId){
  socket = new WebSocket("wss://amongus.com");

  socket.onopen = ()=>{
    socket.send(JSON.stringify({type:"login", id:userId}));
  };

  socket.onmessage = (msg)=>{
    const data = JSON.parse(msg.data);

    switch(data.type){
      case "state_broadcast":
        Object.assign(players, data.players);
        break;
      case "ban":
        alert(data.message);
        window.location.reload();
        break;
      case "force_join":
        joinRoom(data.room);
        break;
      case "start_game":
        // サーバー開始
        const serverId = data.room.serverId;
        activeServers[serverId] = { started:true };
        joinGameServer(data.room);
        break;
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
  if(activeServers[room.serverId]?.started){
    alert("ゲームが始まったため入れません");
    return;
  }
  socket.send(JSON.stringify({type:"join_room", roomName:room.name, serverId:room.serverId}));
}

export function joinGameServer(room){
  socket.send(JSON.stringify({type:"join_game_server", roomName:room.name, serverId:room.serverId}));
}
