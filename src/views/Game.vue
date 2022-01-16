<template>
  <div class="game-title">
    <img src="@/assets/images/map_title.png" alt="">
  </div>
  <div class="game-pad">
      <div class="game-content">
        <div class="game-left">
            <div class="game-stage">
              <h1 class="stage-title">STAGE</h1>
              <h1 class="stage-number">11</h1>
              <img class="stage-jew" src="@/assets/images/jew.png" alt="">
            </div>
            <div class="game-sword">
              <img class="sword-img" src="@/assets/images/sword.png" alt="">
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
            <h1 class="counter-number">16</h1>
            <img class="counter-box" src="@/assets/images/box_empty.png">
          </div>
          <div class="game-counter">
            <h1 class="counter-title">STEP</h1>
            <h1 class="counter-number">16</h1>
            <img class="counter-box" src="@/assets/images/box_empty.png">
          </div>
          <div class="game-controller">
            <img src="@/assets/images/controller.png" alt="">
          </div>

        </div>
      </div> 
     <img class="game-background" src="@/assets/images/board.png" alt="">
  </div>

</template>

<script>
// @ is an alias to /src
import {onMounted, ref} from 'vue'
import Overworld from '@/class/Overworld'
export default {
  name: 'Game',
    components: {
   
  },
  props:['id'],
  setup(props,context){
    //DOM
    const canvas = ref(null);
    const gameContainer = ref(null);

    onMounted(()=>{
      const overworld = new Overworld({
        mapID : props.id,
        element: gameContainer.value,
        canvas: canvas.value
      })
      overworld.init();
    })

    return {canvas,gameContainer}
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
    top: 28rem;
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
    top: 4rem;
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
</style>