<template>
<v-content>
<br>
<div v-for="(item,i) in items" :key="i">
<v-card  max-width="500" elevation="12" class="card">
    <v-container fluid>
        <v-row align="center" justify="center">
            <v-col cols="9">
  <v-card-title>
      {{item.title}}
    </v-card-title>
    <v-card-subtitle>
                {{item.text}}
    </v-card-subtitle>
    <v-card-text>
    </v-card-text>
            </v-col>
            <v-col cols="3">

     <img width="100" :src="item.img" />
            </v-col>
        </v-row>
    </v-container>
</v-card>
<br>
</div>
</v-content>
</template>
<script>
export default{
    data(){
        return{
        items:[
            {
                title:'1. Lavaggio delle mani',
                text:'Lavati spesso le mani con acqua e sapone o usa un gel a base alcolica',
                img: require('../assets/1.png')
            },
            {
                title:'2. Distanza di sicurezza ',
                text:'Evita contatti ravvicinati mantenedo la distanza di almeno un metro!',
                img: require('../assets/2.png')
            },
            {
                title:'3.',
                text:'Evita contatti ravvicinati mantenedo la distanza di almeno un metro!',
                img: require('../assets/3.png')
            },
            {
                title:'4.',
                text:'Non toccarti occhi, naso e bocca con le mani',
                img: require('../assets/4.png')
            },
                        {
                title:'5.',
                text:'Evita le strette di mano e gli abbracci fino a quando questa emergenza sarà finita',
                img: require('../assets/5.png')
            },
             {
                title:'6.',
                text:'Copri bocca e naso con fazzoletti monouso quando starnutisci o tossisci. Altrimenti usa la piega del gomito.',
                img: require('../assets/6.png')
            },
            {
                title:'7. In caso di sintomi',
                text:'Se hai sintomi simili all\'influenza resta a casa, non recarti al pronto soccorso o presso gli studi medici, ma contatta il medico di medicina generale, i pediatri di libera scelta, la guardia medica o i numeri regionali',
                img: require('../assets/7.png')
            },

            
        ]
            }
        }
}
</script>
<style>
.card{
    margin: 0 auto;
}
</style>