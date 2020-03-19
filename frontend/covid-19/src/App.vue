<template>
<Chart :chartdata="chartdata" :options="options"/>
</template>
<script>
import Chart from './components/Chart.vue'
export default{
  components: {
    Chart
  },
    data: () => ({
    chartdata: {
      labels: ['January', 'February',4,3,5,7,4,4,7,45,4],
      datasets: [
        {
          label: 'Data One',
          backgroundColor: '#f87979',
          data: [40, 20,4,3,6,8,5,3,6,8,6]
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  }),
  mounted(){
    this.axios.get('https://covid-19-virus.herokuapp.com/api/andamento_nazionale')
    .then(datas =>{
      datas.forEach(element => {
        window.console.log(element)
      });
    })
  }
}
</script>