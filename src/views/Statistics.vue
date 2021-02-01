<template>
<Layout>

  <Tabs class-prefix="type" :data-source=" recordTypeList" :value.sync="typeName"/>
  <Tabs class-prefix="interval" :data-source="tabList " :value.sync="tabName"/>
</Layout>

</template>
<style scoped lang="scss">
::v-deep  .type-tabs-item{
background: white ;
  &.selected{
    background: #c4c4c4;
    &::after{
      display: none;
    }
  }
}
</style>
<script lang="ts">

import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Tabs from '@/components/Tabs.vue';
import tabList from '@/constants/tabList';
import recordTypeList from '@/constants/recordTypeList';

@Component({
  components: {Tabs},
})
export default class Statistics extends Vue{
 typeName= '-';
 tabName='day';
  tabList=tabList;
  recordTypeList=recordTypeList;

}
</script>

<style lang="scss" scoped>

</style>