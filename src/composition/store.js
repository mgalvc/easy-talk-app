import { ref } from "vue"

const roomCode = ref('');
const username = ref(
  localStorage.getItem('username') || ''
)
const usersConnected = ref([])

const useStore = () => {
  const storeUsername = () => {
    localStorage.setItem('username', username.value)
  }

  const cleanStore = ()  => {
    localStorage.removeItem('username')
    username.value = ''
    roomCode.value = ''
    usersConnected.value = []
  }

  return { username, roomCode, usersConnected, cleanStore, storeUsername }
}

export default useStore