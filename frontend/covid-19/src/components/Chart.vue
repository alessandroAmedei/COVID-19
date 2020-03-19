<!-- DON'T PUT TEMPLATE TAGS!-->
<script>
import { Line } from 'vue-chartjs'
export default {
  extends: Line,
  props: {
    chartdata: {
      type: Object,
      default: null
    },
    options: {
      type: Object,
      default: null
    }
  },
  mounted () {
    this.renderChart(this.chartdata, this.options)
  },
  watch:{
      'chartdata':{
          handler: function(){
          this._chart.update();
          }
      }
  }
}
</script>