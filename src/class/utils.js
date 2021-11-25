import { toNumber } from "@vue/shared"

const utils = {
    toPixels(n){
        return (n * 16)
    },
    toNumber(px){
        return (px / 16)
    },
    asGridCoord(x,y){
        return `${x*16},${y*16}`
    },
    nextPosition(initialX, initialY, direction){
        let x = initialX;
        let y = initialY;
        const size = 16;
        if(direction === "left"){
            x -= size;
        }else if (direction === "right"){
            x  += size;
        }else if (direction === "up"){
            y -= size;
        }else if (direction === "down"){
            y += size;
        }
        return {x,y}
    },
    emitEvent(name,detail){
        const event = new CustomEvent(name, {detail});
        document.dispatchEvent(event);
    },
    revertDirection(dir){
        let res;
        switch (dir) {
            case 'left':
                res = 'right';
                break;
            case 'right':
                res = 'left';
                break;
            case 'up':
                res = 'down';
                break;
            case 'down':
                res = 'up';
                break;
        }
        return res;
    }

}

export default utils