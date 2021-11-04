class DirectionInput {
    constructor(){
        this.heldDirections = []; 

        this.map = {
            "ArrowUp": "up",
            "KeyW": "up",
            "ArrowDown": "down",
            "KeyS": "down",
            "ArrowLeft": "left",
            "KeyA": "left",
            "ArrowRight": "right",
            "KeyD": "right",
        }
    }

    get direction(){
        return this.heldDirections[0];
    }

    init(){
        document.addEventListener('keydown', e =>{
            // console.log(e.code);
            const dir = this.map[e.code];

            //nếu hướng mới hợp lệ và  chưa có trong mảng thì thêm vào
            if(dir && this.heldDirections.indexOf(dir) === -1){
                this.heldDirections.unshift(dir);
                //console.log(this.heldDirections);
            }
        });

        // sua khi nhấc tay khỏi phím thì xóa hướng đó khỏi mảng
        document.addEventListener('keyup', e =>{
            const dir = this.map[e.code];
            const index = this.heldDirections.indexOf(dir);
            if(index > -1){
                this.heldDirections.splice(index,1)
            }
        })
    }
}

export default DirectionInput