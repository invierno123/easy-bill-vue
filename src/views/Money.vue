<template>
  <Layout class-prefix="layout">

    <NumberPad :value.sync="record.amount" @submit="saveRecord"/>
    <Types :value.sync="record.types"/>
    <div class="notes">
      <EditItem field-name="备注"
                placeholder="在这里输入备注"
                @update:value="updateNotes"/>
    </div>

    <Tags/>
  </Layout>
</template>

<script lang="ts">
import NumberPad from '@/components/Money/NumberPad.vue';
import Types from '@/components/Money/Types.vue';
import EditItem from '@/components/Money/EditItem.vue';
import Tags from '@/components/Money/Tags.vue';
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import store from '@/store/newIndex';



@Component({
  components: {Tags, EditItem, Types, NumberPad}
})
export default class Money extends Vue {

  recordList = store.recordList;//需要在这里引用出recordList
  record: RecordItem = {tags: [], notes: '', types: '-', amount: 0};



  updateNotes(value: string) {
    this.record.notes = value;
  }

  saveRecord() {
    store.createRecord(this.record);
  }


}
</script>

<style lang="scss">
.layout-content {
  border: 1px solid red;
  display: flex;
  flex-direction: column-reverse;
}

.notes {
  padding: 12px 0;
}
</style>
<style lang="scss" scoped>

</style>