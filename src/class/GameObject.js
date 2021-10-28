import Sprite from "./Sprite";

// input {x, y}
class GameObject {
    constructor(config){
        this.x = config.x || 0;
        this.y = config.y || 0;
        this.sprite = new Sprite({
            gameObject : this,
            spriteName: config.spriteName || 'hero'
        });
    }
    update(){
        
    }
}

export default GameObject;