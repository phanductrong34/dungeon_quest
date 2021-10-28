import GameObject from "./GameObject";

class Person extends GameObject {
    constructor(config){
        super(config);
        // nhân vật sẽ chỉ di chuyển một số ô chẵn, biến này để lock nv phải di chuyển cho tới khi về 0
        this.movingProgressRemaining = 0;

        // this.isPlayerControlled = config.isPlayerControlled || false;

        this.directionUpdate = {
            "up": ["y",-1],
            "down": ["y",1],
            "right": ["x",1],
            "left": ["x",-1],
        }
    }

    // update đc gọi ở vòng loop trong OverWorld, truyền vào input có trường arrow
    update(state){
        this.updatePosition();
        if(this.movingProgressRemaining === 0 && state.arrow){ // tức chỉ nhận input và chạy hàm khi đã đi hết cái cũ
            this.direction = state.arrow;
            this.movingProgressRemaining = 16
        }
    }
    updatePosition(){
        if(this.movingProgressRemaining > 0){
            const [property, change] = this.directionUpdate[this.direction];
            this[property] += change;
            this.movingProgressRemaining -= 1;
        }
    }
}
export default Person