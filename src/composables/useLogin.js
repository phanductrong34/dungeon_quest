import {auth,signInWithEmailAndPassword} from '../firebase/config'
import {ref} from 'vue'

const error = ref(null)
const currentUser = ref(null)

const login = (email,password) =>{
    // khi chạy hàm này thì clear error đã
    error.value = null;
    
    try {
      const userCredential = signInWithEmailAndPassword(auth, email, password)
      currentUser.value = userCredential.user;
      console.log( userCredential.user);
    } catch (err) {
        console.log(err.message);
        // ở đây ta không output ra message viif nó sẽ để lộ ra các lỗi mà hacker có thể test để thử truy cập vào
        error.value = err.message;
    }
}

const useLogin = () => {
    return {error, login}
}

export default useLogin


