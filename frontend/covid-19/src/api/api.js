import Vue from 'vue'
import axios from 'axios';

const api = {


    getAndamentoNazionale(){
        return new Promise((resolve,reject)=>{
            axios.get('https://covid-19-virus.herokuapp.com/api/andamento_nazionale')
            .then(data =>{
                window.console.log(data,"dd");
                resolve(data.data);
            });
            reject();
        })
}


}

export default api;