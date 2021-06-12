<template>
  <router-view></router-view>
</template>

<script>
import { ref } from '@vue/reactivity';
export default {
  name: "App",
  setup() {
    const roomCode = ref('')

    return { roomCode }
  },
};
</script>

<style scoped>

</style>>
