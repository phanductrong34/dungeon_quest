import {db,collection, getDoc,orderBy} from "@/firebase/config"
import { ref } from 'vue'

const getDocu = (coll) => {
    const dataArray = ref([]);
    const error = ref("");

    const load = async(id) => {
        try {
            const res = await getDoc(collection(db,coll,id));
            dataArray.value = res.docs.map(doc => {
                return {...doc.data(), id: doc.id}
            })       
        } catch (err) {
            error.value = err.message;
            console.log('Get error log: '+ err.value);   
        }
    }

    
    return {dataArray , error, load}
}

export default getDocu