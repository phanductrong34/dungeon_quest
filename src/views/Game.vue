<template>

  <ModalGame
      :isPlaying="isPlaying"
      :timeLeft="timeLeft"
      :timeCount="timeCount"
      :stepCount="stepCount"
      :star="star" 
      :type="event"
      @replayGame="replayGame"
      @nextLevel="nextLevel"/>

  <div class="game-pad">
      <div class="game-title">
        <img src="@/assets/images/map_title.png" alt="">
      </div>
      <div class="game-content">
        <div class="game-left">
            <div class="game-stage">
              <h1 class="stage-title">STAGE</h1>
              <h1 v-if="levelNo" class="stage-number">{{levelNo}}</h1>
              <img class="stage-jew" src="@/assets/images/jew.png" alt="">
            </div>
            <div class="game-sword">
              <img v-if="hasSword" class="sword-img" src="@/assets/images/sword.png" alt="">
              <img class="sword-box" src="@/assets/images/box_sword.png" alt="">
              <h1 class="sword-title">SWORD</h1>
            </div>
            <div class="game-hint">
              <img class="hint-img" src="@/assets/images/chest.png" alt="">
              <h1 class="hint-title">HINT</h1>
            </div>
        </div>
        <div class="game-center">
            <img class="game-wall" src="@/assets/images/map_wall.png" alt="">  
            <div ref="gameContainer" class="game-container">
                <canvas ref="canvas" class="game-canvas" width="200" height="200"></canvas>
            </div>
        </div>
        <div class="game-right">
          <div class="game-button">
            <img class="btn-sound" src="@/assets/images/mute_sound_btn.png" alt="">
            <img class="btn-exit" src="@/assets/images/exit_btn.png" alt="">
            <img class="btn-back" src="@/assets/images/back_btn.png" alt="">
          </div>
          <div class="game-counter">
            <h1 class="counter-title">TIME</h1>
            <h1 class="counter-number">{{timeCount}}</h1>
            <img class="counter-box" src="@/assets/images/box_empty.png">
          </div>
          <div class="game-counter">
            <h1 class="counter-title">STEP</h1>
            <h1 class="counter-number">{{stepCount}}</h1>
            <img class="counter-box" src="@/assets/images/box_empty.png">
          </div>
          <div v-if="!voiceMode" class="game-controller">
            <img src="@/assets/images/controller.png" alt="">
          </div>
          <div v-else class="voice-controller">
            <VoiceControl :directionInput="directionInput" :key="voiceKey"/>
          </div>

        </div>
      </div> 
     <img class="game-background" src="@/assets/images/board.png" alt="">
  </div>

</template>

<script>
// @ is an alias to /src
import ModalGame from '@/components/ModalGame.vue'
import VoiceControl from '@/components/VoiceControl.vue'
import {computed, onMounted, ref, watch} from 'vue'
import Overworld from '@/class/Overworld'
import DirectionInput from '@/class/DirectionInput'
import {store} from '@/store/index' 
import {useToast} from 'vue-toastification'
import {useRouter} from 'vue-router'
  
export default {
  name: 'Game',
    components: {
      ModalGame,VoiceControl
  },
  props:['id'],
  setup(props,context){
    const toast = useToast();
    const router = useRouter();
  


    //DOM
    const canvas = ref(null);
    const gameContainer = ref(null);
    

    //gameData
    const timeCount = ref(null);
    const timeLeft = ref(0)
    const stepCount = computed(()=> store.getters['event/getStep'])
    const map = ref(null);
    const minSteps = ref(null);
    const maxSteps = ref(null);
    const hasSword = ref(false);
    const overworldEvent = ref(null);
    const overworld = ref(null)
    const event = computed(()=>store.getters['event/getEvent']);
    const cause = computed(()=>store.getters['event/getCause']);
    const isPlaying = ref(true);
    const star = ref(null);
    const directionInput = ref(null);
    let countdown = null
    const levelNo = ref(null);
    const voiceKey = ref(0);

    const voiceMode = computed(()=>store.getters['event/getVoiceMode']);


    const resetData = ()=>{
      timeCount.value = null;
      timeLeft.value = 0
      minSteps.value = null;
      maxSteps.value = null;
      hasSword.value = false;
      star.value = null;
      countdown = null;
      store.dispatch('event/resetEvent');
      voiceKey.value += 1;
    }

    const startGame = (map)=>{
        minSteps.value = map.minSteps;
        maxSteps.value = map.maxSteps;
        timeCount.value = map.timeLimit;
        isPlaying.value = true;
        //start countDown
        countdown = setInterval(()=>{
          if(timeCount.value > 0)
          timeCount.value--;
          else {
            clearInterval(countdown);
            endGame("time");
          };
        },1000);
    }

    const endGame = (type)=> {
      isPlaying.value = false;
      overworld.value.endGame();
      clearInterval(countdown);
      if(type == 'die'){
        store.dispatch('gameData/setUserGameRecord',{
          type: 'lose',
          mapId: props.id
        })
      }else if(type == 'time'){
        store.dispatch('gameData/setUserGameRecord',{
          type: 'lose',
          mapId: props.id
        })
      }else if(type == 'win'){
          //quyết định số sao
          if(stepCount.value <= minSteps.value){
            star.value = 3;
          }else if(minSteps.value < stepCount.value && stepCount.value < maxSteps.value){
            star.value = 2
          }else{
            star.value = 1;
          }
          console.log(star.value);

          //ghi nhận kết quả record lên firebase thông qua store
          store.dispatch('gameData/setUserGameRecord',{
            type: 'win',
            stars: star.value,
            steps: stepCount.value,
            time:  map.value.timeLimit - timeCount.value,
            mapId: props.id
          })
      }
      timeLeft.value = map.value.timeLimit - timeCount.value;
    }

    // watch biến sự kiện để trigger thứ phù hợp
    watch(event, ()=>{
      if(event.value == 'pickSword'){
          hasSword.value = true;
      }else if(event.value == 'dropSword'){
          hasSword.value = false;
      }else if(event.value == 'win'){
        endGame('win');
      }else if(event.value == 'die'){
        endGame('die');
      }
    })
    
    //Ban đầu lúc vào game
    onMounted(()=>{
      console.log("MOUNTEDDDDDD");
      resetData();
      directionInput.value = new DirectionInput({
        voiceMode: voiceMode.value
      }); 
      directionInput.value.init();

      //load data game : level/map
      map.value = store.getters['gameData/getMap'](props.id);
      levelNo.value = map.value.no;
      //tạo module game từ data để chạy lần đầu
      overworld.value = new Overworld({
        mapID : props.id,
        element: gameContainer.value,
        canvas: canvas.value, 
        overworldEvent : overworldEvent.value,
        directionInput: directionInput.value,
        voiceMode: voiceMode.value
      })
      overworld.value.init();

      //Màn hình ready start kich hoạt ở đây

      startGame(map.value);
    })

    //Chơi lại game
    const replayGame = ()=>{
      resetData();
      overworld.value.replay();
      directionInput.value.init();
      startGame(map.value);
    }


    const nextLevel = ()=>{
      const nextId  = store.getters['gameData/getNextMapId'](props.id);
      console.log(nextId);
      router.push({name: 'Game', params: {id: nextId}});
    }

    return {canvas,gameContainer,timeCount,stepCount,hasSword,
            isPlaying,star,timeLeft,event,voiceMode,directionInput,
            replayGame,nextLevel,map,levelNo,voiceKey}
  }
}
</script>

<style lang="scss" scoped>

img{
   image-rendering: pixelated;
}

.game{
  &-pad{
    user-select: none;
    display: flex;
    position: absolute;
    @include center-1;
    z-index: -99;
  }
  &-content{
    position: absolute;
    @include center-1;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  &-left{
    margin-right: 2.5rem;
  }
  &-right{
    margin-left: 2.5rem
  }
  &-background{
    width: 60rem;
  }
  &-title{
    position: absolute;
    @include center-1;
    z-index: -99;
    top: -6%;
    transform: translate(-50%, -50%) scale(0.8);
    user-select: none;
  }

}
// game left
.game{
  &-left{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  &-stage{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    & .stage{
      &-title{
        font-size: 3.5rem;
        color: rgb(255, 208, 0);
      }
      &-number{
        font-size: 7rem;
        transform: scale(1.5);
         margin:0;
         color: white;
      }
      &-jew{
        width: 10rem;
      }
    }
  }
  &-sword{
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    & .sword{
      &-img{
        position: absolute; 
        top: 10%;
        transform: scale(1.4);
      }
      &-box{
        width: 80%;
      }
      &-title{
        color: rgb(255, 208, 0);

      }
    }
  }
  &-hint{
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    & .hint{
      &-img{
        width: 70%;
      }
      &-title{
        color: rgb(255, 208, 0);
      }
    }
  }
  
}



/////game center
.game{
  &-center{
    display:relative;
    transform: scale(1.2) translateY(-1rem);
    image-rendering: pixelated;
  }
  &-wall{
    position: relative;
    z-index: -2
  }
  &-container{
    position: absolute; 
    /* outline: 1px solid #fff; */
    @include center-1;
    transform: scale(3.2) translate(-1.2rem,-1rem);
    transform-origin: center center;
    z-index: -1
  }
  &-canvas{
    image-rendering: pixelated;
  }
}


//game - right

.game{
  &-right{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  &-button{
    display: flex;
    justify-content: space-between;
    &>*{
      width: 30%;
      
    }
    & .btn{
      &-sound{
        
      }
      &-exit{

      }
      &-back{

      }
    }
  }

&-counter{
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;  
  & .counter{
    &-title{
      color: rgb(255, 208, 0);
      font-size: 3rem;
    }
    &-number{
      position: absolute;
      bottom: 2%;
      color: white;
      font-size: 5rem;
    }
    &-box{
      width: 110%;
    }
  }
  }
  &-controller{
  
  }
}


.voice-controller{
  position: relative;
  height:50%;
}
</style>