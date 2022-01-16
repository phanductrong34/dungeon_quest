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
        this.isPlaying = true;
        this.gameObject  = config.gameObject;

        //goals
        this.goal = config.goal || {};

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
        ctx.drawImage(this.lowerImage, 23 ,8);
    }


    //chạy mỗi khi draw gameObject để thêm wall tại vị trí các gameObject
    // thêm tọa độ quái ở và quái chiếm
    mountedObject(){
        Object.values(this.gameObject).forEach(o => {
            o.mount(this);
        })
        console.log(this);
    }

    ///////// thao tác với goal
    addGoal(x,y){
        this.goal[`${x},${y}`] = true;
    }
    isSpaceGoal(x,y){
        return this.goal[`${x},${y}`] || false;
    }
    
    /////////thao tắc vói wall
    isSpaceWall(currentX, currentY,direction){
        const {x,y} = utils.nextPosition(currentX, currentY,direction);
        return this.walls[`${x},${y}`] || false;
    }
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
    
    isSpaceSword(x, y) {
        return this.swords[`${x},${y}`] || false;
    }
    addSword(x,y,sword) {
        this.swords[`${x},${y}`] = sword
    }
    deleteSword(x,y){
        delete this.gameObject[`sword_${x}_${y}`]
        delete this.swords[`${x},${y}`];
    }
    

    ////////thao tác với monster

    isSpaceMonster(x,y){
        if (this.monsters[`${x},${y}`]) return "eventMonster"
        else if(this.getFirstTrap(x,y)) return "eventTrap"
        else return null;
    }

    
    isNextSpaceMonster(x,y,direction){
        const nextPos = utils.nextPosition(x,y,direction);
        if(this.monsters[`${nextPos.x},${nextPos.y}`])
        return this.monsters[`${nextPos.x},${nextPos.y}`];
        else return false;
    }


    // check trap đầu tiên trong object có chứa string "x,y"
    getFirstTrap(x,y){
        const substring = `${x},${y}`;
        for (const key of Object.keys(this.traps)){
            if(key.slice(0,substring.length) == substring){
                return this.traps[key];
            }
        }
        return false;
    }

    getMonsterCause(x,y){
        if(this.monsters[`${x},${y}`] ) return this.monsters[`${x},${y}`] 
        else{
            return this.getFirstTrap(x,y)
        }
    }

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
        this.traps[`${trap1.x},${trap1.y},${x}${y}`] = mon;
        this.traps[`${trap2.x},${trap2.y},${x}${y}`] = mon;  
    }

    setDeadFloor(playerPos, monPos){
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
    }

    // x, y là tọa độ của quái
    deleteMonsterAndTrap(x,y){
        // hai hướng tùy vào 
        let dir1, dir2, name;
        if(this.monsters[`${x},${y}`].name == "redMon"){
            name = "redMon";dir1 = "up"; dir2 = "down";
        }else{
            name = "greenMon",dir1 = "left"; dir2 = "right";
        }
        //gỡ khỏi map
        delete this.gameObject[`${name}_${x}_${y}`];

        // gỡ khỏi object monsters
        delete this.monsters[`${x},${y}`];

        // gỡ khỏi object traps
        const trapPos1 = utils.nextPosition(x,y,dir1);
        delete this.traps[`${trapPos1.x},${trapPos1.y},${x}${y}`];

        const trapPos2 = utils.nextPosition(x,y,dir2);
        delete this.traps[`${trapPos2.x},${trapPos2.y},${x}${y}`];
    }

    

}

export default OverworldMap

// lưu monster "34,56" được vì một vị trí có 1 gameObject thôi
// lưu trap lưu kiểu khác, vì có thể trùng nhau : "34,56,5645" số cuối là tọa độ x,y ghép lại của monster gây ra
