<template>
  <nav>
    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <span class="font-weight-light">PANDEMIA COVID-19,</span>
        <span>ITALIA</span>
      </v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app class="indingo">
      <v-list dense nav>
        <v-subheader class="font-dark">MENU</v-subheader>
        <v-list-item-group color="primary">
          <v-list-item v-for="(item, i) in items" :key="i" :to="item.route">
            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>
<script>
export default {
  data() {
    return {
      drawer: false,
      items: [
        { icon: "mdi-home", text: "Andamento Nazionale", route: "/" },
        { icon: "mdi-home", text: "Andamento Regionale", route: "/main2" },
        { icon: "mdi-home", text: "Questionario", route: "/questionario" },
        { icon: "person", text: "Mappa", route: "/map" },
        {
          icon: "mdi-home",
          text: "Autodichiarazione online",
          route: "/autodichiarazione"
        },
        { icon: "person", text: "Norme da attuare", route: "/norme" },
        {
          icon: "mdi-home",
          text: "Disposizioni del governo",
          route: "/governo"
        },
        { icon: "mdi-home", text: "Numeri utili", route: "/numeriutili" },
        { icon: "mdi-home", text: "Info App", route: "/infoapp" }
      ]
    };
  }
};
</script>