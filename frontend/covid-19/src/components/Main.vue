<template>
<div>
<h2>Pandemia di COVID-19 in Italia</h2>
<h3>Andamento Nazionale</h3>
<h4>Ultimo aggiornamento : {{lastUpdate}}</h4>
<br>
<div style="text-align:center">
<select v-model="selectedOption" @change="selectChanged()">
  <option value="totale_casi">Totale Casi</option>
  <option value="deceduti">Deceduti</option>
  <option value="dimessi_guariti">Dimessi Guariti</option>
  <option value="nuovi_attualmente_positivi">Nuovi attualmente positivi</option>
  <option value="ricoverati_con_sintomi">Ricoverati con sintomi</option>
  <option value="terapia_intensiva">Terapia Intensiva</option>
  <option value="totale_ospedalizzati">Totale ospedalizzati</option>
  <option value="isolamento_domiciliare">Isolamento domiciliare</option>
  <option value="totale_attualmente_positivi">Totale attualmente positiv</option>
  <option value="tamponi">Tamponi</option>
</select>
</div>
<br>
<Chart :style="myStyles" v-if="loaded" :chartdata="chartdata" :options="options"/>
</div>
</template>
<script>
import Chart from './Chart.vue'
export default{
  components: {
    Chart
  },
    data: () => ({
    lastUpdate: '',
    loaded: false,
    selectedOption: 'totale_casi',
    chartdata: {
      labels: [],
      datasets: [
        {
          label: 'Casi Totali di Corona Virus',
          backgroundColor: '#10ff50',
          data: []
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  }),
  methods:{
     async getDatasFromApi(what){

      window.console.log(what);
                  this.loaded = false;

     // await this.$store.dispatch("getAndamentoNazionale").then(()=>{


     //   const andamentoNazionale = this.$store.state.andamento_nazionale;

     const andamentoNazionale = await this.$store.getters.andamentoNazionale; //SERVIVA SOLO AWAIT??????

      this.chartdata.labels=[];
      this.chartdata.datasets[0].data=[];
      this.chartdata.datasets[0].label=what;

      andamentoNazionale.forEach(day => {
        this.chartdata.labels.push(day.data.split(' ')[0]);
        this.chartdata.datasets[0].data.push(day[what]);
      });

      this.lastUpdate = andamentoNazionale[andamentoNazionale.length-1].data;

      this.loaded = true;


    //  });//this.$store.getters.andamentoNazionale();
      

     /* 
      this.loaded = false;
      this.chartdata.labels = [];
      this.chartdata.datasets[0].data = [];
          this.axios.get('https://covid-19-virus.herokuapp.com/api/andamento_nazionale')
    .then(data =>{
      data.data.forEach(day => {
        this.chartdata.labels.push(day.data.split(' ')[0]);
        this.chartdata.datasets[0].data.push(day[what]);
      });
      this.loaded = true;
      //here render
    });
    },
    selectChanged(){
      if(this.selectedOption=='')
        return;
      this.getDatasFromApi(this.selectedOption);
    }
    */
  },
      selectChanged(){

      this.getDatasFromApi(this.selectedOption);
    }
  },
    computed: {
    myStyles () {
      return {
        'max-width':'800px',
        margin:'0 auto'
      }
    }
  },
  created(){
    this.getDatasFromApi('totale_casi');
  }
}
</script>
<style>
h2{
  text-align: center;
}
h3{
  text-align: center;
}
h4{
  text-align: center;
}
select { width: 400px; 
margin: 0 auto; }
</style>