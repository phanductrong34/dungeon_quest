import GameObject from "./GameObject";

// class làm nhiệm vụ rerender canvas mỗi frame
//input constructor {element, canvas}
class Overworld{
    constructor(config){
        this.element = config.element;
        this.canvas = config.canvas;
        this.ctx = this.canvas.getContext("2d");
    }
    
    // vẽ các object lên 
    init(){
        const image = new Image();
        image.onLoad = ()=>{
            this.ctx.drawImage(image,0,0);
            console.log("log image",image);

        };
        image.src = "../assets/images/maps/DemoLower.png"

        //Place Some GameObject here
        const hero = new GameObject({
            x : 5,
            y : 6
        });
        const npc1 = new GameObject({
            x: 7,
            y: 9,
            src: "../asset/images/characters/people/npc1.png"
        })
        setTimeout(() => {
            hero.sprite.draw(this.ctx);
            npc1.sprite.draw(this.ctx);
          }, 200)
    }

}

export default Overworld;