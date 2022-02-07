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
import _ from "lodash" 

class Overworld {
 constructor(config) {
   this.element = config.element;
   this.canvas = this.element.querySelector(".game-canvas");
   this.ctx = this.canvas.getContext("2d");
   this.mapID = config.mapID;
   this.directionInput = config.directionInput;
   this.toggleInput = config.directionInput;
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
          arrow: _.get(this.toggleInput,'direction'),
          map: this.map
        })
        object.sprite.draw(this.ctx)
      })

      requestAnimationFrame(()=>{
        if(!this.map.isPlaying) return;
        step()
        })
   }
   step();
 }

 init() {
  //const curMap = store.getters['gameData/getMap'](this.mapID);
  const curMap = store.getters['gameData/getMap'](this.mapID);

  this.map = new OverworldMap(curMap);
  this.overworldEvent = new OverworldEvent({
    map: this.map
  })
  // tạo wall trước khi vẽ bất cứ thứ gì
  this.map.mountedObject();
  this.overworldEvent.init();

  this.startGameLoop();

 }

 replay(){
  const curMap = store.getters['gameData/getMap'](this.mapID);
  this.overworldEvent.endEvent();
  this.toggleInput = this.directionInput;
  this.map = new OverworldMap(curMap);
  this.map.mountedObject();
  this.isPlaying = true;
 }

 endGame() {
  this.isPlaying = false;
  this.toggleInput = null
 }

}
export default Overworld;