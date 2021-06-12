<template>
  <el-container>
    <el-main>
      <h1>Welcome to Easy Talk</h1>
      <el-card shadow="never">
        <el-button type="primary" round @click="newRoom"
          >Create a new room</el-button
        >
        <el-divider></el-divider>
        <p>Or get into an already created room</p>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-input
              placeholder="Type room code here"
              v-model="roomCode"
            ></el-input>
          </el-col>
          <el-col :span="12">
            <el-button type="primary" round plain @click="enterRoom"
              >Take me there</el-button
            >
          </el-col>
        </el-row>
      </el-card>
    </el-main>
  </el-container>
</template>

<script>
import { ref } from "@vue/reactivity";
import router from "../router";
import { ElMessage } from "element-plus";

export default {
  name: "HomePage",
  setup() {
    const roomCode = ref("");

    const newRoom = () => {
      router.push("/room/123");
    };

    const enterRoom = () => {
      if (roomCode.value) {
        router.push(`/room/${roomCode.value}`);
      } else {
        ElMessage({
          message: "You need to provide a room code",
          type: "error",
          showClose: true
        });
      }
    };

    return { roomCode, newRoom, enterRoom };
  },
};
</script>

<style scoped>
</style>