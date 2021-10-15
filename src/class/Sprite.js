/*  input config 
{   src,
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

//
class Sprite{
    constructor(config){
        // tức là tạo ra một object ảnh và khi nó load xong thì tạo property isLoaded
        this.image = new Image();
          this.image.src = config.src
        this.image.onload = ()=>{
            this.isLoaded = true;
        }

        //Shadow
        this.shadow = new Image();
        this.useShadow = true; // config.useShadow || false
        if(this.useShadow){
            this.shadow.src = "../assets/images/characters/shadow.png";
        }
        this.shadow.onload = () => {
            this.isShadowLoaded = true;
        }

        //Configure Animation and initial state
        this.animation = config.animation || {
            idleDown: [
                [0,0]
            ]
        };
        this.currentAnimation = config.currentAnimation || "idleDown";
        this.currentAnimationFrame = 0;

        // Refence the game object
        this.gameObject = config.gameObject
    }

    //METHOD
    draw(ctx) {
        // chỉ vẽ đc png lên canvas nếu nó đã được load lên web, nên mới cần các biến isLoaded
        const x = this.gameObject.x * 16 - 8;
        const y = this.gameObject.y * 16 - 18;

        //vẽ shadow
        this.isShadowLoaded && ctx.drawImage(this.shadow,x,y);
        
        //vẽ object ấy
        this.isLoaded && ctx.drawImage(this.image,
        0,0,
        32,32,
        x,y,
        32,32
        )

        
    }
}

export default Sprite