<template>
  <Layout class-prefix="layout">

    <NumberPad :value.sync="record.amount" @submit="saveRecord"/>
    <Tabs :data-source="recordTypeList"
          :value.sync="record.types"/>
    <div class="createdAt">
      <EditItem field-name="日期"
                type="date"
                placeholder="在这里输入日期"
                :value.sync="record.createdTime"/>
    </div>
    <hr/>
    <div class="notes">
      <EditItem field-name="备注"
                placeholder="在这里输入备注"
                :value.sync="record.notes"/>
    </div>
    <Tags @update:value="record.tags=$event"/>
  </Layout>
</template>

<script lang="ts">
import NumberPad from '@/components/Money/NumberPad.vue';
import EditItem from '@/components/Money/EditItem.vue';
import Tags from '@/components/Money/Tags.vue';
import Vue from 'vue';
import {Component, Inject} from 'vue-property-decorator';
import recordTypeList from '@/constants/recordTypeList';
import Tabs from '@/components/Tabs.vue';


import {Message} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.component(Message.name, Message);
@Component({
  components: {Tabs, Tags, EditItem, NumberPad},
})
export default class Money extends Vue {

  @Inject('reload') readonly reload!: Function;


  recordTypeList = recordTypeList;
  // recordList = store.recordList;//需要在这里引用出recordList
  record: RecordItem = {tags: [], notes: '', types: '-', amount: 0, createdTime: new Date().toISOString()};

  get recordList() {
    return this.$store.state.recordList;
  }

  updateNotes(value: string) {
    this.record.notes = value;
  }

  created() {
    this.$store.commit('fetchRecords');
  }



  saveRecord() {
    if (!this.record.tags || this.record.tags.length === 0) {
      return Message.warning('请至少选择一个标签');

    }else{
      this.$store.commit('createRecord', this.record);
      this.reload()
      if (this.$store.state.createRecordError === null) {
        Message.success('已添加');
        this.record.notes = '';
      }
    }

  }


}
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}

.notes {
  padding: 8px 0;
}
</style>
<style lang="scss" scoped>

</style>