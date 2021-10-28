/*
Class tổng sẽ chạy game của chúng ta
- 1 hàm loop để vẽ ra game sau mỗi frame
- 1 hàm init để bắt đầu chạy game với khởi tạo ban đầu

Cách chạy:
- Nạp map (bao gồm layer trên dưới và 1ojbect chứa các GameObject)
- Loop chạy vẽ tất cả mọi thứ lên ctx
*/

import OverworldMap from './OverworldMap' ;
import {useStore} from 'vuex'
import {ref,computed} from 'vue'
import DirectionInput from './DirectionInput'


class Overworld {
 constructor(config) {
   this.element = config.element;
   this.canvas = this.element.querySelector(".game-canvas");
   this.ctx = this.canvas.getContext("2d");
   this.map = null; //ban đầu khởi tạo bằng 0, sau đó khi init sẽ gán 1 Overworldmap và chạy hàm loop để vẽ
 }

 startGameLoop(){
   const step = ()=>{
    this.ctx.clearRect(0, 0,this.canvas.width, this.canvas.height);

     // Draw Lower Layer
    this.map.drawLowerImage(this.ctx)

    // Draw GameObject
    Object.values(this.map.gameObject).forEach(object=>{
      // object.x += 1;

      // truyền hướng vào để vẽ lại tọa độ của object khi có input direction, nếu obj là Person thì mới đc, còn ko thì ko có gì 
      object.update({
        arrow: this.directionInput.direction
      })
      object.sprite.draw(this.ctx)
    })

    // //Draw Upper Layer
    // this.map.drawUpperImage(this.ctx);

     requestAnimationFrame(()=>{
       step()
      })
   }
   step();
 }

 init() {
  const store = useStore();
  const curMap = store.getters['map/getMap']('DemoRoom')
  this.map = new OverworldMap(curMap);

  // Khởi tạo class nhận input
  this.directionInput = new DirectionInput();
  this.directionInput.init();

  this.directionInput.direction; // hàm getter, trả về phần tử đầu tiên của mảng input


  this.startGameLoop();

 }

}
export default Overworld;