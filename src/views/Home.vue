<template>
  <div ref="gameContainer" class="game-container">
    <canvas ref="canvas" class="game-canvas" width="352" height="198"></canvas>
  </div>
</template>

<script>
// @ is an alias to /src
import {onMounted, ref} from 'vue'
import Overworld from '@/class/Overworld'
export default {
  name: 'Home',
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
  width: 352px;
  height: 198px;
  margin: 0 auto;
  outline: 1px solid #fff;

  transform: scale(3) translateY(50%);
}

.game-container canvas {
  image-rendering: pixelated;
}
</style>