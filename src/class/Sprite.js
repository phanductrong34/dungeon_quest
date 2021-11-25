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
    goal:{
        src: "../assets/png/goal/treasure.png",
        offset: [-8,-8] 
    },
    sword:{
        src: "../assets/png/sword/weapon_red_gem_sword.png",
        offset: [8,8] 
    },
    deadFloor: {
        src: "../assets/png/obstacle/dead_floor.png",
        offset: [8,8]
      },
    hero : {
        src: "../assets/png/character/knight.png",
        offset: [8,-5]
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
        //Reference the game object
        this.gameObject = config.gameObject;

        //setup crop size
        if(config.spriteName == 'goal'){
            this.cropSize = 64;
        }else this.cropSize = 32

  }


  draw(ctx) {
      const x = this.gameObject.x + this.offsetX;
      const y = this.gameObject.y + this.offsetY;

      this.isLoaded && ctx.drawImage(this.image,
        0,0,
        this.cropSize,this.cropSize,
        x,y,
        this.cropSize,this.cropSize
      )
  }


}

export default Sprite