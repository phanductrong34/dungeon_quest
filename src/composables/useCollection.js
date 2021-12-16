import {ref} from 'vue'
import {db, collection, setDoc, addDoc} from '../firebase/config'

const useCollection = (coll)=> {
    const error = ref(null);
    const addDocument = async (docu)=> {
        try{
            const res = await addDoc(collection(db,coll), docu)
            return res
        }catch(err){
            error.value = err.message;
            console.log(error.value,coll);
        }
    } 

    const setDocument = async (docu,id)=> {
        try{
            const res = await setDoc(collection(db,coll,id), docu)
            return res
        }catch(err){
            error.value = err.message;
            console.log(error.value,coll);
        }
    }
    return {error, addDocument,setDocument}
}

export default useCollection