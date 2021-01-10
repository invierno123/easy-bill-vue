<template>
  <Layout class-prefix="layout">

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
import {model} from '@/model';



const recordList  = model.fetch()

@Component({
  components: {Tags, Notes, Types, NumberPad}
})
export default class Money extends Vue {
  tags = ['衣', '食', '住', '行'];
  record: RecordItem = {tags: [], notes: '', types: '-', amount: 0};


  updateTags(value: string[]) {
    this.record.tags = value;
  }

  updateNotes(value: string) {
    this.record.notes = value;
  }

  saveRecord() {
    const newRecord: RecordItem = model.clone(this.record); //深拷贝,先变成字符串再重新创造一个对象
    newRecord.createdTime = new Date();
    this.recordList.push(newRecord);
  }

  @Watch('recordList')
  onRecordListChange() {
    model.save(recordList)
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