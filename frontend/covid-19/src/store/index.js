import Vue from 'vue'
import Vuex from 'vuex'
import API from '../api/api.js'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    andamento_nazionale: [],
    andamento_regionale: [],
  },
  mutations: {
    setAndamentoNazionale(state, data) {
      state.andamento_nazionale = data; //Creaty a copy of the array
    },
    setAndamentoRegionale(state, data) {
      state.andamento_regionale = data; //Creaty a copy of the array
    }
  },
  actions: {
    getAndamentoNazionale({ commit }) {
      return new Promise((resolve, reject) => {
        axios.get('https://covid-19-virus.herokuapp.com/api/andamento_nazionale')
          .then(data => {
            var newData = data.data;
            //CALCULATE NEW PARAMETER
            //nuovi_casi = totale_casi[today] - totale_casi[yesterday];
            //incremento_deceduti
            newData[0].nuovi_casi = newData[0].totale_casi;
            newData[0].incremento_deceduti = newData[0].deceduti;
            newData[0].incremento_dimessi_guariti = newData[0].dimessi_guariti;

            for (var i = 1; i < newData.length; i++) {
              newData[i].nuovi_casi = newData[i].totale_casi - newData[i - 1].totale_casi;
              newData[i].incremento_deceduti = newData[i].deceduti - newData[i - 1].deceduti;
              newData[i].incremento_dimessi_guariti = newData[i].dimessi_guariti - newData[i - 1].dimessi_guariti;
            }
            commit('setAndamentoNazionale', newData);
            resolve();
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    getAndamentoRegionale({ commit }) {
      return new Promise((resolve, reject) => {
        axios.get('https://covid-19-virus.herokuapp.com/api/andamento_regionale')
          .then(data => {
            commit('setAndamentoRegionale', data.data);
            resolve();
          })
          .catch(err => {
            reject(err);
          });
      });
    }
  },
  getters: {
    andamentoNazionale(state) {
      return state.andamento_nazionale;
    },
    andamentoRegionale(state) {
      return state.andamento_regionale;
    }
  }
})
