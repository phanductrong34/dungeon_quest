import { createStore } from 'vuex'
import GameObject  from '../class/GameObject';
import utils from '../class/utils';
import Person from '../class/Person';
import ObjectAnimated from '../class/ObjectAnimated';
import getCollection from '../composables/getCollection'
import getCollectionFilter from '../composables/getCollectionFilter'
import getDocu from '../composables/getDoc'

const moduleEvents = {
  namespaced: true,
  state: {
    overworldEvent : null,
    event: null,
    cause: null,
    currentStep: 0,
  },
  getters: {
    getEvent(state){
      return state.event
    },
    getCause(state){
      return state.currentStep;
    },
    getStep(state){
      return state.currentStep;
    }
  },
  actions: {
    resetEvent({state}){
      state.overworldEvent = null;
      state.event = null;
      state.currentStep = 0;
      state.cause = null
    },
    setEvent({state}, {event,cause}){
      state.event = event;
      state.cause = cause;
    },
    incrementStep({state}){
      ++state.currentStep;
    }
  }
}

const moduleGameData = {
  namespaced: true,
  state:{
      lowerSrc: "../assets/png/base/testmap.png",
      userGameData: [],
      allMaps:{
        'id':{
            gameObjects: [
              {
                name: 'goal',
                x: 5,
                y: 0
              },
              {
                name: 'hero',
                x: 1,
                y: 1
              },
              {
                name: 'sword',
                x: 2,
                y: 2
              },
              {
                name: 'redMon',
                x: 3,
                y: 2
              }
            ],
            minSteps: 10,
            maxSteps:20,
            timeLimit: 10
        }
              
      },
  },
  getters:{
    getMap : (state) => (id) => {
      const curMap = state.allMaps[id];
      const formatGameObject = [];

      curMap.gameObjects.forEach(obj => {
        const objId = `${obj.name}_${utils.toPixels(obj.x)}_${utils.toPixels(obj.y)}`;
        if(obj.name == "hero"){
            formatGameObject[objId] = new Person({
              spriteName: obj.name,
              x: utils.toPixels(obj.x), // số nguyên đc chuyển thành tọa độ pixel qua hàm withGrid
              y: utils.toPixels(obj.y)
            })
        }else if(["redMon",'greenMon','whiteMon','goal'].includes(obj.name)){
          formatGameObject[objId] = new ObjectAnimated({
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
        lowerSrc : state.lowerSrc,
        gameObject : formatGameObject,
        minSteps: curMap.minSteps,
        maxSteps: curMap.maxSteps,
        timeLimit: curMap.timeLimit
      }
      return sortedMap;
    }
    
  },
  mutations:{

  },
  actions:{
    async loadBaseGameData({state}){
      if(state.allMaps.length > 0) return state.allMaps;
     
      const {dataArray, error : err, load} = getCollection('maps');
      await load();
      if(!err.value && dataArray.value.length > 0){
        dataArray.value.forEach(map => {
          state.allMaps[map.id] = map;
        })
        console.log("logggggg",state.allMaps);
        return state.allMaps;
      }else return [];
    },

    async loadUserGameData({state, rootState}){
      if(state.userGameData.length > 0) return state.userGameData;

      const {dataArray, error : err, load} = getCollectionFilter('records');
      await load('userID',rootState.currentUser.id);
      if(!err.value && dataArray.value.length > 0){
        state.userGameData = dataArray;
        return state.userGameData
      }else return [];
    }
  }
}


export const store =  createStore({
  state: {
    currentUser: null,
  },
  getters: {
    getCurrentUser(state){
      return state.currentUser;
    }
  },
  actions: {
    setCurrentUser({state},user){
      state.currentUser = user
    },
  },
  modules: {
    gameData : moduleGameData,
    event: moduleEvents,
  }
})
