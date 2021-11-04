/*field:
- x
- y
- direction : 'down'
- sprite
- movingProgressRemaining:  biến tích lũy để giảm, giúp delay so sau bn frame
- isPlayerControlled:       quyết định Person có đc update để di chuyển hay ko
- directionUpdate:          từ điển tra hướng ra cách để thay đổi tọa độ x,y

method:
- updatePosition(): 
        gọi bởi update
        Nếu movingProgressRemaining vẫn dương thì thay đổi x, y tùy direction
        miễn là có input thì x, y auto thay đổi 16px

- updateSprite(state):
        - gọi bởi update
        - tùy có input direction hay không và xong tiến trình di chuyển cũ chưa để set animation là idle hay walk + hướng

- update(state)
        - chạy lại sau mỗi frame: đc gọi ở overworld
        - updatePosition và updateSprite
        - sau mỗi 16frame(movingProgressRemaining) thì reset lại nếu có input
*/ 
import GameObject from "./GameObject";
import SpriteAnimated from "./SpriteAnimated";

class Person extends GameObject {
    constructor(config){
        super(config);
        this.sprite = new SpriteAnimated({
            gameObject : this,
            spriteName: config.spriteName || 'hero'
        });

        this.movingProgressRemaining = 0;
        this.directionUpdate = {
            "up": ["y",-1],
            "down": ["y",1],
            "right": ["x",1],
            "left": ["x",-1],
        }
    }

    // update đc gọi ở vòng loop trong OverWorld, truyền vào input có trường arrow
    update(state){
        if(this.movingProgressRemaining > 0){
            this.updatePosition();
        }else{
            if(state.arrow){
                this.startBehavior(state,{
                    type: "walk",
                    direction: state.arrow
                })
            }
            //bất kể giữ arrowkey hay ko cũng updateSprite
            this.updateSprite(state)

        }
    }

    startBehavior(state,behavior) {
        this.direction = behavior.direction;
        if(behavior.type === "walk"){
            // check wall trước khi tăng biến tích lũy
            if( state.map.isSpaceTaken(this.x, this.y,this.direction) ){
                return;
            }

            //bắt đầu đi!!!!!

            state.map.moveWall(this.x, this.y, this.direction)
            this.movingProgressRemaining = 16;

        }
    }


    updatePosition(){
        const [property, change] = this.directionUpdate[this.direction];
        this[property] += change;
        this.movingProgressRemaining -= 1;
    }

    //luôn chạy tại mọi frame, nhưng chỉ thay đổi khi arrow mới
    updateSprite(state){
        
        if(this.movingProgressRemaining > 0){
            this.sprite.setAnimation("walk-"+ this.direction);
            return;
        }

        this.sprite.setAnimation("idle-"+ this.direction);

    }
}
export default Person