<template>
    <div class="admin">
                <img class="background_admin" src="@/assets/images/board.png" alt="">
        <div class="container">
            <div class="container_game">
                <div class="grid">

                    <div class="row" v-for="y in 9" :key="'row'+ y">
                        <div class="col" v-for="x in 8" :key="'col'+x">
                            <div :id="(x) +','+ (y-1)" :class="[activeTile,'tile']" @click="fillTile">
                                <img :class="[checkMap( (x) +','+ (y-1) ),'tile_sprite']" :src="showTile( (x) +','+ (y-1) )" alt=""> 
                            </div>
                        </div>
                    </div>
                </div>
                <img class="testmap" src="@/assets/images/testmap.png" alt="">
            </div>
            <div class="container_tool">
                <div class="tool_build" v-if="mode == 'build'">
                    <h1 class="title">Must Have</h1>
                    <div class="tile_wrapper">

                        <div class="tile_choose hero" @click="changeActive('hero')">
                            <p class="tile_short">a</p>
                            <img class="tile_type hero" src="@/assets/png/character/knight_f_idle_anim_f0.png" alt="">
                            <img class="tile_floor" src="@/assets/images/floor-1.png" alt="">
                        </div>
                        <div class="tile_choose goal" @click="changeActive('goal')">
                            <p class="tile_short">s</p>
                            <img class="tile_type goal" src="@/assets/png/goal/chest.png" alt="">
                            <img class="tile_floor" src="@/assets/images/floor-1.png" alt="">
                        </div>
                        <div class="tile_choose clear" @click="changeActive('clear')">
                            <p class="tile_short">d</p>
                            <img class="tile_type clear" src="@/assets/images/x.png" alt="">
                            <img class="tile_floor" src="@/assets/images/floor-1.png" alt="">
                        </div>
                    </div>

                    <h1 class="title">Obstacle</h1>
                    <div class="tile_wrapper">
                        <div class="tile_choose redMon" @click="changeActive('redMon')">
                            <p class="tile_short">1</p>
                            <img class="tile_type redMon" src="@/assets/png/monster/chort_idle_anim_f0.png" alt="">
                            <img class="tile_floor" src="@/assets/images/floor-1.png" alt="">
                        </div>
                        <div class="tile_choose greenMon" @click="changeActive('greenMon')">
                            <p class="tile_short">2</p>
                            <img class="tile_type greenMon" src="@/assets/png/monster/swampy_idle_anim_f0.png" alt="">
                            <img class="tile_floor" src="@/assets/images/floor-1.png" alt="">
                        </div>
                        <div class="tile_choose whiteMon" @click="changeActive('whiteMon')">
                            <p class="tile_short">3</p>
                            <img class="tile_type whiteMon" src="@/assets/png/monster/zombie_idle_anim_f0.png" alt="">
                            <img class="tile_floor" src="@/assets/images/floor-1.png" alt="">
                        </div>
                        <div class="tile_choose box" @click="changeActive('box')">
                            <p class="tile_short">4</p>
                            <img class="tile_type box" src="@/assets/png/obstacle/crate.png" alt="">
                            <img class="tile_floor" src="@/assets/images/floor-1.png" alt="">
                        </div>
                        <div class="tile_choose sword" @click="changeActive('sword')"> 
                            <p class="tile_short">5</p>
                            <img class="tile_type sword" src="@/assets/png/sword/weapon_red_gem_sword.png" alt="">
                            <img class="tile_floor" src="@/assets/images/floor-1.png" alt="">
                        </div>
                        <div class="tile_choose spike" @click="changeActive('spike')">
                            <p class="tile_short">6</p>
                            <img class="tile_type spike" src="@/assets/png/obstacle/floor_spikes_anim_f3.png" alt="">
                            <img class="tile_floor" src="@/assets/images/floor-1.png" alt="">
                        </div>
                    </div>

                    <div class="input_container">
                        <div class="input_wrapper">
                            <h2 class="input_title">time</h2>
                            <input class="input_bar" type="text" v-model="time">
                        </div>
                        <div class="input_wrapper">
                            <h2 class="input_title">min</h2>
                            <input class="input_bar" type="text" v-model="minSteps">
                        </div>
                        <div class="input_wrapper">
                            <h2 class="input_title">max</h2>
                            <input class="input_bar" type="text" v-model="maxSteps">
                        </div>
                    </div>

                    <div class="button_container">
                        <a class="button_wrapper" @click="resetMap">
                            <h2 class="button_title">reset</h2>
                            <img class="button_img" src="@/assets/images/button-3.png" alt="">
                        </a>
                        <a class="button_wrapper" @click="toggleTestMode">
                            <h2 class="button_title">test</h2>
                            <img class="button_img" src="@/assets/images/button-3.png" alt="">
                        </a>
                        <a class="button_wrapper">
                            <h2 class="button_title" @click="playDemo">play</h2>
                            <img class="button_img" src="@/assets/images/button-3.png" alt="">
                        </a>
                    </div>
                    <a class="button_submit" @click="submitMap">
                        <h2 class="button_title">submit map</h2>
                        <img class="button_img" src="@/assets/images/button-2.png" alt="">
                    </a>
                </div>
                <div class="tool_test" v-if="mode == 'test'">
                    <div class="test_container">
                        <div class="test_wrapper">
                            <h1 class="title">Time</h1>
                            <h1 class="number">{{timeCountdown}}</h1>
                        </div>

                    </div>
                    <div class="test_container">
                        <div class="test_wrapper">
                            <h1 class="title">Your Steps</h1>
                            <h1 class="number">{{currentSteps}}</h1>
                        </div>

                    </div>
                    <div class="button_container">
                        <a class="button_wrapper" @click="setMax">
                            <h2 class="button_title">max</h2>
                            <img class="button_img" src="@/assets/images/button-3.png" alt="">
                        </a>
                        <a class="button_wrapper" @click="setMin">
                            <h2 class="button_title">min</h2>
                            <img class="button_img" src="@/assets/images/button-3.png" alt="">
                        </a>
                    </div>
                    <div class="test_container">
                        <div class="test_wrapper">
                            <h1 class="title">Max</h1>
                            <h1 class="number">{{maxSteps}}</h1>
                        </div>
                        <div class="test_wrapper">
                            <h1 class="title">Min</h1>
                            <h1 class="number">{{minSteps}}</h1>
                        </div>
                    </div>

                    <div class="button_container">
                        <a class="button_wrapper" @click="resetTest">
                            <h2 class="button_title">reset</h2>
                            <img class="button_img" src="@/assets/images/button-3.png" alt="">
                        </a>
                        <a class="button_wrapper" @click="toggleTestMode">
                            <h2 class="button_title">build</h2>
                            <img class="button_img" src="@/assets/images/button-3.png" alt="">
                        </a>
                    </div>

                </div>
            </div>
        </div>

    </div>
</template>

<script>
import {computed, onMounted, ref,watchEffect} from 'vue'
import useCollection from '@/composables/useCollection'
import {serverTimestamp} from '@/firebase/config'
import {useToast} from 'vue-toastification'
export default {
    setup () {
        const mode = ref('build')
        const activeTile = ref('hero');
        const maps = ref({});
        const time = ref(15);
        const minSteps = ref(0);
        const maxSteps = ref(0);

        const {error, addDocument,setDocument} = useCollection('maps');
        const toast = useToast();

    //TILE MAP FUNCTION
        const checkMap = computed( () => (id)=>{
            return maps.value[id]
        })
        const showTile = computed(()=> (id)=>{      
            switch (maps.value[id]) {
                case 'hero':
                    return './assets/png/character/knight_f_idle_anim_f0.png'
                    break; 
                case 'hero':
                    return './assets/png/character/knight_f_idle_anim_f0.png'
                    break; 
                case 'goal':
                    return './assets/png/goal/chest.png'
                    break; 
                case 'redMon':
                    return './assets/png/monster/chort_idle_anim_f0.png'
                    break; 
                case 'greenMon':
                    return './assets/png/monster/swampy_idle_anim_f0.png'
                    break; 
                case 'whiteMon':
                    return './assets/png/monster/zombie_idle_anim_f0.png'
                    break;
                case 'box':
                    return './assets/png/obstacle/crate.png'
                    break; 
                case 'sword':
                    return './assets/png/sword/weapon_red_gem_sword.png'
                    break; 
                case 'goal':
                    return './assets/png/goal/chest.png'
                    break; 
                case 'spike':
                    return './assets/png/obstacle/floor_spikes_anim_f3.png'
                    break; 
                default:
                    return null;
                    break;
            }
        })

        const fillTile = (event) => {
            if(mode.value == 'test') return;
            const id = event.target.id;
            const type = event.target.classList.value.replace(' tile','');
            if(type == 'clear'){
                maps.value[id] = null
                return;
            }
            maps.value[id] = type;
        }

        const changeActive = (tile) =>{
            const els = document.querySelectorAll(`.tile_choose`)
            els.forEach(el => {
                if(el.classList.contains('active')) el.classList.remove('active')
            })
            document.querySelector(`.tile_choose.${tile}`).classList.add('active')
            activeTile.value = tile;
        }

        const shortcutActive = (key)=>{
            switch (key) {
                case 'a':
                    changeActive('hero')
                    break;
                case 's':
                    changeActive('goal')
                    break;
                case 'd':
                    changeActive('clear')
                    break;
                case '1':
                    changeActive('redMon')
                    break;
                case '2':
                    changeActive('greenMon')
                    break;
                case '3':
                    changeActive('whiteMon')
                    break;
                case '4':
                    changeActive('box')
                    break;
                case '5':
                    changeActive('sword')
                    break;
                case '6':
                    changeActive('spike')
                    break;
                default:
                    changeActive('hero')
                    break;
            }
        }

    // BUILD FUNCTION
            const resetMap = ()=>{
                //sinh ra biến maps
                for(let y = 0; y <= 8 ; y++){
                    for ( let x = 1; x <=8; x ++){
                        maps.value[`${x},${y}`] = null;
                    }
                }
            }
            const checkConstraintMap = ()=>{
                let heroCount = 0;
                let goalCount = 0;
                Object.keys(maps.value).forEach((key)=>{
                    if(maps.value[key] == 'hero') heroCount++;
                    if(maps.value[key] == 'goal') goalCount++
                })
                
                if(heroCount !== 1){
                    toast.error("There must be only one hero in map");
                    return false;
                }
                if(goalCount !== 1){
                    toast.error("There must be only one goal in map");
                    return false;
                };
                //nnếu tồn tại goal có y khác không thì loại
                if(Object.keys(maps.value).indexOf(key => maps.value[key] == 'goal' && key[2] !== 0) > 0){
                    toast.error("Goal must in row 0");
                    return false;
                }
                //nnếu tồn tại object có y khác 0 mà lại ko phải 0
                if(Object.keys(maps.value).indexOf(key =>  key[2] == 0 && maps.value[key] !== 'goal') > 0){
                    toast.error("Only goal can be in row 0");
                    return false;
                }
                if(time.value <= 0) {
                    toast.error("Time must be greater than 0");
                    return false;
                }
                if(minSteps.value <= 0) {
                    toast.error("Min steps must be greater than 0");
                    return false;
                }
                if(minSteps.value <= 0) {
                    toast.error("Max steps must be greater than 0");
                    return false;
                }
                return true;
            }

            const generateMap = ()=>{
                let formatMap = [];
                Object.keys(maps.value).forEach((key)=>{          
                    if(maps.value[key]){
                        formatMap.push({
                            name: maps.value[key],
                            x: key.slice(0,2),
                            y: key.slice(2)
                        })
                    }
                })

                if(!checkConstraintMap()){
                    return null;
                }
                return formatMap;

            }

            const submitMap = async()=>{
                if(!checkConstraintMap()){ return};
                const newMap = {
                    createdAt: serverTimestamp(),
                    timeLimit: time.value, 
                    minSteps: minSteps.value, 
                    maxSteps: maxSteps.value,
                    gameObjects:generateMap()
                }
                await addDocument(newMap);
                if( !error.value ){
                    console.log("Add new Map successful",newMap );
                    toast.success("Add new Map successful");
                }
            }

        const arrrowDic = ['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'];
        const changeDic = {
            'ArrowUp': ['y','-1'],
            'ArrowDown': ['y', '+1'],
            'ArrowRight': ['x','+1'],
            'ArrowLeft': ['x', '-1']
        }

    // TEST FUNCTION

        const timeCountdown = ref(0);
        const currentSteps = ref(0);
        const tempMap = ref(null);
        let activeHeroPos;

        const toggleTestMode = () =>{
            if(mode.value == 'build'){
                if(!checkConstraintMap()) return;
                mode.value = 'test'
                tempMap.value = Object.assign({},maps.value);
                console.log(Object.keys(maps.value).find(key => maps.value[key] == 'hero'));
                activeHeroPos = Object.keys(maps.value).find(key => maps.value[key] == 'hero');
                timeCountdown.value = time.value;
                currentSteps.value = 0;
                countDown();

            }else if(mode.value == 'test'){
                // Chuyển mode, backupmap, lấy vị trí hero, bật đếm giờ, reset bước
                maps.value = Object.assign({},tempMap.value);
                mode.value ='build';
            }
        }

        const countDown = ()=>{
            const timer = setInterval(()=>{
                if(timeCountdown.value > 0){
                    timeCountdown.value--;
                }else {
                    clearInterval(timer);
                }
            },1000);
        }

        const moveHero = (key)=>{
            
            let curPos = {
                x: activeHeroPos[0],
                y: activeHeroPos[2]
            }
            curPos[changeDic[key][0]] = eval(curPos[changeDic[key][0]] + changeDic[key][1]);
            console.log(curPos[changeDic[key][0]]);
            maps.value[activeHeroPos] = null;
            activeHeroPos = `${curPos.x},${curPos.y}`
            maps.value[activeHeroPos] = 'hero';

            currentSteps.value++;
        }

        const playDemo = ()=>{
            toast.info("Features in developed :))");
        }
        const resetTest = ()=>{
            maps.value = Object.assign({}, tempMap.value);
            activeHeroPos = Object.keys(maps.value).find(key => maps.value[key] == 'hero');
            timeCountdown.value = time.value;
            currentSteps.value = 0;
            countDown();
        }

        const setMax = ()=>{
            maxSteps.value = currentSteps.value
        }

        const setMin = ()=> {
            minSteps.value = currentSteps.value
        }

    // INIT
        onMounted(()=>{
            changeActive('hero')
            document.addEventListener('keydown', (e) => {
                if(mode.value == 'build' || arrrowDic.indexOf(e.key) < 0 ){
                    shortcutActive(e.key)
                }else{
                    moveHero(e.key);
                }
            })

            resetMap();
        })
        return {mode,activeTile,time,minSteps,maxSteps,timeCountdown,currentSteps,setMax,setMin,
            showTile,fillTile,changeActive,checkMap,resetMap,toggleTestMode,playDemo,submitMap,resetTest}
    }
}
</script>

<style lang="scss" scoped>
img{
    image-rendering: pixelated;
    user-select: none;
}

.admin{
    margin:0 auto;
    margin-top:1rem;
    display: flex;
    @include center-1;
}
.background_admin{
    z-index: 0;
    height:600px;
    width: auto;
}
.container{
    @include center-1;
    width: 100%;
    height: 100%;
    display: flex;
    &_game{
        width: 436px;
        height:490.5px;
        position: relative;
        margin:auto 0;
        margin-left: 3rem;
        box-shadow: 10px 10px 10px 0px rgba(0,0,0,0.5);
    }
    &_tool{
        width: 33%;
        padding: 2rem;
        display:flex;
        flex-direction: column;
        align-items: center;
    }
}

//container game
.testmap{
    width: 100%;
    height:100%;
    transform:translate(0,3px)
}
.grid{
    display:flex;
    flex-direction:column;
    width: 436px;
    height:490.5px;
    @include center-1;
    z-index: 1;
}
.row{
    display: flex;
    align-self: stretch;
    flex: 1 1 0px;
}
.col{
    display: flex;
    flex: 1 1 0px;
    position: relative;
}
.tile_sprite{
    @include center-1;
    width: 100%;
    &.hero{
        width: 100%;
        top: 0%
    
    }
    &.goal{
        width: 100%;
        top: 40%
    }
    &.redMon{
        width: 100%;
        top: 10%
    }
    &.greenMon{
        width: 100%;
        top: 40%
    }
    &.whiteMon{
        width: 100%;
        top: 40%
    }
    &.box{
        width: 96%;
        top: 40%
    }
    &.sword{
        width: 60%;
        top: 20%
    }
    &.spike{
    }
}
.tile{
    width: 100%;
    height: 100%;
    position:relative;
    &::before {
        position: absolute;
        content:"";
        width: 100%;
        height: 100%;
        opacity: 0;
        z-index: 100;
   
    }
    &.hero::before{
        background-color: rgba(41, 203, 243, 0.5);
    }
    &.goal::before{
        background-color: rgba(223, 243, 41, 0.5);
    }
    &.redMon::before{
        background-color: rgba(243, 41, 41, 0.5);
    }
    &.greenMon::before{
        background-color: rgba(41, 243, 102, 0.5);
    }
    &.whiteMon::before{
        background-color: rgba(230, 230, 230, 0.5);
    }
    &.box::before{
        background-color: rgba(243, 122, 41, 0.5);
    }
    &.sword::before{
        background-color: rgba(41, 88, 243, 0.5);
    }
    &.spike::before{
        background-color: rgba(181, 106, 211, 0.5)
    }
    &.clear::before{
        background-color: rgba(0, 0, 0, 0.37);
    }
    &:hover::before{
        opacity: 1;
    }
}


// container tool
.tool{
    &_build{
        width: 100%;
        & > *{
            margin-bottom: 0.5rem;
        }
    }
    &_test{

    }
}
.title{
    color: white;
}
.tile{
    &_wrapper{
        display:flex;
        flex-wrap: wrap;
        
    }
    &_short{
        position: absolute;
        color: white;
        bottom: 0;left: 0;
        font-size: 2rem;
        z-index: 2;
    }
    &_choose{
        position: relative;
        display: inline-block;
        margin-right: 1rem;
        cursor: pointer;
        &.active{
            transform: scale(1.2);  
            &::before{
                position: absolute;
                content:"";
                width: 100%;
                height: 100%;
                top: 50%;
                left: 50%;
                transform: translate(-50%,-50%);
                border: 4px solid red;
                
            }
        }
    }
    &_type{
        @include center-1;
        width: 100%;
        &.hero{
            top: -10%;
        }
        &.goal{
            top: 30%;
        }
        &.redMon{
            top: 0%;
        }
        &.greenMon{
            top: 30%;
        }
        &.whiteMon{
            top: 30%;
        }
        &.box{
            width: 80%;
            top: 30%;
        }
        &.sword{
            width: 55%;
            top: 30%;
        }
        &.spike{
        }
    }
    &_floor{
        width: 3.5rem;
    }
}

.input{
    &_container{
        display:flex;
        width: 100%;
    }
    &_wrapper{
        margin-right: 1rem;
    }
    &_title{
        color: white;
    }
    &_bar{
        width: 90%;
        height:2rem;
        background-color: #83979E;
        font-size:3rem;
        padding-left: 0.5rem;
        border:none;
    }
}

.button{
    &_container{
        display:flex;
        justify-content: space-around;

    }
    &_submit{
        position: relative;
        display: inline-block;
        width: 100%;
        @include button-fx;
    }
    &_wrapper{
        position: relative;
        display: inline-block;
        @include button-fx;
    }
    &_title{
        @include center-1;
        top: 45%;
    }
    &_img{
        width: 100%;
    }


}


// test_container
.test{
    &_container{
        display: flex;
        margin-top:0.5rem
    }
    &_wrapper{
        margin-right: 1rem;
         & .number{
             font-size:5rem
         }
    }
}

</style>