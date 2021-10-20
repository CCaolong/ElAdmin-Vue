import Vue from 'vue'
import Vuex from 'vuex'
import module from "./ModuleA";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    fan:{'id':1,name:'反三',rank:'p6',online:true},
    toni:{'id':2,name:'反e',rank:'p8',online:true},
    loo:{'id':3,name:'反t',rank:'p10',online:true},
    userCount:3
  },
  mutations: {
    SET_RANK: (state, payload) => state.fan.rank = payload,
    SET_ONLe: (state, payload) => state.fan.online = false
  },
  actions: {
    //injectee
    setRank:((injectee, payload) => injectee.commit('SET_RANK',payload))
  },
  getters:{
    simpleHandle:(state) => {
      let rankP = Number(state.fan.rank.replace('p',''))
      let salary = Math.pow(2,rankP - 5) * 20
      return salary + 'w'
    }
  },
  modules: {
    module

  }
})
