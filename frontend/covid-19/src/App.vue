<template>
<v-app>
  <Navbar v-if="!loading"></Navbar>
  <router-view v-if="!loading"> </router-view>
  <Splash v-if="loading"></Splash>

  <br>
  <br>
  <!--<footer style="text-align:center;">
  <p>Creato da: Alessandro Amedei</p>
  <p>Contatto: <a href="mailto:alessandroamedei18@gmail.com">
  email</a></p>
  <p>Fonte dati: <a href="https://github.com/pcm-dpc/COVID-19">Protezione Civile</a> </p>
</footer>-->
</v-app>
</template>
<script>
import Navbar from '@/views/Navbar.vue';
import Splash from '@/views/Splash.vue';
export default{
  components: { Navbar, Splash },
  computed:{
    loading(){
      return this.$store.getters.loading;
    }
  }
}
</script>