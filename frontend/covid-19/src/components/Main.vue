<template>
  <v-content>
    <br><br>
<div style="text-align:center">
<v-select label="Scegli il dato che vuoi visualizzare" style="max-width:500px; margin:0 auto;" v-model="selectedOption" :items="optiona" @change="selectChanged()"
 menu-props="auto">

</v-select>
</div>
<br>
<Chart :style="myStyles" v-if="loaded" :chartdata="chartdata" :options="options"/>
  </v-content>
</template>
<script>
import Chart from './Chart.vue'
export default{
  components: {
    Chart
  },
    data: () => ({
    optiona:['totale_casi','deceduti','dimessi_guariti','nuovi_attualmente_positivi','ricoverati_con_sintomi','terapia_intensiva','totale_ospedalizzati','isolamento_domiciliare','totale_attualmente_positivi','tamponi'],
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