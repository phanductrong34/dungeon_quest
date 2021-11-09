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
                name: "sword",
                x: 7,
                y: 5,
              },
              {
                name: "hero",
                x: 4,
                y: 4,
              },
              {
                name: "box",
                x: 3,
                y: 6,
              },
              {
                name: "box",
                x: 4,
                y: 6,
              },
              {
                name: "box",
                x: 5,
                y: 6,
              },
              {
                name: "spike",
                x: 3,
                y: 4,
              },
              {
                name: "redMon",
                x: 4,
                y: 2,
              },
              {
                name: "greenMon",
                x: 5,
                y: 3,
              }
            ]
        }
              
      },
  },
  getters:{
    getMap : (state) => (name) => {
      const curMap = state.allMaps[name];
      const formatGameObject = [];

      curMap.gameObject.forEach(obj => {
        const objId = `${obj.name}_${utils.toPixels(obj.x)}_${utils.toPixels(obj.y)}`;
        if(obj.name == "hero"){
            formatGameObject[objId] = new Person({
              spriteName: obj.name,
              x: utils.toPixels(obj.x), // số nguyên đc chuyển thành tọa độ pixel qua hàm withGrid
              y: utils.toPixels(obj.y)
            })
        }
        else{
            formatGameObject[objId] =  new GameObject({
              spriteName: obj.name,
              x: utils.toPixels(obj.x), // số nguyên đc chuyển thành tọa độ pixel qua hàm withGrid
              y: utils.toPixels(obj.y)
            })
        }

      })

      const sortedMap = {
        lowerSrc : curMap.lowerSrc,
        gameObject : formatGameObject
      }
      return sortedMap;
    }
    
  },
  mutations:{

  },
  actions:{

  }
}


export const store =  createStore({
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
