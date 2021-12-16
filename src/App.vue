<template>
  <div class="app">
    <router-view/>
    <div class="background"></div>
  </div>
</template>

<script>
export default {
  setup(){


    return{}
  }
}
</script>

<style>
body {
  background: #333;
  padding: 0;
  margin: 0;
  overflow: hidden;
}

input:-webkit-autofill,
input:-webkit-autofill:hover, 
input:-webkit-autofill:focus, 
input:-webkit-autofill:active{
-webkit-box-shadow: 0 0 0 30px transparent inset !important;
}

.app{
  width: 100vw;
  height: 100vh;
  
}
.background{
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -100;
  background-image: url('./assets/images/background.png');
  background-size: cover;
  image-rendering: pixelated;
}

.noselect {
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Old versions of Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
}
</style>
