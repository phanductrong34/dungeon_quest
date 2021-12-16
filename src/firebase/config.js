import {initializeApp} from 'firebase/app'
import {getAuth,createUserWithEmailAndPassword,
  signInWithEmailAndPassword,onAuthStateChanged,signOut,
  updateProfile} from 'firebase/auth'
import {getFirestore, doc, setDoc, addDoc,collection,
        serverTimestamp} from 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyD54vo2ff5-rBITwz7EWMUi3jUQFgJEmD8",
    authDomain: "vue-dungeon-game.firebaseapp.com",
    projectId: "vue-dungeon-game",
    storageBucket: "vue-dungeon-game.appspot.com",
    messagingSenderId: "490483208943",
    appId: "1:490483208943:web:217652aad67871bb38811a"
  };
  

const app = initializeApp(firebaseConfig)

// hàm này trả ra mỘt promise mà sẽ trả ra user ngay khi khi resolve
// kết hợp với route gaurd ở bên kia để mỗi lần nhảy trang ta lại check lại sự tồn tại cùa user
// kết hợp với trường check isAdmin ở meta của các route, ta sẽ check thêm token của admin tại đây mỗi khi nhảy router mới
// firebase.getCurrentUser = () => {
//     return new Promise((resolve, reject) => {
//         const unsubscribe = firebase.auth().onAuthStateChanged(user => {
//             unsubscribe();
//             resolve(user);
//         }, reject);
//     })
// };


const auth = getAuth();
const db = getFirestore();

// const projectStorage = getFireStorage()
// const timestamp = projectFirestore.FieldValue.serverTimestamp;
// const FieldValue = projectFirestore.FieldValue;


export {auth,createUserWithEmailAndPassword,signInWithEmailAndPassword,onAuthStateChanged,signOut,updateProfile,
    db,doc,collection, setDoc, addDoc,serverTimestamp}

