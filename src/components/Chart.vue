<template>
  <div class="wrapper" ref="wrapper">chart</div>
</template>
<script lang="ts">
import {Component,Prop,Vue} from 'vue-property-decorator';
import echarts,{EChartOption} from 'echarts';
@Component
export default class extends Vue{
  @Prop() options?: EChartOption
  mounted(){
    console.log(this.options);
    const chart=echarts.init(this.$refs.wrapper as HTMLDivElement)
    if (this.options===undefined){return console.log('options 为空')}
    chart.setOption(this.options)
  }
}

</script>
<style>

</style>