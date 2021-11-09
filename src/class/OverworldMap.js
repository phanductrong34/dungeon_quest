/*
- 2 thứ: hàm vẽ 1 map và data của map
- Hàm OverworldMap, lưu game Object, lưu 2 layer của map và vẽ ra
- Object global lưu các map, 1 map lưu 2 layer trên dưới và object chứa tất cả gameObject
*/

import utils from './utils';
import {store} from '@/store/index'
import GameObject from './GameObject'

class OverworldMap{
    constructor(config){
        this.gameObject  = config.gameObject;

        //walls
        this.walls= config.walls || {};

        //monster
        this.monsters= config.monster || {};
        this.traps = config.trap || {};

        //item
        this.swords = {}

        this.lowerImage = new Image();
        this.lowerImage.src = config.lowerSrc;

    }
    drawLowerImage(ctx){
        ctx.drawImage(this.lowerImage, 0 ,0);
    }

    ////////// check vị trí
    isSpaceWall(currentX, currentY,direction){
        const {x,y} = utils.nextPosition(currentX, currentY,direction);
        return this.walls[`${x},${y}`] || false;
    }

    isSpaceMonster(x,y){
        if (this.monsters[`${x},${y}`]) return "eventMonster"
        else if(this.traps[`${x},${y}`]) return "eventTrap"
        else return null;
    }

    isSpaceSword(x, y) {
        return this.swords[`${x},${y}`] || false;
    }
    

    //chạy mỗi khi draw gameObject để thêm wall tại vị trí các gameObject
    // thêm tọa độ quái ở và quái chiếm
    mountedObject(){
        Object.values(this.gameObject).forEach(o => {
            o.mount(this);
        })
    }
    
    /////////thao tắc vói wall
    addWall(x, y) {
        this.walls[`${x},${y}`] = true;
    }
    deleteWall(x, y) {
        delete this.walls[`${x},${y}`];
    }
    moveWall(wasX, wasY,direction) {
        this.deleteWall(wasX,wasY);
        const {x,y} = utils.nextPosition(wasX,wasY,direction);
        this.addWall(x,y);
    }

    //////////thao tác với item
    addSword(x,y,sword) {
        this.swords[`${x},${y}`] = sword
    }
    deleteSword(x,y){
        delete this.gameObject[`sword_${x}_${y}`]
        delete this.swords[`${x},${y}`];
        console.log(this);
    }
    

    ////////thao tác với monster

    addMonsterAndTrap(x, y,mon) {
        this.monsters[`${x},${y}`] = mon;
        let trap1,trap2;
        if(mon.name == "redMon"){
            trap1 = utils.nextPosition(x,y,"up");
            trap2 = utils.nextPosition(x,y,"down");
        }else if (mon.name == "greenMon"){
            trap1 = utils.nextPosition(x,y,"left");
            trap2 = utils.nextPosition(x,y,"right");
        }
        this.traps[`${trap1.x},${trap1.y}`] = mon;
        this.traps[`${trap2.x},${trap2.y}`] = mon;  
    }

    getMonsterCause(x,y){
        return this.monsters[`${x},${y}`] || this.traps[`${x},${y}`]
    }

    setDeadFloor(playerPos, monPos){
        console.log(playerPos,monPos);
            this.gameObject.unshift(new GameObject({
                spriteName: "deadFloor",
                x: playerPos.x,
                y: playerPos.y
            }));
            // nếu tọa độ không trùng nhau thì lấy thêm cả của player
            if(playerPos.x !== monPos.x || playerPos.y !== monPos.y){
                this.gameObject.unshift(new GameObject({
                  spriteName: "deadFloor",
                  x: monPos.x, 
                  y: monPos.y
                }))
            }

            console.log(this.gameObject);
    }
    

}

export default OverworldMap
