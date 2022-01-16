import {db,collection, getDocs,orderBy,where} from "@/firebase/config"
import { ref } from 'vue'

const getCollectionFilter = (coll) => {
    const dataArray = ref([]);
    const error = ref("");

    const load = async(key,value) => {
        try {
            const res = await getDocs(collection(db,coll),where(key,'=',value),orderBy('createdAt','desc'));
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

export default getCollectionFilter