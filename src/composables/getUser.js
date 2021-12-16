import {auth,onAuthStateChanged} from '@/firebase/config'
import {ref} from 'vue'

const user = ref(auth.currentUser)
const isAdmin = ref(false);
const loadUser = ref(false);
onAuthStateChanged(auth, (_user) => {
    if (_user) {
      user.value = _user;
      const uid = _user.uid;
    } else {
      // User is signed out
      // ...
    }
    loadUser.value = true;
})

const getUser = ()=> {
    return {user,isAdmin,loadUser};
}

export default getUser