class DirectionInput {
    constructor(config){
        this.heldDirections = []; 
        this.voiceMode = config.voiceMode;
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
    keydownFunc(e){
        if(!this.voiceMode){
            const dir = this.map[e.code];
            this.pushDir(dir);
        }
    }
    keyupFunc(e){
        if(!this.voiceMode){
            const dir = this.map[e.code];
            this.removeDir(dir)
        }
    }
    

    pushDir(dir){
        //nếu hướng mới hợp lệ và  chưa có trong mảng thì thêm vào
        if(dir && this.heldDirections.indexOf(dir) === -1){
            this.heldDirections.unshift(dir);
        }
        console.log("push" + this.heldDirections, dir);
    }
    removeDir(dir){
        const index = this.heldDirections.indexOf(dir);
        if(index > -1){
            this.heldDirections.splice(index,1);
        }
        console.log("remove" + this.heldDirections, dir);
    }


    //voiceMode
    setVoiceMode(){
        this.voiceMode = true;
    }

    init(){
        document.addEventListener('keydown',(e) => this.keydownFunc(e));
        // sua khi nhấc tay khỏi phím thì xóa hướng đó khỏi mảng
        document.addEventListener('keyup',(e) => this.keyupFunc(e));
    }
}

export default DirectionInput