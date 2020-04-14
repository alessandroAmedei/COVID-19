import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../components/Main.vue'
import Main2 from '../views/Main2.vue'
import Questionario from '../views/Questionario.vue'
import Norme from '../views/Norme.vue'
import Governo from '../views/Governo.vue'
import Numeri from '../views/Numeri.vue'
import Info from '../views/Info.vue'
import Autodichiarazione from '../views/Autodichiarazione.vue'
import Map from '../components/Map.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    name: 'Main',
    component: Main
  },
  {
    path: '/main2',
    name: 'Main2',
    component: Main2
  },
  {
    path: '/questionario',
    name: 'Questionario',
    component: Questionario
  },
  {
    path: '/norme',
    name: 'Norme',
    component: Norme
  },
  {
    path: '/governo',
    name: 'Governo',
    component: Governo
  },
  {
    path: '/numeriutili',
    name: 'Numeri',
    component: Numeri
  }, {
    path: '/infoapp',
    name: 'Info',
    component: Info
  },
  {
    path: '/map',
    name: 'Map',
    component: Map
  },
  {
    path: '/autodichiarazione',
    name: 'Autodichiarazione',
    component: Autodichiarazione
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
