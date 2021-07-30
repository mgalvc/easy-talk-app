import { io } from 'socket.io-client';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import useStore from './store';

let socket = io('http://localhost:3000')
const isConnected = ref(false);

const useConnection = () => {
  const { username, roomCode, usersConnected, cleanStore, storeUsername } = useStore();
  const { path } = useRoute();
  const { push } = useRouter();
  
  const joinRoom = (code) => {
    if(!roomCode.value) {
      roomCode.value = code
    }
    socket.emit('create_user', username.value);
  }

  socket.on('create_user:success', () => {
    storeUsername(username.value);
    socket.emit('join_room', roomCode.value);
  })

  socket.on('join_room:success', () => {
    ('joined room succesfully')
    isConnected.value = true;
    if(path === '/') {
      push(`/room/${roomCode.value}`);
    }
  })

  socket.on("users", (users) => {
    usersConnected.value = users.filter((name) => name !== username.value);
  });

  const leaveRoom = () => {
    socket.disconnect()
    cleanStore()
    socket = io('http://localhost:3000')
  }

  return { socket, isConnected, leaveRoom, joinRoom }
}

export default useConnection
