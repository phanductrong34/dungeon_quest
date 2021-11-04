import Sprite from "./Sprite";

// input {x, y}
class GameObject {
    constructor(config){
        this.isMounted = false;
        this.x = config.x || 0;
        this.y = config.y || 0;
        this.direction = "down";
        this.sprite = new Sprite({
            gameObject : this,
            spriteName: config.spriteName || 'hero'
        });
    }
    mount(map){
        console.log("mounted");
        this.isMounted = true;
        map.addWall(this.x, this.y)
    }
    update(){
        
    }
}

export default GameObject;