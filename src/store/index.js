import { createStore } from 'vuex'
import GameObject  from '../class/GameObject';
import utils from '../class/utils';
import Person from '../class/Person';
import ObjectAnimated from '../class/ObjectAnimated';
import getCollection from '../composables/getCollection'
import getCollectionFilter from '../composables/getCollectionFilter'
import useCollection from '../composables/useCollection'
import getDocu from '../composables/getDoc'
import {useToast} from 'vue-toastification'

const toast = useToast();

const moduleEvents = {
  namespaced: true,
  state: {
    overworldEvent : null,
    event: null,
    cause: null,
    currentStep: 0,
    walkTrigger: false,
    voiceMode: true,
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
    },
    getWalkTrigger(state){
      return state.walkTrigger
    },
    getVoiceMode(state){
      return state.voiceMode
    }
  },
  actions: {
    resetEvent({state}){
      console.log('resetEvent');
      state.overworldEvent = null;
      state.event = null;
      state.currentStep = 0;
      state.cause = null
    },
    setEvent({state}, {event,cause}){
      state.event = event;
      state.cause = cause;
    },
    toggleVoiceMode({state}){
      state.voiceMode = !state.voiceMode;
    },
    incrementStep({state}){
      state.currentStep+=1;
    },
    triggerWalk({state}){
      state.walkTrigger = true;
      // console.log("walkTrigger true");
      setTimeout(()=>{
        state.walkTrigger = false;
        // console.log("walkTrigger false");
      },10)
    }
  }
}

const moduleGameData = {
  namespaced: true,
  state:{
      lowerSrc: "../assets/png/base/testmap.png",
      defaultWall: [[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[7,0],[8,0],
                    [0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],[0,8],
                    [1,9],[2,9],[3,9],[4,9],[5,9],[6,9],[7,9],[8,9],
                    [9,1],[9,2],[9,3],[9,4],[9,5],[9,6],[9,7],[9,8]]
                    ,
      userGameData: {},
      allMaps:{
        // 'id':{
        //     no: 10,
        //     gameObjects: [
        //       {
        //         name: 'goal',
        //         x: 5,
        //         y: 0
        //       },
        //       {
        //         name: 'hero',
        //         x: 1,
        //         y: 1
        //       },
        //       {
        //         name: 'sword',
        //         x: 2,
        //         y: 2
        //       },
        //       {
        //         name: 'redMon',
        //         x: 3,
        //         y: 2
        //       }
        //     ],
        //     minSteps: 10,
        //     maxSteps:20,
        //     timeLimit: 10
        // }
              
      },
      directionalInput: null
  },
  getters:{
    getMap : (state) => (id) => {
      const curMap = state.allMaps[id];
      const formatGameObject = [];
      let goalPos = [0,0];

      curMap.gameObjects.forEach(obj => {
        const objId = `${obj.name}_${utils.toPixels(obj.x)}_${utils.toPixels(obj.y)}`;
        if(obj.name == "hero"){
            formatGameObject[objId] = new Person({
              spriteName: obj.name,
              x: utils.toPixels(obj.x), // số nguyên đc chuyển thành tọa độ pixel qua hàm withGrid
              y: utils.toPixels(obj.y)
            })
        }else if(["redMon",'greenMon','whiteMon'].includes(obj.name)){
          formatGameObject[objId] = new ObjectAnimated({
            spriteName: obj.name,
            x: utils.toPixels(obj.x), // số nguyên đc chuyển thành tọa độ pixel qua hàm withGrid
            y: utils.toPixels(obj.y)
          })
        }else if(obj.name == 'goal'){
          formatGameObject[objId] = new ObjectAnimated({
            spriteName: obj.name,
            x: utils.toPixels(obj.x), // số nguyên đc chuyển thành tọa độ pixel qua hàm withGrid
            y: utils.toPixels(obj.y)
          })
          goalPos = [obj.x,obj.y];
        }
        else{
            formatGameObject[objId] =  new GameObject({
              spriteName: obj.name,
              x: utils.toPixels(obj.x), // số nguyên đc chuyển thành tọa độ pixel qua hàm withGrid
              y: utils.toPixels(obj.y)
            })
        }

        // thêm wall vào xung quanh map
        const goalIndex = state.defaultWall.findIndex((wall) =>{
          return wall[0] == goalPos[0] && wall[1] == goalPos[1]
        })
        let tempArray = [...state.defaultWall];
        tempArray.splice(goalIndex,1)

        tempArray.forEach((wall,index) => {
          formatGameObject[`wall-${wall[0]}-${wall[1]}`] =  new GameObject({
            spriteName: "wall",
            x: utils.toPixels(wall[0]), // số nguyên đc chuyển thành tọa độ pixel qua hàm withGrid
            y: utils.toPixels(wall[1])
          })
        })

      })

      const sortedMap = {
        lowerSrc : state.lowerSrc,
        gameObject : formatGameObject,
        minSteps: curMap.minSteps,
        maxSteps: curMap.maxSteps,
        timeLimit: curMap.timeLimit,
        no: curMap.no
      }
      return sortedMap;
    },
    getAllMaps(state){
        return state.allMaps
    },
    getUserGameData(state){
        return state.userGameData
    },
    getNextMapId: (state) => (id) =>{
      const currentMapNo = state.allMaps[id].no;
      const allMapsArr = Object.keys(state.allMaps)
      
      let nextMapId;
      for (let i = 0; i < allMapsArr.length; i ++){
        const curMap = state.allMaps[allMapsArr[i]];
        if (curMap.no == currentMapNo + 1){
          nextMapId = allMapsArr[i]
          break;
        }
      }
      return nextMapId;
    },
    getDirectionInput(state){
      if(!state.directionalInput){ // nếu chưa có
        
      }else{ // nếu có rồi

      }
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
        dataArray.value.forEach((map,index) => {
          state.allMaps[map.id] = map;
          state.allMaps[map.id].no = index + 1
        })
        console.log("logggggg",state.allMaps);
        return state.allMaps;
      }else return [];
    },

    async loadUserGameData({state, rootState}){
      if(state.userGameData.length > 0) return state.userGameData;

      const {dataArray, error : err, load} = getCollectionFilter('records');
      await load('userId',rootState.currentUser.id);
      if(!err.value && dataArray.value.length > 0){
        dataArray.value.forEach(rec => {
          state.userGameData[rec.mapId] = rec;
        })
        console.log(state.userGameData);
        return state.userGameData
      }else return {};
    },

    async setUserGameRecord({state,rootState},record){
      if(record.type == 'lose') return;

      const {error, addDocument,setDocument} = useCollection('records');
      const newRecord = {...record, userId : rootState.currentUser.user.email};
      // kiểm tra đã tồn tại record cho màn này chưa để ghi đè lên
      
      if(!state.userGameData[record.mapId]){ //nếu là màn mới chưa tồn tại
        const res = await addDocument(newRecord);     
        // ghi vào kho offline
        if(!error.value){
          console.log("add record success", res);
          state.userGameData[record.mapId] = {...record,id: res.id};
          console.log(newRecord);
        }
      }else if(record.steps <= state.userGameData[record.mapId].steps && record.time < state.userGameData[record.mapId].time){ // nếu là màn đã tồn tại record và record mới phải có kết quả tốt hơn về số bước hoặc số thời gian
        toast.success("New Record !!")
        const recordId = state.userGameData[record.mapId].id;
        console.log("hehe",state.userGameData[record.mapId]);
        await setDocument(newRecord,recordId);
          // ghi vào kho offline
          if(!error.value){
            console.log("set record success");
            state.userGameData[record.mapId] = {...record, id: recordId};
            console.log(newRecord);
            
          }
      }else{
        console.log("new record is not good enought");
      }

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
