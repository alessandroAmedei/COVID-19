<template>
    <v-content class="container">
        <v-simple-table>
            <template v-slot:default>
                <thead>
                    <tr>
          <th class="text-left"></th>
          <th class="px-0 text-center">
            2 Aprile 2020
          </th>
          <th class="px-0 text-center">
            Oggi
          </th>
        </tr>
                </thead>
                <tbody>

       <tr>
                        <td>
                            Totale casi
                        </td>
                        <td class="text-left">
                            {{marzo.totale_casi}}
                        </td>
                        <td>
                             {{today.totale_casi}} <span v-html="addSign(today.nuovi_casi)"></span>
                        </td>
                    </tr>

                           <tr>
                        <td>
                            Totale positivi
                        </td>
                        <td class="text-left">
                            {{marzo.totale_positivi}}
                        </td>
                        <td>
                             {{today.totale_positivi}} <span v-html="addSign(today.variazione_totale_positivi)"></span>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            Terapie Intensive
                        </td>
                        <td>
                            {{marzo.terapia_intensiva}}
                        </td>
                        <td>
                             {{today.terapia_intensiva}}  <span v-html="addSign(today.incremento_terapia_intensiva)"/>
                        </td>
                    </tr>

<tr>
                        <td>
                            Totale ospedalizzati
                        </td>
                        <td>
                            {{marzo.totale_ospedalizzati}}
                        </td>
                        <td>
                             {{today.totale_ospedalizzati}} <span v-html="addSign(today.incremento_totale_ospedalizzati)"></span>
                        </td>
                    </tr>

<tr>
                        <td>
                            Isolamento domiciliare
                        </td>
                        <td>
                            {{marzo.isolamento_domiciliare}}
                        </td>
                        <td>
                             {{today.isolamento_domiciliare}} <span v-html="addSign(today.incremento_isolamento_domiciliare)"></span>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            Tamponi
                        </td>
                        <td>
                            {{marzo.tamponi}}
                        </td>
                        <td>
                             {{today.tamponi}} ({{addCharSign(today.nuovi_tamponi)}})
                        </td>
                    </tr>

                           <tr>
                        <td>
                            Rapporto nuovi casi su nuovi tamponi
                        </td>
                        <td>
                            {{Math.round(marzo.rapporto_nuovi_casi_su_nuovi_tamponi*100)/100}}%
                        </td>
                        <td>
                             {{Math.round(today.rapporto_nuovi_casi_su_nuovi_tamponi*100)/100}}%
                        </td>
                    </tr>

                </tbody>
            </template>
        </v-simple-table>
    </v-content>
</template>

<script>
    export default {
        data(){
            return{
                marzo: this.$store.getters.andamentoNazionale[38],//2 aprile
                today: this.$store.getters.andamentoNazionale[this.$store.getters.an_size-1]
            }
        },
        methods:{
            addCharSign(val){
 let sign = Math.sign(val);
                if(sign==1)
                    return '+'+val;
                else if(sign==-1)
                    return '-'+val;
                else 
                    return val;
            },
            addSign(val){
                let sign = Math.sign(val);
                if(sign==1)
                    return '(<span class="red--text">+'+val+'</span>)';
                else if(sign==-1)
                    return '(<span class="green--text">-'+val+'</span>)';
                else 
                    return val;
            }
        }
    }
</script>

<style scoped>
.container{
    max-width: 600px;
    margin: 0 auto;
}
</style>