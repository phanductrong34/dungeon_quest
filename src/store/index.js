import { createStore } from 'vuex'
import GameObject  from '../class/GameObject';
import utils from '../class/utils';
import Person from '../class/Person';


const moduleMap = {
  namespaced: true,
  state:{
      allMaps:{
        DemoRoom:{
            lowerSrc: "../assets/png/base/base-01.png",
            gameObject: [
              {
                name: "hero",
                x: 1,
                y: 3,
              },
              {
                name: "box",
                x: 1,
                y: 2,
              },
              {
                name: "spike",
                x: 1,
                y: 1,
              },
              {
                name: "redMon",
                x: 1,
                y: 4,
              }
            ]
        }
              
      },
  },
  getters:{
    getMap : (state) => (name) => {
      const curMap = state.allMaps[name];
      
      const sortedMap = {
        lowerSrc : curMap.lowerSrc,
        gameObject : curMap.gameObject.sort((a,b) => a.y - b.y).map((obj)=>{
          if(obj.name == "hero"){
              return new Person({
                spriteName: obj.name,
                x: utils.toPixels(obj.x), // số nguyên đc chuyển thành tọa độ pixel qua hàm withGrid
                y: utils.toPixels(obj.y)
              })
          }
          else{
              return new GameObject({
                spriteName: obj.name,
                x: utils.toPixels(obj.x), // số nguyên đc chuyển thành tọa độ pixel qua hàm withGrid
                y: utils.toPixels(obj.y)
              })
          }
        })
      }
      return sortedMap;
    }
  },
  mutations:{

  },
  actions:{

  }
}


export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    map : moduleMap,
  }
})
