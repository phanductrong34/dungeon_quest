

const spriteSrc = {

    redMon: {
        src: "../assets/png/monster/redmon.png",
        offset: [0,-8]
    },
    greenMon: {
        src: "../assets/png/monster/greenmon.png",
        offset: [0,-8]
    },
    whiteMon: {
        src: "../assets/png/monster/zombie_idle_anim_f0.png",
        offset: [8,7]
    },
    goal: {
        src: "../assets/png/goal/goal.png",
        offset: [-16,-20]
    }
}

import _ from 'lodash';

class SpriteAnimated {
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
      if(["redMon",'greenMon','whiteMon'].includes(config.spriteName)){
        this.animations = config.animations || {
          // down-right , left-up
          "idle": [ [1,0] , [2,0] , [3,0] ,[4,0], [0,0] ],
          "eat-right":[[2,0],[3,0]],
          "eat-down":[[2,0],[3,0]],
          "eat-left":[[2,1],[3,1]],
          "eat-up":[[2,1],[3,1]],
          "die-right": [[0,2],[1,2], [2,2], [3,2], [4,2] , [5,2]],
          "die-down": [[0,2],[1,2], [2,2], [3,2], [4,2] , [5,2]],
          "die-left": [[0,3],[1,3], [2,3], [3,3], [4,3] , [5,3]],
          "die-up": [[0,3],[1,3], [2,3], [3,3], [4,3] , [5,3]],
        }
      }else if(config.spriteName == "goal"){
        this.animations = config.animations || {
          "idle": [ [1,0] ,[0,0] ]
        }
      }


      // Initial state
      this.currentAnimation ="idle" 
      this.currentAnimationFrame = 0; 
      this.animationFrameLimit = config.animationFrameLimit || 6;
      this.animationFrameProgress = this.animationFrameLimit;

      //Reference the game object
      this.gameObject = config.gameObject;

      //setup crop size
      if(config.spriteName == 'goal'){
          this.cropSize = 64;
      }else this.cropSize = 32

  }

  // getters
  get frame(){
    return this.animations[this.currentAnimation][this.currentAnimationFrame]
  }

  setAnimation(key){
    if(this.currentAnimation !== key){
      this.currentAnimation = key;
      this.currentAnimationFrame = 0;
      this.animationFrameProgress = this.animationFrameLimit;
    }
  }


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
        frameX*this.cropSize,frameY*this.cropSize,
        this.cropSize,this.cropSize,
        x,y,
        this.cropSize,this.cropSize
      )
      this.updateAnimationProgress()
  }


}

export default SpriteAnimated