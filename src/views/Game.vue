<template>
  <div ref="gameContainer" class="game-container">
    <canvas ref="canvas" class="game-canvas" width="200" height="200"></canvas>
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
  setup(){
    //DOM
    const canvas = ref(null);
    const gameContainer = ref(null);

    onMounted(()=>{
      const overworld = new Overworld({
        element: gameContainer.value,
        canvas: canvas.value
      })
      overworld.init();
    })

    return {canvas,gameContainer}
  }
}
</script>

<style scoped>
.game-container {
  position: relative; 
  width: 200px;
  height: 200px;
  margin: 0 auto;
  outline: 1px solid #fff;

  transform: scale(3) translateY(50%);
}

.game-container canvas {
  image-rendering: pixelated;
}
</style>