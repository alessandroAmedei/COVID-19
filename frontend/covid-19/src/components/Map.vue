<template>
  <v-content style="height: 100%; text-align:center; overflow-y:hidden;">
  <div id="button-wrapper">
         <v-btn style="margin-bottom:10px;" rounded :disabled="this.selected==='regioni'?true:false" @click="regioni()">Regioni</v-btn>
    <v-btn style="margin-bottom:10px;" rounded :disabled="this.selected==='province'?true:false" @click="province()">Province</v-btn>
      </div>
 <!--   <div style="height:100%; width: 100%; padding:10px; text-align:center;"> -->
    
      <l-map
        v-if="showMap"
        :zoom="zoom"
        :center="center"
        :options="mapOptions"
        style="height: 100%; z-index: 0;"
      >
        <l-tile-layer :url="url" :attribution="attribution" />
        <div v-for="(marker,i) in markers" :key="i">
          <!-- <l-marker :lat-lng="marker.latLng">
        <l-popup>
          <div>
            {{marker.text}}
          </div>
        </l-popup>
          </l-marker>-->
          <l-circle
            @click="clikked(marker)"
            :lat-lng="marker.latLng"
            :radius="marker.radius"
            color="#ff0000"
          />
        </div>
      </l-map>
      <v-dialog class="text-center" v-model="dialog" width="500">
        <v-card>
          <v-card-title class="headline grey lighten-2" primary-title>{{region_name}}</v-card-title>

          <v-card-text>
            <br />
            {{region_data}}
          </v-card-text>
        </v-card>
      </v-dialog>
   <!-- </div> -->
  </v-content>
</template>

<script>
import { latLng } from "leaflet";
import {
  LMap,
  LTileLayer,
  LMarker,
  LPopup,
  LTooltip,
  LCircle
} from "vue2-leaflet";

export default {
  name: "Example",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    LTooltip,
    LCircle
  },
  data() {
    return {
      selected: "regioni",
      region_name: "",
      region_data: "",
      dialog: false,
      markers: [],
      zoom: 6,
      center: latLng(41.896644, 12.497675),
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      mapOptions: {
        zoomSnap: 0.5
      },
      showMap: true
    };
  },
  methods: {
    regioni() {
      this.selected = "regioni";
      this.installRegionale();
    },
    province() {
      this.selected = "province";
      this.installProvinciale();
    },
    clikked(el) {
      if (this.selected === "regioni") {
        this.region_name = el.name;
        this.region_data =
          "Totale casi: " +
          el.casi +
          " || " +
          "Incremento positivi: " +
          el.element.variazione_totale_positivi;
        this.dialog = true;
      } else {
        this.region_name = el.name;
        this.region_data = "Totale casi: " + el.casi;
        this.dialog = true;
      }
    },
    async installRegionale() {
      this.markers = [];
      const andamentoRegionale = await this.$store.getters.andamentoRegionale;

      const size = andamentoRegionale.length;
      for (var i = size - 20 - 1; i < size; i++) {
        
        const element = andamentoRegionale[i];
window.console.log(element);
        const base = element.totale_casi; //TODO improve this
        if (base < 1000) base = 2000;
        else if (base < 5000) base = base * 2;

        var obj = {
          latLng: latLng(element.lat, element.long),
          radius: base * 4,
          name: element.denominazione_regione,
          casi: element.totale_casi,
          element: element
        };

        this.markers.push(obj);
      }
    },
    async installProvinciale() {
      this.markers = [];
      const andamentoProvinciale = await this.$store.getters
        .andamentoProvinciale;

      const size = andamentoProvinciale.length;
      const numero_province = 130;
      for (var i = size - numero_province - 1; i < size; i++) {
        const element = andamentoProvinciale[i];

        const base = element.totale_casi; //TODO improve this
        // if (base < 500) base = 2000;
        // else if (base < 5000) base = base * 4;
        base = base * 1.4;
        if (base < 100) base = base * 15;
        else if (base < 500) base = base * 5;
        else if (base > 2000) base = base * 1.3;

        var obj = {
          latLng: latLng(element.lat, element.long),
          radius: base * 4,
          name: element.denominazione_provincia,
          casi: element.totale_casi,
          element: element
        };

        this.markers.push(obj);
      }
    }
  },
  async created() {
    this.installRegionale();
  }
}
</script>
<style>
#button-wrapper {
    position: absolute;
    top: 10px;
    width: 100%;
    z-index: 1;
}
body{
  overflow:hidden;
}
</style>