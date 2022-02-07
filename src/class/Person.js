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
import SpritePerson from "./SpritePerson";
import utils from "./utils";

class Person extends GameObject {
    constructor(config){
        super(config);
        this.sprite = new SpritePerson({
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
        this.isHit = false;
        this.hasSword = false;
        this.isCutscenePlaying = false;
    }

    // update đc gọi ở vòng loop trong OverWorld, truyền vào input có trường arrow
    update(state){
        if(this.movingProgressRemaining > 0){
            this.updatePosition(state);
        }else{
            // nếu người chơi ấn nút khi không có cutscene thì nhận
            if( !this.isCutscenePlaying  && state.arrow){

                // nếu có kiếm, check luôn bước sau
                const nextMon = state.map.isNextSpaceMonster(this.x,this.y,state.arrow);
                if (this.hasSword && nextMon){
                    this.isCutscenePlaying = true;
                    this.startBehavior(state,{
                        type: "kill",
                        direction: state.arrow,
                        mon: nextMon
                    })
                    this.updateSprite(state)
                    return;
                }
                //nếu không có kiếm, cho đi hết rồi check
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
            if( state.map.isSpaceWall(this.x, this.y,this.direction) ){
                return;
            }

            //bắt đầu đi!!!!!

            state.map.moveWall(this.x, this.y, this.direction)
            this.movingProgressRemaining = 16;
        }

        if(behavior.type === "kill"){
            utils.emitEvent("PersonKillMonster", {
                who: this,
                mon: behavior.mon,
                map: state.map,
                direction: this.direction
            })
        }
    }


    updatePosition(state){
        if(this.isHit) return;

        const [property, change] = this.directionUpdate[this.direction];
        // if(this[property]+change <=128  && this[property]+change >= 0){
        //     this[property] += change;
        // }
        this[property] += change;
        this.movingProgressRemaining -= 1;

        // check hoàn thành tiến trình đi
        if(this.movingProgressRemaining === 0){
            utils.emitEvent("PersonWalkingComplete", {
                who: this,
                map: state.map
            })
        }
    }

    //luôn chạy tại mọi frame, nhưng chỉ thay đổi khi arrow mới
    updateSprite(state){
        let sword;
        this.hasSword ? sword = "-sword" : sword = "";  

        if(this.isCutscenePlaying){
            this.sprite.setAnimation("hit-"+ this.direction + sword);
            return;
        }
        if(!this.isHit && this.movingProgressRemaining > 0){
            this.sprite.setAnimation("walk-"+ this.direction + sword);
            return;
        }

        else if (!this.isHit && this.movingProgressRemaining == 0){
            this.sprite.setAnimation("idle-"+ this.direction + sword);
        }else{
            this.sprite.setAnimation("hit-"+ this.direction);
        }

    }

    setHit(){
        this.isHit = true;
    }
    pickSword(){
        this.hasSword = true;
    }
}
export default Person