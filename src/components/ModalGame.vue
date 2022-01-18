<template>
<!-- <transition name="slide">
</transition> -->
    <div class="modal" v-if="!isPlaying && type == 'die'">
        <div class="modal-content">
            <h1 class="modal-title">Game Over!!</h1>
            <div class="button-wrapper">
                <h2 class="button-name">Replay</h2>
                <img class="button-img" src="@/assets/images/button-3.png" alt="">
            </div>
            <div class="button-wrapper">
                <h2 class="button-name">Menu</h2>
                <img class="button-img" src="@/assets/images/button-3.png" alt="">
            </div>
        </div>
        <img class="modal-img" src="@/assets/images/modal_lose.png">
    </div>

    <div class="modal" v-if="!isPlaying && timeCount == 0">
        <div class="modal-content">
            <h1 class="modal-title">Time Out!!</h1>
            <div class="button-wrapper">
                <h2 class="button-name">Replay</h2>
                <img class="button-img" src="@/assets/images/button-3.png" alt="">
            </div>
            <div class="button-wrapper">
                <h2 class="button-name">Menu</h2>
                <img class="button-img" src="@/assets/images/button-3.png" alt="">
            </div>
        </div>
        <img class="modal-img" src="@/assets/images/modal_lose.png">
    </div>

    <div class="modal" v-if="!isPlaying && type == 'win'">
        <div class="modal-content">
            <div class="win-header">
                <h1 class="win-header-1">Level 11</h1>
                <h1 class="win-header-2">Complete</h1>
            </div>
            <div class="win-data">
                <h2>time : {{timeLeft}}</h2>
                <h2>step : {{stepCount}}</h2>
            </div>
            <h3 class="win-comment">{{comment}}</h3>
            <div class="win-footer">
                <div class="btn-wrapper">
                    <h2 class="btn-name">Next</h2>
                    <img class="btn-img" src="@/assets/images/button-3.png" alt="">
                </div>
                <div class="btn-wrapper">
                    <h2 class="btn-name">Replay</h2>
                    <img class="btn-img" src="@/assets/images/button-3.png" alt="">
                </div>
                <div class="btn-wrapper">
                    <h2 class="btn-name">Menu</h2>
                    <img class="btn-img" src="@/assets/images/button-3.png" alt="">
                </div>
            
            </div>
        </div>
        <img class="modal-img" :src="modalImageSrc()" alt="">
    </div>

    <div class="modal-background" v-if="!isPlaying">

    </div>
</template>

<script>
import {ref,computed,onMounted} from 'vue'
export default {
    props: ['isPlaying','type','timeLeft','timeCount','stepCount', 'star'],
    setup (props) {
        const comment = computed(()=>{
            if(props.star == 3) return "You\'ve found the best solution!!"
            else return "Is there another shorter way ?!"
        })
        const modalImageSrc = ()=>{
            return `../assets/images/modal_win_${props.star}.png`
        }

        return {modalImageSrc,comment}
    }
}
</script>

<style lang="scss" scoped>

.slide-enter-from,
.slide-leave-to{
    transform: translateY(-100vh);
}
.slide-enter-active,
.slide-leave-active{
  transition: all 0.5s ease-in-out;
}

img{
   image-rendering: pixelated;
}
.modal{
    position: absolute;
    z-index: 101;
    @include center-1;
    top: 48%;
    left: 50.5%;
    &-content{
        position: absolute;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
    }
    &-background {
        position: fixed;
        z-index: 100;
        width: 100vw;
        height: 120vh;
        opacity: 0.7;
        background-color:black;
    }
}

.modal{
    &-title{
        color: #FCC129;
        font-size: 4rem;
        margin-bottom:3rem;
    }
    &-img{
       
    }
}
.button{
    &-wrapper{
        position: relative;
        margin-bottom: 0.5rem;
        @include button-fx;
    }
    &-name{
        position: absolute;
        @include center-1;
    }
    &-img{
        width: 10rem;
        image-rendering: pixelated;
        
    }
}

.win{
    &-header{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-bottom:2rem;
        margin-top:3rem;
        &-1{
            color: white;
        }
        &-2{    
            font-size:4rem;
            color: #FCC129;
        }
    }
    &-data{
        margin-bottom:3rem; 
         color: white;
         font-size:1.5rem;
         display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

    }
    &-comment{
        margin-bottom:1rem;
        color: #8F4029;
    }
    &-footer{
        display: flex;

        & .btn{
            &-wrapper{
                position: relative;
                @include button-fx;
            }
            &-name{
                position: absolute;
                @include center-1;
            }
            &-img{

            }
        }
    }
}


</style>