<template>

    <div class="menu">
            <transition name="fade">
                <div class="loading" v-if="isLoading">
                    <img class="loading_gif" src="@/assets/loop/running_loop.gif" alt="">
                    <img class="loading_background" src="@/assets/images/board.png" alt="">
                </div>
            </transition>
            <img class="menu_background" src="@/assets/images/board.png" alt="">
            <div class="menu_content">
                    <div class="menu_title">
                        <h1 class="menu_title_header">DUNGEON QUEST</h1>
                        <img class="menu_title_img" src="@/assets/images/button-2.png" alt="">
                    </div>
                    <div class="menu_hero">
                        <img src="@/assets/images/hero_menu.png" alt="">
                    </div>
                    <div class="menu_container">
                        <h1 class="menu_chapter">CHAPTER {{chapter}}</h1>

                            <div class="menu_wrapper">
                                <div class="level_wrapper" v-for="(level,index) in pageMap" :key="level.id" @click="startGame(level.id)">
                                    <div class="level_content">
                                        <h2 class="level_number">{{index + 1}}</h2>
                                        <span class="level_rate" v-if="getStar(level.id) == 1">
                                            <img class="level_star" src="@/assets/images/star_small_on.png" alt="">
                                            <img class="level_star" src="@/assets/images/star_small_off.png" alt="">
                                            <img class="level_star" src="@/assets/images/star_small_off.png" alt="">
                                        </span>
                                        <span class="level_rate" v-if="getStar(level.id) == 2">
                                            <img class="level_star" src="@/assets/images/star_small_on.png" alt="">
                                            <img class="level_star" src="@/assets/images/star_small_on.png" alt="">
                                            <img class="level_star" src="@/assets/images/star_small_off.png" alt="">
                                        </span>
                                        <span class="level_rate" v-if="getStar(level.id) == 3">
                                            <img class="level_star" src="@/assets/images/star_small_on.png" alt="">
                                            <img class="level_star" src="@/assets/images/star_small_on.png" alt="">
                                            <img class="level_star" src="@/assets/images/star_small_on.png" alt="">
                                        </span>
                                    </div>
                                    <img class="level_img" src="@/assets/images/button-4.png" alt="">
                                </div>
                            </div>

                        <div class="menu_button_center">
                            <div class="menu_button left">
                                <img src="@/assets/images/button_left.png" alt="">
                            </div>
                            <div class="menu_button right">
                                <img src="@/assets/images/button_right.png" alt="">
                            </div>
                        </div>
                        <div class="menu_button_bottom">
                            <div class="menu_button_bottom_wrapper back">
                                <h2 class="menu_button_bottom_title" @click="backHome">Back</h2>
                                <img class="menu_button_bottom_image" src="@/assets/images/button-3.png" alt="">
                            </div>
                            <!-- <div class="menu_button_bottom_wrapper reset">
                                <h2 class="menu_button_bottom_title">Reset</h2>
                                <img class="menu_button_bottom_image" src="@/assets/images/button-3.png" alt="">
                            </div> -->

                        </div>
                    </div>
            </div>
    </div>
</template>

<script>
import {ref,computed, onMounted,watchEffect} from 'vue'
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'
export default {
    setup () {

        const store = useStore();
        const userGameData = computed(()=> store.getters['gameData/getUserGameData'] || {});
        const allMaps = computed(()=>store.getters['gameData/getAllMaps'] || {});
        const isLoading = ref(true);

        onMounted(async()=>{
            await store.dispatch('gameData/loadUserGameData');
            await store.dispatch('gameData/loadBaseGameData');
            console.log("userGameData",userGameData.value);
            console.log("AllMaps",allMaps.value);
        })


        watchEffect(()=>{
            if(Object.keys(allMaps.value).length > 0){
                isLoading.value = false;
            }
        })

        const chapter = ref("1")
        const maps = computed(()=>{
            return Object.values(allMaps.value);
        })
        const page = ref(1);
        const pageMap = computed(()=>{
            const max = maps.value.length;
            const start = Number(0 + 25* (page.value - 1));
            const end = Number(start + 25) > max ? max : Number(start + 25);
            console.log(start,end);
            return maps.value.slice(start,end);
        })


        //HÀM XÁC ĐỊNH SAO SÁNG HAY TẮT
        const getStar = (id) => {
            if(!userGameData.value[id]){
                return 0;
            }else {
                return userGameData.value[id].stars;
            }
        }


        //startGame
        const router = useRouter()
        const startGame = (id)=>{
            router.push({name: 'Game', params: {id: id} })
        }

        //back
        const backHome = ()=>{
            router.push({name: 'Home'})
        }


        return {chapter,maps,page,pageMap,getStar,startGame,isLoading,backHome}
    }
}
</script>

<style lang="scss" scoped>
.fade-leave-to{
    opacity: 0;
}
.fade-leave-active{
    transition: all 0.5s ease;
}

.loading{   
    position:absolute;
    width: 100%;
    height: 100%;
    z-index: 1000;
    &_gif{
        position: absolute;
        @include center-1;
        width: 30%;
    }
    &_background{
        width: 100%;
    }

}

img{
    image-rendering: pixelated;
    user-select: none;
}

.menu{
    margin:0 auto;
    margin-top:1rem;
    display: flex;
    @include center-1;


    &_background{
        z-index: 0;
        height:600px;
        width: auto;
    }
    &_content{
        @include center-1;
        display:flex;
        width: 100%;
        height: 100%;
    }
    &_title{
        @include center-1;
        display: flex;
        top: 0%;
        &_header{
            @include center-1;
            width: 100%;
            text-align: center;
            color: white;
        }
        &_img{
            z-index: -1;
            transform: scale(1.2)
        }
    }
    &_hero{
        width: 40%;
        display: flex;
        justify-content: center;
        align-items: center;
        & img{
            transform: scale(1.2)
        }
    }
    &_container{
        width: 60%;
        height: 90%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        z-index: 100;
        color: white;
        margin-top:1rem;
        position: relative;

        
    }
    &_chapter{
        margin-top: 2rem;
        margin-bottom: 2rem;
    }
    &_wrapper{
        display: flex;
        width: 65%;
        flex-wrap: wrap; 
        justify-content: flex-start;
        align-items: flex-start;
        align-content: flex-start;
        min-height: 315px;
        margin-bottom: 2rem;
        z-index: 100;
        
    }
    & .level{
        &_wrapper{
            flex-grow: 0;
            display: inline-block;
            position: relative;
            @include button-fx;
            margin-right: 0.4rem;
        }
        &_content{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            @include center-1;
            width: 100%;
            height: 100%;
            top: 40%;
        }
        &_img{

        }
        &_number{
            
        }
        &_rate{

        }
        &_star{

        }
    }
    &_button{
        &_center{
            @include center-1;
            width: 88%;
            display: flex;
            justify-content: space-between;
            z-index: 99;
        }
        &.left{
            @include button_fx_left;
        }
        &.right{
            @include button_fx_right;
        }


        &_bottom{
            display: flex; 
            color: black;

            &_wrapper{
                position: relative;
                @include button-fx;
                &.back{
                    margin-right: 1rem
                }
            }
            &_title{
                @include center-1;
                top: 45%;
                
            }
            &_image{

            }
        }
    }


}

</style>