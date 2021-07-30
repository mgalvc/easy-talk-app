<template>
  <el-container id="chat-container">
    <el-header id="info-container">
      <el-row id="header-row">
        <el-col :span="12">
          <b>{{ username }}</b
          ><br />
          <i>Connected with {{ usersConnected.join(", ") || "none" }}</i>
        </el-col>
        <el-col :span="12" style="text-align: right">
          <el-button type="primary" icon="el-icon-share" @click="copyRoomCode">Copiar código</el-button>
          <el-button type="danger" @click="disconnect">Sair</el-button>
        </el-col>
      </el-row>
    </el-header>
    <el-main id="messages-container">
      <div
        v-for="message of messages"
        :key="message"
        class="message"
        :class="{ 'text-right': message.from === username }"
      >
        {{ message.from === username ? "You" : message.from }}:
        {{ message.text }}
      </div>
    </el-main>
    <el-footer id="message-input">
      <el-input
        placeholder="Type your message"
        suffix-icon="el-icon-right"
        v-model="message"
        @keyup.enter="sendMessage"
        id="message-input"
      ></el-input>
    </el-footer>
  </el-container>
</template>

<script>
import { ref } from "@vue/reactivity";
import { useRoute, useRouter } from "vue-router";
import useStore from "../composition/store";
import useConnection from "../composition/socket";
import { onMounted } from "@vue/runtime-core";

export default {
  name: "ChatRoom",
  setup() {
    const message = ref("");
    const messages = ref([]);
    const { username, usersConnected } = useStore();
    const { id: room } = useRoute().params;
    const { push } = useRouter();
    const { socket, isConnected, leaveRoom, joinRoom } = useConnection();

    onMounted(() => {
      if (!username.value) {
        push("/");
      }

      if (!isConnected.value) {
        joinRoom(room);
      }
    });

    socket.on("message", ({ username, message }) => {
      messages.value.push({
        from: username,
        text: message,
      });
      setTimeout(() => {
        const container = document.getElementById("messages-container");
        container.scrollTop = container.scrollHeight;
      }, 25);
    });

    const sendMessage = () => {
      if (message.value) {
        socket.emit("message", {
          username: username.value,
          message: message.value,
          room,
        });
        message.value = "";
      }
    };

    const copyRoomCode = () => {
      const el = document.createElement('textarea')
      el.value = room
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
    }

    const disconnect = () => {
      leaveRoom()
      push('/')
    }

    return { message, messages, username, usersConnected, disconnect, copyRoomCode, sendMessage };
  },
};
</script>

<style scoped>
#chat-container {
  height: 95vh;
}

#info-container {
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  margin-bottom: 10px;
}

#header-row {
  margin-top: 10px;
}

#messages-container {
  margin-bottom: 10px;
  padding-top: 0;
  padding-bottom: 0;
}

.message {
  border: 1px solid #ebeef5;
  border-radius: 4px;
  padding: 10px 20px;
  margin-bottom: 5px;
}

.text-left {
  text-align: left;
}

.text-right {
  text-align: right;
}
</style>>
