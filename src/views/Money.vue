<template>
  <Layout class-prefix="layout">
    {{record}}
    <NumberPad :value.sync="record.amount"/>
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
import {Component} from 'vue-property-decorator';

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

  updateTags(value: string[]) {
    this.record.tags=value
  }

  updateNotes(value: string) {
    this.record.notes=value
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