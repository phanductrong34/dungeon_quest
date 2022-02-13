<template>
    <div class="controller">
        <div class="queue">
            <ul class="queue-list">
                <li v-for="(dir,index) in heldDirections" :key="index">{{dir}}</li>
            </ul>
            <img class="queue-img" src="@/assets/images/modal_lose.png">
        </div>
        <div class="box">
          <div class="box-wrapper">
            <h1 class="box-title">Arrow</h1>
            <h1 class="box-number">{{curDir}}</h1>
            <img class="box-img" src="@/assets/images/box_empty.png">
          </div>
          <div class="box-wrapper">
            <h1 class="box-title">Step</h1>
            <h1 class="box-number">{{curStep}}</h1>                                                                            
            <img class="box-img" src="@/assets/images/box_empty.png">
          </div>
        </div>
        <div v-if="isRec" class="recording">
            <h2>RECORD</h2> 
        </div>
    
    </div>
</template>

<script>
import {ref,onMounted,computed, watch, onBeforeUnmount} from 'vue'
import {store} from '@/store/index' 
export default {
    props:['directionInput'],
    setup (props) {
            const isRec = ref(false);
            const curDir = ref(null);
            const curStep = ref(null);
            const heldDirections = ref([]);

            

            let recognizer;
            let directionDic = {
                "up": "u",
                "down": "d",
                "left": "l",
                "right": "r",
            }
            let stepDic = {
                "one": 1,
                "two": 2,
                "three": 3,
                "four": 4,
                "five": 5,
                "six": 6,
                "seven": 7,
                "eight:": 8,
            }
            //direction : hướng đi + số bước 

            const predictWord = ()=> {
                // Array of words that the recognizer is trained to recognize.
                const words = recognizer.wordLabels();

                recognizer.listen(({scores}) => {

                        // Turn scores into a list of (score,word) pairs.
                        scores = Array.from(scores).map((s, i) => ({score: s, word: words[i]}));
                        // Find the most probable word.
                        scores.sort((s1, s2) => s2.score - s1.score);
                        const resultWord = scores[0].word;

                        if(resultWord in directionDic) {
                            curDir.value = resultWord;
                        }else if(resultWord in stepDic) {
                            curStep.value = stepDic[resultWord];
                        }
                }, {probabilityThreshold: 0.75});
            }

            onMounted(async()=>{
                recognizer = speechCommands.create('BROWSER_FFT');
                await recognizer.ensureModelLoaded();

                document.addEventListener('keydown',startRec);
                document.addEventListener('keyup',stopRec);
            })

            onBeforeUnmount(()=>{
                document.removeEventListener('keydown',startRec);
                document.removeEventListener('keyup',stopRec);
            })

            const startRec = (e)=>{
                const key = e.code;
                if(key == "Space" && !isRec.value){
                    isRec.value = true;
                    predictWord();
                }
            }
            const stopRec = (e)=>{
                const key = e.code;
                console.log(key);
                if(key == "Space" && isRec.value && curDir.value){
                    console.log(curDir.value + curStep.value);
                    if(!curStep.value){ // bỏ trống bước
                        heldDirections.value.push(curDir.value);
                    }
                    for(let i = 0; i < curStep.value; i++){
                        heldDirections.value.push(curDir.value);
                    }
                    curStep.value = null;
                    curDir.value = null;
                    isRec.value = false;
                    recognizer.stopListening();
                    firstStep();
                }
            }

            let first = true;
            const walkTrigger = computed(()=>store.getters['event/getWalkTrigger']);
            const activeDir = ref(null)


            const firstStep = ()=>{
                if(first){
                    props.directionInput.pushDir(heldDirections.value[0]);
                    activeDir.value = heldDirections.value[0];
                    first = false
                    console.log('Walk First Time');
                }
            }
; 
            watch(walkTrigger, (val)=>{ // val = true/false
                if(val){ // bước xong xuôi
                    //Dọn sạch
                    props.directionInput.removeDir(activeDir.value);
                    activeDir.value = null;
                    heldDirections.value.shift();

                    //CB bước kế tiếp
                    if(heldDirections.value[0]){ //còn trong queue
                        props.directionInput.pushDir(heldDirections.value[0]);
                        activeDir.value = heldDirections.value[0];
                    }else{
                        first = true; // reset để tiếp tục firstTime
                    }

                }
            })
            

        return {isRec,curStep,curDir,startRec,stopRec,heldDirections,walkTrigger}
    }
}
</script>

<style lang="scss" scoped>
.controller{
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 2rem;
}
.queue{
    width: 100%;    
    position: relative;
   
    margin-bottom: 1rem;
    &-list{
        position: absolute;
        @include center-1;
        top: 50%;
        color: white;
        height: 100%;
         overflow:hidden;
         z-index: 100;
    }
    &-img{
        width: 100%;
        transform: scale(1, 1.3);
        z-index: 99;
    
    }
}
.box{
    display: flex;
    &-wrapper{
        width: 50%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: relative;
    }
    &-title{
        font-size: 1.2rem;
        color:rgb(255, 208, 0);
    }
    &-img{
        width: 100%;
    }
    &-number{
        position: absolute;
        font-size:1.2rem;
        color: white;
        @include center-1;
        top: 65%;
    }
}
.recording{
    color: red;
    
}

</style>