<template>
<v-content>
        <v-container fluid>
            <h2>Numeri utili</h2>
<br>
<br>
<h2>Numero di pubblica utilità del Ministero della Salute</h2>

 <v-card class="card" max-width="500">
        <v-card-title>
            1500
        </v-card-title>
        <v-card-subtitle>
        </v-card-subtitle>
    </v-card>
<br>
<br>
<h2>Numeri utili delle regioni</h2>

<div v-for="(item,i) in items" :key="i">
    <v-card class="card" max-width="500">
        <v-card-title>
            {{item.regione}}
        </v-card-title>
        <v-card-subtitle>
            <b>{{item.numero}}</b>
        </v-card-subtitle>
    </v-card>
    <br>
</div>
<br>
<h2>Numero unico di emergenza</h2>

 <v-card class="card" max-width="500">
        <v-card-title>
        Contattare 112 oppure il 118 se necessario
        </v-card-title>
        <v-card-subtitle>
        </v-card-subtitle>
    </v-card>
<br>
        </v-container>
</v-content>
</template>
<script>
export default{
    data(){
    return{
        items:[
            {
                regione:'Veneto: 800 462 340',
                numero:'',
                numero2:''
            },
            {
                regione:'Val D\'Aosta: 800 122 121',
                numero:'',
                numero2:''
            },
            {
                regione:'Toscana: 800 55 60 60',
                numero:'',
                numero2:''
            },
            {
                regione:'Umbria: 800 63 63 63',
                numero:'',
                numero2:''
            },
            {
                regione:'Sicilia: 800 45 87 87',
                numero:'',
                numero2:''
            },
            {
                regione:'Sardegna: 800 311 377',
                numero:'',
                numero2:''
            },
            {
                regione:'Puglia: 800 713 931',
                numero:'',
                numero2:''
            },
            {
                regione:'Prov. di Bolzano: 800 751 751',
                numero:'',
                numero2:''
            },
            {
                regione:'Prov. di Trento: 800 867 388',
                numero:'',
                numero2:''
            },
            {
                regione:'Lombardia: 800 89 45 45',
                numero:'',
                numero2:''
            },
            {
                regione:'Lazio: 800 11 88 00',
                numero:'',
                numero2:''
            },
            {
                regione:'Friuli Ven. Giulia: 800 500 300',
                numero:'',
                numero2:''
            },
            {
                regione:'Emilia-Romagna: 800 033 033',
                numero:'',
                numero2:''
            },
            {
                regione:'Campania: 800 90 96 99',
                numero:'',
                numero2:''
            },
            {
                regione:'Calabria: 800 76 76 76',
                numero:'',
                numero2:''
            },
            {
                regione:'Basilicata: 800 99 66 88 ',
                numero:'',
                numero2:''
            },
            {
                regione:'Friuli Venezia Giulia: 800 500 300',
                numero:'',
                numero2:''
            },
            {
                regione:'Marche: 800 93 66 77',
                numero:'',
                numero2:''
            },
            {
                regione:'Piemonte: 800 19 20 20',
                numero:'',
                numero2:''
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