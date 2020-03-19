import Vue from 'vue'
import Vuex from 'vuex'
import API from '../api/api.js'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    andamento_nazionale:[]
  },
  mutations: {
    setAndamentoNazionale(state,data){
      state.andamento_nazionale = data; //Creaty a copy of the array
    }
  },
  actions: {
      getAndamentoNazionale({commit}){
        return new Promise((resolve,reject)=>{
          axios.get('https://covid-19-virus.herokuapp.com/api/andamento_nazionale')
          .then(data =>{
            commit('setAndamentoNazionale', data.data);
            resolve();
        })
        .catch(err=>{
            reject(err);
        });
        });
    }
  },
  getters:{
    andamentoNazionale(state){
      return state.andamento_nazionale;
    }
  }
})
