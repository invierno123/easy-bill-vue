<template>
  <Layout>

    <Tabs class-prefix="type" :data-source=" recordTypeList" :value.sync="typeName"/>
    <Tabs class-prefix="tabList" :data-source="tabList " :value.sync="tabName"/>
    <div>
      type:{{ typeName }}
      <br/>
      tab:{{ tabName }}
    </div>

    <div>
      <ol>
        <li v-for="(group,index) in result"
            :key="index">
          <h3 class="title">{{ group.title }}</h3>
          <ol>
            <li v-for="item in group.items"
                class="record"
                :key="item.id">
              <span>{{tagString(item.tags)}}</span>
              <span class="note" :style="{marginRight:'auto'}">{{item.notes}}</span>
              <span>￥{{ item.amount }}</span>
            </li>
          </ol>
        </li>
      </ol>
    </div>

  </Layout>

</template>

<style scoped lang="scss">
%item {
  padding: 8px 16px;
  line-height: 24px;
  display: flex;
  justify-content: space-between;
  align-content: center;
}
.note{
  margin-right: auto;
  margin-left: 8px;
  color: #999;
}
.title {
  @extend %item;
}

.record {
  @extend %item;
  background: white;
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
export default class Statistics extends Vue {

  tagString(tag: Tag[]){
    return tag.length===0?'无':tag.join(',')
  }

  get recordList() {
    return (this.$store.state as RootState).recordList;
  }

  get result() {
    const {recordList} = this;

    type HashTableValue = { title: string; items: RecordItem[] }
    const hashTable: { [key: string]: HashTableValue } = {};
    for (let i = 0; i < recordList.length; i++) {

      const [date, time] = recordList[i].createdTime!.split('T');

      hashTable[date] = hashTable[date] || {title: date, items: []};
      hashTable[date].items.push(recordList[i]);
    }
    console.log(hashTable);
    return hashTable;
  }

  beforeCreate() {
    this.$store.commit('fetchRecords');
  }

  typeName = '-';
  tabName = 'day';
  tabList = tabList;
  recordTypeList = recordTypeList;

}
</script>

<style scoped lang="scss">
::v-deep {
  .tabList-tabs-item {
    height: 48px;
  }

  .type-tabs-item {
    background: white;

    &.selected {
      background: #c4c4c4;

      &::after {
        display: none;
      }
    }
  }
}
</style>