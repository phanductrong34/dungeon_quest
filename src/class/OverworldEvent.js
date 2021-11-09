//làm nhiệm vụ thực thi những sự kiện khi event xảy ra, thông qua hàm emit event
// Event nhảy vào ô có có quái, hoặc ô bị quái chiếm khi không có kiếm
// Event nhảy vào ô có quái, hoặc ô quái chiếm khi mà có kiếm
// hai event phải đều phát hiện được quái tạo ra sự kiện là quái nào, đầy đủ cả class,m tức thằng phát ra sự kiện phải gửi cùng đi
class OverworldEvent{
    constructor(config){
        this.map = config.map
    }
    eventMonster(){
        console.log(`Monster!!`);
        this.who.setHit();
        this.map.setDeadFloor(
            {x: this.currentX, y: this.currentY},
            {x: this.currentMonster.x, y : this.currentMonster.y}
        )

    }
    eventTrap(){
        console.log("Trap!!");
        this.who.setHit();
        this.map.setDeadFloor(
            {x: this.currentX, y: this.currentY},
            {x: this.currentMonster.x, y : this.currentMonster.y}
        )
    }

    eventSword(){
        console.log("Sword!!!");
        this.map.deleteSword(this.currentX,this.currentY);
        this.who.pickSword();
    }

    eventHandler(e){
        this.who = e.detail.who;
        this.currentX = this.who.x;
        this.currentY = this.who.y;

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
    init(){
        document.addEventListener("PersonWalkingComplete", (e)=> this.eventHandler(e));
        
    }
}

export default OverworldEvent