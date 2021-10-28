/*
- 2 thứ: hàm vẽ 1 map và data của map
- Hàm OverworldMap, lưu game Object, lưu 2 layer của map và vẽ ra
- Object global lưu các map, 1 map lưu 2 layer trên dưới và object chứa tất cả gameObject
*/

class OverworldMap{
    constructor(config){
        this.gameObject  = config.gameObject;

        this.lowerImage = new Image();
        this.lowerImage.src = config.lowerSrc;

    }
    drawLowerImage(ctx){
        ctx.drawImage(this.lowerImage, 0 ,0);
    }
}

export default OverworldMap