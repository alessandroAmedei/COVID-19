<template>
  <v-content>
    <v-container fluid>
      <h2>Andamento Regionale</h2>
      <br />
      <br />
      <div style="text-align:center">
          <v-select
          label="Scegli la regione"
          style="max-width:500px; margin:0 auto;"
          v-model="selectedOption_regioni"
          :items="optiona_regioni"
          @change="selectChanged()"
          menu-props="auto"
        ></v-select>
        <v-select
          label="Scegli il dato che vuoi visualizzare"
          style="max-width:500px; margin:0 auto;"
          v-model="selectedOption"
          :items="optiona"
          @change="selectChanged_regioni()"
          menu-props="auto"
        ></v-select>
      </div>
      <br />
      <Chart :style="myStyles" v-if="loaded" :chartdata="chartdata" :options="options" />

      <!-- footer -->
      <br />
      <div absolute class="font-weight-medium">
        <v-col style="font-size:13px;" class="text-center" cols="12">
          <strong>Ultimo aggiornamento</strong>
          — {{lastUpdate}} <br>
          <strong>Fonte dati</strong> — Protezione civile
        </v-col>
      </div>
    </v-container>
  </v-content>
</template>
<script>
import Chart from "../components/Chart.vue";
export default {
  components: {
    Chart
  },
  data: () => ({
    optiona: [
      "totale_casi",
      "deceduti",
      "dimessi_guariti",
      "nuovi_attualmente_positivi",
      "ricoverati_con_sintomi",
      "terapia_intensiva",
      "totale_ospedalizzati",
      "isolamento_domiciliare",
      "totale_attualmente_positivi",
      "tamponi"
    ],
    optiona_regioni: [
        'Valle d\'Aosta',
        'Piemonte',
        'Liguria',
        'Lombardia',
        'P.A. Trento',
        'P.A. Bolzano',
        'Veneto',
        'Friuli Venezia Giulia',
        'Emilia Romagna',
        'Toscana',
        'Umbria',
        'Marche',
        'Lazio',
        'Abruzzo',
        'Molise',
        'Campania',
        'Puglia',
        'Basilicata',
        'Calabria',
        'Sicilia',
        'Sardegna'
    ],
    lastUpdate: "",
    loaded: false,
    selectedOption: "totale_casi",
    selectedOption_regioni: "Lombardia",
    chartdata: {
      labels: [],
      datasets: [
        {
          label: "Casi Totali di Corona Virus",
          backgroundColor: "#10ff50",
          data: []
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  }),
  methods: {
    async getDatasFromApi(what) {
      window.console.log(what);
      this.loaded = false;

      // await this.$store.dispatch("getAndamentoNazionale").then(()=>{

      //   const andamentoNazionale = this.$store.state.andamento_nazionale;

      const andamentoRegionale = await this.$store.getters.andamentoRegionale; //SERVE AWAIT

        window.console.log(andamentoRegionale);
      this.chartdata.labels = [];
      this.chartdata.datasets[0].data = [];
      this.chartdata.datasets[0].label = what + ' , ' + this.selectedOption_regioni;

      andamentoRegionale.forEach(day => { //Qui cicla tutto ogni volta..
        const region = day.denominazione_regione;
        if(region === this.selectedOption_regioni){
        this.chartdata.labels.push(day.data.split(" ")[0]);
        this.chartdata.datasets[0].data.push(day[what]);
        }
      });

      const a = andamentoRegionale[andamentoRegionale.length - 1].data;
      const data = a.split(" ")[0].split("-");
      this.lastUpdate =
        data[2] + "-" + data[1] + "-" + data[0] + " " + a.split(" ")[1];

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
    selectChanged() {
      this.getDatasFromApi(this.selectedOption);
    },
    selectChanged_regioni() {
      this.getDatasFromApi(this.selectedOption);
    }
  },
  computed: {
    myStyles() {
      return {
        "max-width": "800px",
        margin: "0 auto"
      };
    }
  },
  created() {
    this.getDatasFromApi("totale_casi");
  }
};
</script>
<style>
h2 {
  text-align: center;
}
h3 {
  text-align: center;
}
h4 {
  text-align: center;
}
select {
  width: 400px;
  margin: 0 auto;
}
</style>