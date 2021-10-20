const  module = {
    state: {
        Fan_A:{'id':1,name:'反三',rank:'p6',online:true},
        Toni_A:{'id':2,name:'反e',rank:'p8',online:true},
        Loo_A:{'id':3,name:'反t',rank:'p10',online:true},
        UserCount_A:3
    },
    mutations: {
        SET_RANK_A: (state, payload) => state.Fan_A.rank = payload,
        SET_ONLe_A: (state, payload) => state.Fan_A.online = false
    },
    actions: {
        //injectee
        setRank_A:((injectee, payload) => injectee.commit('SET_RANK_A',payload))
    },
    getters:{
        simpleHandle_A:(state) => {
            let rankP = Number(state.Fan_A.rank.replace('p',''))
            let salary = Math.pow(2,rankP - 5) * 20
            return salary + 'w'
        }
    }
}
export  default  module
