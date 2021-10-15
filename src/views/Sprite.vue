<template>
    <div>
        <canvas id="canvas1"></canvas>
        <div class="controls">
            <label for="animations"></label>
            <select name="animations" id="animations" v-model="playerState">
                <option value="idle" selected>Idle</option>
                <option value="jump">Jump</option>
                <option value="fall">Fall</option>
                <option value="run">Run</option>
                <option value="dizzy">Dizzy</option>
                <option value="sit">Sit</option>
                <option value="roll">Roll</option>
                <option value="ko">Ko</option>
                <option value="getHit">Get Hit</option>
            </select>
        </div>
    </div>
</template>

<script>
    import {onMounted,ref} from 'vue'
    export default {
        setup(){
    //VARIABLES

            const CANVAS_WIDTH = 600;  
            const CANVAS_HEIGHT = 600;  

            const playerImage = new Image();
            playerImage.src = './assets/images/shadow_dog.png';
            const spriteWidth = 575; // bề rộng của ảnh / cột
            const spriteHeight = 523;
            const playerState = ref("idle");

            let gameFrame = 0;  // frame thứ bao nhiêu của game đã chạy
            const staggerFrame = 5;  // quãng cách frame giữa hai lần dịch sprite


            const spriteAnimation = [];
            const animationStates = [
                {
                    name: 'idle', 
                    frames: 7,
                },
                {
                    name: 'jump',
                    frames: 7,
                },
                {
                    name: 'fall',
                    frames: 7,
                },
                {
                    name: 'run',
                    frames: 9,
                },
                {
                    name: 'dizzy',
                    frames: 11,
                },
                {
                    name: 'sit',
                    frames: 5,
                },
                {
                    name: 'roll',
                    frames: 7,
                },
                {
                    name: 'bite',
                    frames: 7,
                },
                {
                    name: 'ko',
                    frames: 12,
                },
                {
                    name: 'getHit',
                    frames: 4,
                }
            ];
    // METHOD

            // chạy hàm generate ra data cho spriteAnimation theo đúng cấu trúc, data ấy có array loc chứa tọa độ x,y các vị trí crop ảnh sprite tổng  theo từng frame
            animationStates.forEach((state,index)=>{
                let frames = {
                    loc:[], // loc = [{0, 0}, {0, 575}, {0,1150},... {x,y}];
                }
                for (let j = 0; j < state.frames; j ++){
                    let positionX = j * spriteWidth;
                    let positionY = index * spriteHeight;
                    frames.loc.push({x: positionX, y: positionY});
                }
                spriteAnimation[state.name] = frames;
            })


            const animate = ()=>{
                const canvas = document.getElementById("canvas1");
                canvas.width = CANVAS_WIDTH;
                canvas.height = CANVAS_HEIGHT;
                let ctx = canvas.getContext("2d");
                ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);


                // position sẽ chạy từ 0 tới số frames của (do %) và lặp lại với tốc dộ chậm hơn staggerFrame lần so với gameFram. VD: gameFrame chạy tới 5 thì postion mới đc 1, gameFrame = 10 thì  position mới đc 2
                let position = Math.floor(gameFrame / staggerFrame) % (spriteAnimation[playerState.value].loc.length);

                // xác định khung thứ mấy theo chiều dọc và ngang 
                let frameX = spriteAnimation[playerState.value].loc[position].x;
                let frameY = spriteAnimation[playerState.value].loc[position].y;
                
                //drawImage(image,    sx,sy,sw,sh,         dx,dy,dw,dh);
                //      object Image  (crop ảnh đoạn nào)  (vẽ ở đâu trên canvas)
                //      tăng sx thì chạy animation, tăng sy thì đổi pose

                ctx.drawImage(playerImage,
                                frameX,frameY,spriteWidth,spriteHeight,
                                0,0,spriteWidth,spriteHeight);

                gameFrame++;

                // chạy sau mỗi frame, truyền vào hàm animate để tạo thành đệ quy, loop vẽ ra lên tục hình
                requestAnimationFrame(animate); 
            }


    //HOOK
            onMounted(()=>{
                animate();
            })
            return {playerState};
        }
    }
</script>

<style scoped>
#canvas1{
    border: 1px solid black;
    top: 50%;
    position: absolute;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 600px;
    height: 600px;
}
.controls{
    position: absolute;
    top: 2%;
    left: 50%;
    transform: translate(-50%,-50%);
}
.controls,select,option{
    font-size:2rem
}
</style>