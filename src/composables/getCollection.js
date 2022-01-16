import {db,collection, getDocs,orderBy} from "@/firebase/config"
import { ref } from 'vue'

const getCollection = (coll) => {
    const dataArray = ref([]);
    const error = ref("");

    const load = async() => {
        try {
            const res = await getDocs(collection(db,coll),orderBy('createdAt','desc'));
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

export default getCollection