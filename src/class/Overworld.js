/*
Class tổng sẽ chạy game của chúng ta
- 1 hàm loop để vẽ ra game sau mỗi frame
- 1 hàm init để bắt đầu chạy game với khởi tạo ban đầu

Cách chạy:
- Nạp map (bao gồm layer trên dưới và 1ojbect chứa các GameObject)
- Loop chạy vẽ tất cả mọi thứ lên ctx
*/

import OverworldMap from './OverworldMap' ;
import {store} from '@/store/index'
import {ref,computed} from 'vue'
import DirectionInput from './DirectionInput'
import OverworldEvent from './OverworldEvent'


class Overworld {
 constructor(config) {
   this.element = config.element;
   this.canvas = this.element.querySelector(".game-canvas");
   this.ctx = this.canvas.getContext("2d");
   this.map = null; //ban đầu khởi tạo bằng 0, sau đó khi init sẽ gán 1 Overworldmap và chạy hàm loop để vẽ
 }


//Hàm tổng, chạy lại sau mỗi frame, làm nhiệm vụ vẽ lại toàn bộ canvas: vẽ nền và các gameObject
// chạy hàm update lên tất cả gameObject trước khi vẽ lại lên canvas để thay đổi, và biến truyền vào là directionInput thay đổi liên tục trường direction do gắn event vào cửa sổ
// ở đây chỉ có Person là chạy được hàm update(state)

 startGameLoop(){
    const step = ()=>{
      this.ctx.clearRect(0, 0,this.canvas.width, this.canvas.height);
      

      // Draw Lower Layer
      this.map.drawLowerImage(this.ctx)

      // Draw GameObject
      Object.values(this.map.gameObject).sort((a,b)=>{
        return a.y - b.y
      }).forEach(object=>{;
        object.update({
          arrow: this.directionInput.direction,
          map: this.map
        })
        object.sprite.draw(this.ctx)
      })

      requestAnimationFrame(()=>{
        step()
        })
   }
   step();
 }

 init() {
  const curMap = store.getters['map/getMap']('DemoRoom')
  this.map = new OverworldMap(curMap);
  this.overworldEvent = new OverworldEvent({
    map: this.map
  })
  // tạo wall trước khi vẽ bất cứ thứ gì
  this.map.mountedObject();
  this.overworldEvent.init();
  

  // Khởi tạo class nhận input
  this.directionInput = new DirectionInput();
  this.directionInput.init();

  this.directionInput.direction; // hàm getter, trả về phần tử đầu tiên của mảng input


  this.startGameLoop();

 }

}
export default Overworld;