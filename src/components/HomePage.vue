<template>
  <el-container>
    <el-main>
      <h1>Welcome to Easy Talk</h1>
      <el-card shadow="never">
        <p>Give yourself a username</p>
        <el-row>
          <el-col :span="12">
            <el-input 
              placeholder="Your username"
              v-model="username"
            ></el-input>
          </el-col>
        </el-row>
        <el-divider></el-divider>
        <el-button :disabled="!username" type="primary" round @click="newRoom"
          >Create a new room</el-button
        >
        <p>Or get into an already created room</p>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-input
              placeholder="Type room code here"
              v-model="roomCode"
            ></el-input>
          </el-col>
          <el-col :span="12">
            <el-button :disabled="!username" type="primary" round plain @click="enterRoom"
              >Take me there</el-button
            >
          </el-col>
        </el-row>
      </el-card>
    </el-main>
  </el-container>
</template>

<script>
import { ElMessage } from "element-plus";
import useStore from '../composition/store';
import useConnection from '../composition/socket';

export default {
  name: "HomePage",
  setup() {
    const { username, roomCode } = useStore();
    const { socket, joinRoom } = useConnection();

    socket.on('create_room:success', roomId => {
      roomCode.value = roomId
      joinRoom();
    })

    socket.on('create_user:error', (error) => {
      ElMessage({
        message: error,
        type: 'error'
      })
    })

    const newRoom = async () => {
      socket.emit('create_room');
    };

    const enterRoom = async () => {
      joinRoom();
    };

    return { username, roomCode, newRoom, enterRoom };
  },
};
</script>

<style scoped>
</style>