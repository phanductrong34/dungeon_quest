import {auth,createUserWithEmailAndPassword,updateProfile} from '../firebase/config'
import {ref} from 'vue'

const error = ref(null)
const currentUser = ref(null)

const signup = async (email,password) =>{
    // khi chạy hàm này thì clear error đã
    error.value = null;
    
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      currentUser.value = userCredential.user;

      const username = email.slice(0,email.indexOf('@'));
      await updateProfile(userCredential.user,{
          displayName: username
      })

    } catch (err) {
        console.log(err.message);
        // ở đây ta không output ra message viif nó sẽ để lộ ra các lỗi mà hacker có thể test để thử truy cập vào
        error.value = err.message;
    }
}

const useSignup = () => {
    return {error, signup}
}

export default useSignup


