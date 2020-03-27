<template>
  <v-content>
    <v-container fluid>
      <h2>Andamento Regionale</h2>
      <br />
      <br />
      <div style="text-align:center">
        <v-combobox
          style="max-width:500px; margin:0 auto;"
          max-width="500"
          :clearable="clearable"
          v-model="selectedOption_regioni"
          :items="optiona_regioni"
          label="Scegli le regioni"
          @change="selectChanged()"
          multiple
          chips
        ></v-combobox>
        <v-combobox
          style="max-width:500px; margin:0 auto;"
          max-width="500"
          :clearable="clearable"
          v-model="selectedOption"
          :items="optionaGetName()"
          label="Scegli i dati che vuoi visualizzare"
          @change="selectChanged()"
          multiple
          chips
        ></v-combobox>

        <!--
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
import Chart from "../components/Chart.vue";
export default {
  components: {
    Chart
  },
  data: () => ({
    optiona: [
      { name: "totale_casi", color: "#0000ff" },
      { name: "deceduti", color: "#000000" },
      //{ name: "incremento_deceduti", color: "#707070" },
      { name: "dimessi_guariti", color: "#00ff00" },
      //{ name: "incremento_dimessi_guariti", color: "#50BB50" },
      //{ name: "nuovi_casi", color: "#ff7f50" },
      { name: "nuovi_attualmente_positivi", color: "#BB5055" },
      { name: "ricoverati_con_sintomi", color: "" },
      { name: "terapia_intensiva", color: "#7f00ff" },
      { name: "totale_ospedalizzati", color: "" },
      { name: "isolamento_domiciliare", color: "" },
      { name: "totale_attualmente_positivi", color: "#ff0000" },
      { name: "tamponi", color: "" }
    ],
    clearable: true,
    optiona_regioni: [
      "Valle d'Aosta",
      "Piemonte",
      "Liguria",
      "Lombardia",
      "P.A. Trento",
      "P.A. Bolzano",
      "Veneto",
      "Friuli Venezia Giulia",
      "Emilia Romagna",
      "Toscana",
      "Umbria",
      "Marche",
      "Lazio",
      "Abruzzo",
      "Molise",
      "Campania",
      "Puglia",
      "Basilicata",
      "Calabria",
      "Sicilia",
      "Sardegna"
    ],
    lastUpdate: "",
    loaded: false,
    selectedOption: ["totale_casi"],
    selectedOption_regioni: ["Lombardia"],
    chartdata: {
      labels: [],
      datasets: []
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
    async getDatasFromApi(what) {
      this.loaded = false;

      //reset
      this.chartdata.labels = [];
      this.chartdata.datasets = [];

      const andamentoRegionale = await this.$store.getters.andamentoRegionale; //SERVE AWAIT

      //create labels
      andamentoRegionale.forEach(day => {
        if (day.denominazione_regione === "Lombardia")
          this.chartdata.labels.push(day.data.split("T")[0]); //IMPOSTA LABELS (ASSE X)
      });

      const selected_regions = this.selectedOption_regioni;
      const selected_datas = this.selectedOption;
      //new code
      selected_regions.forEach(region => {
        //region ex: Lombardia

        selected_datas.forEach(data => {
          //datatype ex: totale_casi

          //prendi il colore!
          var col = "";
         /* this.optiona.forEach(obj => {
            //cicli tutte le opzioni e prendi il colore
            if (obj.name === data) col = obj.color;
          });
          */

          if (col === "") {
            //se colore non impostato, crealo random
            const letters = "0123456789ABCDEF";
            var col = "#";
            for (var i = 0; i < 6; i++) {
              col += letters[Math.floor(Math.random() * 16)];
            }
          }

          var dataset = {
            label: region + ", " + data,
            backgroundColor: col,
            data: [],
            fill: false,
            borderColor: col
          };

          andamentoRegionale.forEach(dr => {
            if (dr.denominazione_regione === region) {
              //Qui abbiamo dei dati della Lombardia di un giorno
              dataset.data.push(dr[data]);
            }
          });

          this.chartdata.datasets.push(dataset);
        });
      });

      const a = andamentoRegionale[andamentoRegionale.length - 1].data;
      const data = a.split("T")[0].split("-");
      this.lastUpdate =
        data[2] + "-" + data[1] + "-" + data[0] + " " + a.split("T")[1];

      this.loaded = true;
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