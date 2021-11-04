/*
- 2 thứ: hàm vẽ 1 map và data của map
- Hàm OverworldMap, lưu game Object, lưu 2 layer của map và vẽ ra
- Object global lưu các map, 1 map lưu 2 layer trên dưới và object chứa tất cả gameObject
*/

import utils from './utils';

class OverworldMap{
    constructor(config){
        this.gameObject  = config.gameObject;

        //walls
        this.walls= config.walls || {};

        this.lowerImage = new Image();
        this.lowerImage.src = config.lowerSrc;

    }
    drawLowerImage(ctx){
        ctx.drawImage(this.lowerImage, 0 ,0);
    }

    isSpaceTaken(currentX, currentY,direction){
        const {x,y} = utils.nextPosition(currentX, currentY,direction);
        return this.walls[`${x},${y}`] || false;
    }

    //chạy mỗi khi draw gameObject để thêm wall tại vị trí các gameObject
    mountedObject(){
        Object.values(this.gameObject).forEach(o => {
            o.mount(this);
        })
    }
    
    //thao tắc thêm xóa wall
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

}

export default OverworldMap