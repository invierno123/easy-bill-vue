<template>
  <Layout class-prefix="layout">
    {{record}}
    <NumberPad :value.sync="record.amount" @submit="saveRecord"/>
    <Types :value.sync="record.types"/>
    <Notes @update:value="updateNotes"/>
    <Tags :data-source.sync="tags" @update:value="updateTags"/>
  </Layout>
</template>

<script lang="ts">
import NumberPad from '@/components/Money/NumberPad.vue';
import Types from '@/components/Money/Types.vue';
import Notes from '@/components/Money/Notes.vue';
import Tags from '@/components/Money/Tags.vue';
import Vue from 'vue';
import {Component, Watch} from 'vue-property-decorator';

type Record = {
  tags: string[];
  types: string;
  notes: string;
  amount: number;

}
@Component({
  components: {Tags, Notes, Types, NumberPad}
})
export default class Money extends Vue {

  tags = ['衣', '食', '住', '行'];
  record: Record={tags:[],notes:'',types:'-',amount:0}
recordList: Record[]=[]
  updateTags(value: string[]) {
    this.record.tags=value
  }

  updateNotes(value: string) {
    this.record.notes=value
  }
  saveRecord(){
    const newRecord=JSON.parse(JSON.stringify(this.record)) //深拷贝,先变成字符串再重新创造一个对象
    this.recordList.push(newRecord);
    console.log(this.recordList);
  }
  @Watch('recordList')
  onRecordListChange(){
    window.localStorage.setItem('recordList',JSON.stringify(this.recordList))
  }
}
</script>

<style lang="scss">
.layout-content {
  border: 1px solid red;
  display: flex;
  flex-direction: column-reverse;
}
</style>
<style lang="scss" scoped>

</style>