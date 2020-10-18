import Vue from "vue";
import Vuex from "vuex";
import API from "../api/api.js";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    andamento_nazionale: [],
    andamento_regionale: [],
    andamento_provinciale: [],
    loading: true,
  },
  mutations: {
    setAndamentoNazionale(state, data) {
      state.andamento_nazionale = data; //Creaty a copy of the array
    },
    setAndamentoRegionale(state, data) {
      state.andamento_regionale = data; //Creaty a copy of the array
    },
    setAndamentoProvinciale(state, data) {
      state.andamento_provinciale = data; //Creaty a copy of the array
    },
    setLoading(state, bool) {
      state.loading = bool;
    },
  },
  actions: {
    getAndamentoNazionale({ commit }) {
      return new Promise((resolve, reject) => {
        axios
          .get("https://covid-19-virus.herokuapp.com/api/andamento_nazionale")
          .then((data) => {
            var newData = data.data;
            //CALCULATE NEW PARAMETER
            //nuovi_casi = totale_casi[today] - totale_casi[yesterday];
            //incremento_deceduti

            newData[0].nuovi_tamponi = newData[0].tamponi;
            newData[0].nuovi_casi = newData[0].totale_casi;
            newData[0].incremento_deceduti = newData[0].deceduti;
            newData[0].incremento_dimessi_guariti = newData[0].dimessi_guariti;
            newData[0].incremento_terapia_intensiva =
              newData[0].terapia_intensiva;
            newData[0].incremento_totale_ospedalizzati =
              newData[0].totale_ospedalizzati;
            newData[0].incremento_isolamento_domiciliare =
              newData[0].isolamento_domiciliare;

            for (var i = 1; i < newData.length; i++) {
              newData[i].rapporto_totale_malati_su_tamponi =
                (newData[i].totale_positivi / newData[i].tamponi) * 100;

              newData[i].nuovi_tamponi =
                newData[i].tamponi - newData[i - 1].tamponi;
              newData[i].nuovi_casi =
                newData[i].totale_casi - newData[i - 1].totale_casi;
              newData[i].incremento_deceduti =
                newData[i].deceduti - newData[i - 1].deceduti;
              newData[i].incremento_dimessi_guariti =
                newData[i].dimessi_guariti - newData[i - 1].dimessi_guariti;
              newData[i].incremento_terapia_intensiva =
                newData[i].terapia_intensiva - newData[i - 1].terapia_intensiva;

              newData[i].incremento_totale_ospedalizzati =
                newData[i].totale_ospedalizzati -
                newData[i - 1].totale_ospedalizzati;

              newData[i].incremento_isolamento_domiciliare =
                newData[i].isolamento_domiciliare -
                newData[i - 1].isolamento_domiciliare;

              newData[i].rapporto_nuovi_casi_su_nuovi_tamponi =
                (newData[i].nuovi_casi / newData[i].nuovi_tamponi) * 100;
            }
            commit("setAndamentoNazionale", newData);
            resolve();
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    getAndamentoRegionale({ commit }) {
      return new Promise((resolve, reject) => {
        axios
          .get("https://covid-19-virus.herokuapp.com/api/andamento_regionale")
          .then((data) => {
            commit("setAndamentoRegionale", data.data);
            resolve();
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    getAndamentoProvinciale({ commit }) {
      return new Promise((resolve, reject) => {
        axios
          .get("https://covid-19-virus.herokuapp.com/api/andamento_provinciale")
          .then((data) => {
            commit("setAndamentoProvinciale", data.data);
            resolve();
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  },
  getters: {
    andamentoNazionale(state) {
      return state.andamento_nazionale;
    },
    an_size(state) {
      return state.andamento_nazionale.length;
    },
    andamentoRegionale(state) {
      return state.andamento_regionale;
    },
    andamentoProvinciale(state) {
      return state.andamento_provinciale;
    },
    loading(state) {
      return state.loading;
    },
  },
});
