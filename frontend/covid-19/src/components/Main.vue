<template>
  <v-content>
    <v-container fluid>
      <h2>Andamento Nazionale</h2>
      <br />
      <br />
      <div style="text-align:center">
        <v-combobox
          style="max-width:500px; margin:0 auto;"
          max-width="500"
          v-model="selectedOption"
          :items="optionaGetName()"
          label="Scegli i dati che vuoi visualizzare"
          @change="selectChanged()"
          multiple
          chips
        ></v-combobox>

        <!--
        <v-select
          label="Scegli il dato che vuoi visualizzare"
          style="max-width:500px; margin:0 auto;"
          v-model="selectedOption"
          :items="optiona"
          @change="selectChanged()"
          menu-props="auto"
        ></v-select>
        -->
      </div>
      <br />
      <Chart :style="myStyles" v-if="loaded" :chartdata="chartdata" :options="options" />

      <!-- footer -->
      <br />
      <div absolute class="font-weight-medium">
        <v-col style="font-size:13px;" class="text-center" cols="12">
          <strong>Ultimo aggiornamento</strong>
          — {{lastUpdate}}
          <br />
          <strong>Fonte dati</strong> — Protezione civile
        </v-col>
      </div>
    </v-container>
  </v-content>
</template>
<script>
import Chart from "./Chart.vue";
export default {
  components: {
    Chart
  },
  data: () => ({
    optiona: [
      { name: "totale_casi", color: "#0000ff" },
      { name: "deceduti", color: "#000000" },
      { name: "incremento_deceduti", color: "#707070" },
      { name: "dimessi_guariti", color: "#ff0000" },
      { name: "nuovi_attualmente_positivi", color: "" },
      { name: "nuovi_casi", color: ""},
      { name: "ricoverati_con_sintomi", color: "" },
      { name: "terapia_intensiva", color: "" },
      { name: "totale_ospedalizzati", color: "" },
      { name: "isolamento_domiciliare", color: "" },
      { name: "totale_attualmente_positivi", color: "#ff0000" },
      { name: "tamponi", color: "" }
    ],
    lastUpdate: "",
    loaded: false,
    selectedOption: ["totale_casi"],
    chartdata: {
      labels: [],
      datasets: [
        /*  {
          label: "Casi Totali di Corona Virus",
          backgroundColor: "#10ff50",
          data: []
        }
        */
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  }),
  methods: {
    optionaGetName() {
      var arr = [];
      this.optiona.forEach(obj => {
        arr.push(obj.name);
      });
      return arr;
    },
    optionaGetColor() {
      var arr = [];
      this.optiona.forEach(obj => {
        if (obj.color === "") {
          const letters = "0123456789ABCDEF";
          var color = "#";
          for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
          }
          arr.push(color);
        } else {
          arr.push(obj.color);
        }
      });
      return arr;
    },
    async getDatasFromApi(what) {

      //CAMBIO, HERE WHAT IS AN ARRAY. WE HAVE TO PLOT MULTIPLE GRAPHS.

      this.loaded = false;

      const andamentoNazionale = await this.$store.getters.andamentoNazionale; //SERVIVA SOLO AWAIT??????

      this.chartdata.labels = []; //reset asse x
      this.chartdata.datasets = [];

      andamentoNazionale.forEach(day => {
        this.chartdata.labels.push(day.data.split(" ")[0]); //IMPOSTA LABELS (ASSE X)
      });

      var counter = 0;

      what.forEach(graph => {
        //per ogni tipo di dato selezionato

        //prendi il colore!
        var col = "";
        this.optiona.forEach(obj => {
          //cicli tutte le opzioni e prendi il colore
          if (obj.name === graph) col = obj.color;
        });

        if (col === "") { //se colore non impostato, crealo random
          const letters = "0123456789ABCDEF";
          var col = "#";
          for (var i = 0; i < 6; i++) {
            col += letters[Math.floor(Math.random() * 16)];
          }
        }

        var _datasets = {
          label: graph,
          backgroundColor: col, 
          fill: false,
          borderColor: col,
          data: []
        };

        andamentoNazionale.forEach(day => {
          //qui prendi tutti i dati in un giorno. Inserisci nel dataset quello selezionato
          window.console.log(day[graph]);
          _datasets.data.push(day[graph]);
        });

        this.chartdata.datasets.push(_datasets);

        counter = counter + 1;
      });

      const a = andamentoNazionale[andamentoNazionale.length - 1].data;
      const data = a.split(" ")[0].split("-");
      this.lastUpdate =
        data[2] + "-" + data[1] + "-" + data[0] + " " + a.split(" ")[1];

      this.loaded = true;
    },
    selectChanged() {
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
    this.getDatasFromApi(["totale_casi"]);
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