<template>
  <Layout>
    编 辑
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import {tagListModel} from '@/models/tagListModel';

@Component
export default class EditLabel extends Vue {
  created() {//注意这里的created函数并不是自定义的,是钩子函数
    const id = this.$route.params.id;
    tagListModel.fetch();
    const tags=tagListModel.data;
    const tag=tags.filter(t=>t.id===id)[0];
    if(tag){
      console.log(tag);
    }else{
      this.$router.replace('/404');//为了路径返回用replace而不用push
    }
  }
}
</script>

<style lang="scss" scoped>

</style>