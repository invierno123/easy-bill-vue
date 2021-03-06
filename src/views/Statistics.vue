<template>
  <Layout>

    <Tabs class-prefix="type" :data-source=" recordTypeList" :value.sync="typeName"/>
    <div class="chart-wrapper" ref="chartWrapper">
      <Chart :options="getChart" class="chart"/>
    </div>
    <ol v-if="groupedList.length>0">
      <li v-for="(group,index) in groupedList"
          :key="index">
        <h3 class="title">{{ beautify(group.title) }}
          <span>￥{{ group.total }}</span></h3>
        <ol>
          <li v-for="item in group.items"
              class="record"
              :key="item.id">
            <span>{{ tagString(item.tags) }}</span>
            <span class="note">{{ item.notes }}</span>
            <span>￥{{ item.amount }}</span>
          </li>
        </ol>
      </li>
    </ol>
    <div v-else class="no-result">
      目前没有相关记录
    </div>

  </Layout>

</template>


<script lang="ts">

import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Tabs from '@/components/Tabs.vue';

import recordTypeList from '@/constants/recordTypeList';
import dayjs from 'dayjs';
import clone from '@/lib/clone';
import Chart from '@/components/Chart.vue';
import _ from 'lodash';


@Component({
  components: {Tabs, Chart},
})

export default class Statistics extends Vue {

  mounted() {
    const div = (this.$refs.chartWrapper as HTMLDivElement);
    div.scrollLeft = div.scrollWidth;
  }

  tagString(tag: Tag[]) {
    return tag.length === 0 ? '无' : tag.map(t => t.name).join(',');
  }

  beautify(string: string) {
    const day = dayjs(string);
    const now = dayjs();
    if (dayjs(string).isSame(now, 'day')) {
      return '今天';
    } else if (day.isSame(now.subtract(1, 'day'), 'day')) {
      return '昨天';
    } else if (day.isSame(now.subtract(2, 'day'), 'day')) {
      return '前天';
    } else if (day.isSame(now, 'year')) {
      return day.format('M月D日');
    } else {
      return day.format('YYYY年MM月DD日');
    }
  }

  get recordList() {
    return (this.$store.state as RootState).recordList;
  }

  get getArray() {
    const today = new Date();
    const array = [];
    for (let i = 0; i <= 29; i++) {
      const date = dayjs(today).subtract(i, 'day').format('YYYY-MM-DD');
      const found = _.find(this.groupedList, {title: date});
      array.push({date, value: found ? found.total : 0});
    }
    array.sort((a, b) => {
      if (a.date > b.date) {
        return 1;
      } else if (a.date === b.date) {
        return 0;
      } else {
        return -1;
      }
    });
    return array;
  }

  get getChart() {

    const xData = this.getArray.map(item => item.date);
    const yData = this.getArray.map(item => item.value);
    return {
      grid: {
        left: 0,
        right: 0
      },
      tooltip: {
        triggerOn: 'click',
        show: true,
        position: 'top',
        formatter: '{c}'
      },
      xAxis: {
        type: 'category',
        data: xData,
        axisTick: {
          alignWithLabel: true
        },
        axisLabel: {

        }
      },
      yAxis: {
        type: 'value',
        show: false
      },
      series: [{
        symbol: 'circle',
        symbolSize: 12,
        itemStyle: {
          color: '#666'
        },
        data: yData,
        type: 'line',

      }]
    };
  }

  get groupedList() {
    const {recordList} = this;

    const newList = clone(recordList)
        .filter(r => r.types === this.typeName)
        .sort((a, b) => dayjs(b.createdTime).valueOf() - dayjs(a.createdTime).valueOf());
    if (newList.length === 0) {
      return [];
    }
    type Result = { title: string; total?: number; items: RecordItem[] }[]
    const result: Result = [{title: dayjs(newList[0].createdTime).format('YYYY-MM-DD'), items: [newList[0]]}];
    for (let i = 1; i < newList.length; i++) {
      const current = newList[i];
      const last = result[result.length - 1];
      if (dayjs(last.title).isSame(dayjs(current.createdTime), 'day')) {
        last.items.push(current);
      } else {
        result.push({title: dayjs(current.createdTime).format('YYYY-MM-DD'), items: [current]});
      }
    }
    result.map(group => {
      group.total = group.items.reduce((sum, item) => sum + item.amount, 0);
    });
    return result;
  }

  beforeCreate() {
    this.$store.commit('fetchRecords');
  }

  typeName = '-';
  recordTypeList = recordTypeList;

}
</script>

<style scoped lang="scss">

.chart {

  height: 400px;
  width: 420%;

  &-wrapper {
    overflow: auto;

    &::-webkit-scrollbar {
      display: none;
    }
  }
}

%item {
  padding: 8px 16px;
  line-height: 24px;
  display: flex;
  justify-content: space-between;
  align-content: center;
}

.note {
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

.no-result {
  padding: 16px;
  text-align: center;
}

::v-deep {
  .tabList-tabs-item {
    height: 48px;
  }

  .type-tabs-item {
    background: #c4c4c4;

    &.selected {
      background: white;

      &::after {
        display: none;
      }
    }
  }
}
</style>