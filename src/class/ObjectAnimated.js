
import GameObject from "./GameObject";
import SpriteAnimated from "./SpriteAnimated";
import utils from "./utils";

class ObjectAnimated extends GameObject {
    constructor(config){
        super(config);
        this.sprite = new SpriteAnimated({
            gameObject : this,
            spriteName: config.spriteName 
        });

        this.movingProgressRemaining = 0;
        this.isDead = false;
        this.isEating = false;
    }

    // update đc gọi ở vòng loop trong OverWorld, truyền vào input có trường arrow
    update(state){
        this.updateSprite(state)
    }

    //luôn chạy tại mọi frame, nhưng chỉ thay đổi khi arrow mới
    updateSprite(state){
        if(this.isDead){
            this.sprite.setAnimation(`die-${this.direction}`);
            return;
        }
        if(this.isEating){
            this.sprite.setAnimation(`eat-${this.direction}`)
            return;
        }
        this.sprite.setAnimation("idle");
    }
}
export default ObjectAnimated