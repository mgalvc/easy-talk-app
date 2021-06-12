<template>
  <el-container id="chat-container">
    <el-header id="info-container" height="50px">
      <div>Easy Talk</div>
    </el-header>
    <el-main id="messages-container">
      <div
        v-for="message of messages"
        :key="message"
        class="message"
        :class="{ 'text-right': message.from === 'you' }"
      >
        {{ message.from === "you" ? "You" : message.from }}:
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

export default {
  name: "ChatRoom",
  setup() {
    const message = ref("");
    const messages = ref([]);
    const username = "you";

    const sendMessage = () => {
      if (message.value) {
        messages.value.push({
          from: username,
          text: message.value,
        });
        message.value = "";

        setTimeout(() => {
          const container = document.getElementById("messages-container");
          container.scrollTop = container.scrollHeight;
        }, 25);
      }
    };

    return { message, messages, username, sendMessage };
  },
};
</script>

<style scoped>
#chat-container {
  height: 100vh;
}

#info-container {
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  margin-bottom: 10px;
}

#info-container div {
  margin: 0;
  position: relative;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
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
