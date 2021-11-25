//làm nhiệm vụ thực thi những sự kiện khi event xảy ra, thông qua hàm emit event
// Event nhảy vào ô có có quái, hoặc ô bị quái chiếm khi không có kiếm
// Event nhảy vào ô có quái, hoặc ô quái chiếm khi mà có kiếm
// hai event phải đều phát hiện được quái tạo ra sự kiện là quái nào, đầy đủ cả class,m tức thằng phát ra sự kiện phải gửi cùng đi
import utils from './utils'
class OverworldEvent{
    constructor(config){
        this.map = config.map
        this.stopCounter = 0;
    }
    setCounter(number){
        this.stopCounter = number;
    }
    countDown(resolve){
        if(this.stopCounter == 0){
            resolve();
            return;
        }
        else {
            this.stopCounter--;
        }
        var self = this;
        requestAnimationFrame(()=>{ self.countDown(resolve)})
    }
    changeDirection(){
        let res;
        if(this.who.x - this.currentMonster.x > 0){ // mon-who
            res = ['left','right'];
        }else if(this.who.x - this.currentMonster.x < 0){ //who-mon
            res = ['right','left'];
        }else{
            res = [this.who.direction,this.who.direction]
        }
        console.log(res);
        this.who.direction = res[0];
        this.currentMonster.direction = res[1];
        console.log(this.currentMonster);
    }

    eventGoal(){
        alert("YOU WINN");
        this.map.isPlaying = false;
    }

    eventMonster(){
        this.who.setHit();
        this.changeDirection()
        this.currentMonster.isEating = true;
        this.map.setDeadFloor(
            {x: this.currentX, y: this.currentY},
            {x: this.currentMonster.x, y : this.currentMonster.y}
        )

    }
    eventTrap(){
        if(this.who.hasSword){
            return;
        }else{
            this.who.setHit();
            this.changeDirection()
            this.currentMonster.isEating = true;
            this.map.setDeadFloor(
                {x: this.currentX, y: this.currentY},
                {x: this.currentMonster.x, y : this.currentMonster.y}
            )
        }
    }

    eventSword(){
        this.map.deleteSword(this.currentX,this.currentY);
        this.who.pickSword();
    }

    // handle các event nhặt kiếm, dính trap, dính monster
    eventWalkComplete(e){
        this.map = e.detail.map;
        this.who = e.detail.who;

        this.currentX = this.who.x;
        this.currentY = this.who.y;

        const checkGoal = this.map.isSpaceGoal(this.currentX,this.currentY);
        if(checkGoal){
            this.eventGoal();
            return;
        }

        const checkMon = this.map.isSpaceMonster(this.currentX,this.currentY)
        if(checkMon){
            // lấy obj quái gây ra cái chết
            this.currentMonster = this.map.getMonsterCause(this.currentX, this.currentY);
            this[checkMon]();
            return;
        }

        const checkSwords = this.map.isSpaceSword(this.currentX,this.currentY)
        if(checkSwords){
            this.eventSword()
            return;
        }
        
    }

    async eventKillMonster(e){
        this.map = e.detail.map;
        this.who = e.detail.who;
        const direction = e.detail.direction;
        this.currentMonster  = e.detail.mon;

        //bật cutscene - hero chém - mon mất - hero mất kiếm- hero đi tới - tắt cutscene (cho phép điều khiển tiếp)
        this.who.isCutscenePlaying = true; 
        this.currentMonster.isDead = true;
        
        // đợi 16 frame
        this.setCounter(16)
        await new Promise((resolve) => {this.countDown(resolve)} )
        this.map.deleteMonsterAndTrap(this.currentMonster.x,this.currentMonster.y);
        this.who.hasSword = false;
        this.who.startBehavior(
            {
                map: this.map
            },
            {
                type: "walk",
                direction: direction
            }
        )
        
        // đợi 16 frame
        this.setCounter(16)
        await new Promise((resolve) => {this.countDown(resolve)} )

        // tắt Cutscene
       
        this.who.isCutscenePlaying = false;        
    }

    init(){
        document.addEventListener("PersonWalkingComplete", (e)=> this.eventWalkComplete(e));
        document.addEventListener("PersonKillMonster", (e) => this.eventKillMonster(e));
    }
}

export default OverworldEvent

