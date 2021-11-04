/*  input config 
{   src,
    spiteName
    gameObject,
    animation, 
    currentAnimation, 
    currentAnimationFrame
}

drawImage(
    img: Image đã đc load, 
    sx: tọa độ x bắt đầu crop, 
    sy: tọa độ y bắt đầu crop, 
    swidth: chiều dài crop, 
    sheight: chiều rộng crop, 
    x: tọa độ x trên canvas sẽ vẽ ra, 
    y: tọa độ y vẽ trên canvas,
    width,
    height
)
*/


const spriteSrc = {
    hero : {
        src: "../assets/png/character/knight.png",
        offset: [-1,-8]
    },
    box : {
        src: "../assets/png/obstacle/crate.png",
        offset: [8,1]
    },
    spike : {
        src: "../assets/png/obstacle/floor_spikes_anim_f3.png",
        offset: [8,8]
    },
    redMon: {
        src: "../assets/png/monster/chort_idle_anim_f0.png",
        offset: [8,-1]
    },
    greenMon: {
        src: "../assets/png/monster/swampy_idle_anim_f0.png",
        offset: [8,7]
    },
    whiteMon: {
        src: "../assets/png/monster/zombie_idle_anim_f0.png",
        offset: [8,7]
    },
    sword:{
        src: "../assets/png/sword/weapon_red_gem_sword.png",
        offset: [11,0]
    }
}

import _ from 'lodash';

class Sprite {
    constructor(config) {
    
        //Set up the image
        this.image = new Image();
        this.offsetX = spriteSrc[config.spriteName]['offset'][0]
        this.offsetY = spriteSrc[config.spriteName]['offset'][1]
        this.image.src = spriteSrc[config.spriteName].src;
        this.image.onload = () => {
            this.isLoaded = true;
          }
    
      //Configure Animation & Initial State
      this.animations = config.animations || {
        "idle-down": [ [1,0] , [2,0] , [3,0] , [0,0] ],
        "idle-right": [ [1,0] , [2,0] , [3,0] , [0,0] ],
        "idle-up": [ [1,1] , [2,1] , [3,1] , [0,1] ],
        "idle-left": [ [1,1] , [2,1] , [3,1] , [0,1] ],
        "walk-down": [[1,2], [2,2], [3,2], [0,2]],
        "walk-right": [[1,2], [2,2], [3,2], [0,2]],
        "walk-up": [[1,3], [2,3], [3,3], [0,3]],
        "walk-left": [[1,3], [2,3], [3,3], [0,3]],
        "hit": [[1,4],[2,4],[3,4], [0,4]]

      }
      // Initial state
      this.currentAnimation ="idle-down" 
      this.currentAnimationFrame = 0; 
      this.animationFrameLimit = config.animationFrameLimit || 5;
      this.animationFrameProgress = this.animationFrameLimit;

      //Reference the game object
      this.gameObject = config.gameObject;

  }

  // getters
  get frame(){
    return this.animations[this.currentAnimation][this.currentAnimationFrame]
  }

  //method

  // khi input đổi hướng, thì nó sẽ set currentAnimation và setup biến tích lũy cùng frame đầu của animation, tuy nhiên lúc này chi chạy, chỉ set initial thôi. Hàm draw mới là chạy
  setAnimation(key){
    if(this.currentAnimation !== key){
      this.currentAnimation = key;
      this.currentAnimationFrame = 0;
      this.animationFrameProgress = this.animationFrameLimit;
    }
  }

  // hàm delay frame so với game đẻ game chạy 10 frame (theo limit) thì mới đổi sprite
  // còn luôn chạy cùng với game
  updateAnimationProgress(){

    if(this.animationFrameProgress > 0){
      this.animationFrameProgress -= 1;
      return;
    }

    this.animationFrameProgress = this.animationFrameLimit;
    this.currentAnimationFrame += 1 ;

    if(this.frame === undefined) {
      this.currentAnimationFrame = 0;
    }
  }


  // Vẽ lên canvas mỗi frame, với x, y có thể đã đc thay đổi ở Person, đồng thời chạy updateAnimationProgress để sau mỗi khoảng limit thì nó tăng tiến một khung khác để vẽ ra sprite mới, nếu quá lượng sprite thì reset 
  draw(ctx) {
      const x = this.gameObject.x + this.offsetX;
      const y = this.gameObject.y + this.offsetY;

      const [frameX, frameY]  = this.frame; // getter
      this.isLoaded && ctx.drawImage(this.image,
        frameX*32,frameY*32,
        32,32,
        x,y,
        32,32
      )
      this.updateAnimationProgress()
  }


}

export default Sprite