import Vue from 'vue';
import Vuex from 'vuex';
import clone from '@/lib/clone';

Vue.use(Vuex);//把store绑到Vue.prototype上

const store = new Vuex.Store({
  state: {//data
    recordList: [] as RecordItem[]
  },
  mutations: {//methods
    fetchRecords(state) {
      state.recordList=JSON.parse(window.localStorage.getItem('recordList') || '[]') as RecordItem[]
    },

    createRecord(state, record) {
      const newRecord: RecordItem = clone(record); //深拷贝,先变成字符串再重新创造一个对象
      newRecord.createdTime = new Date();
      state.recordList.push(newRecord);
      //recordStore.saveRecords();
      store.commit('saveRecords');
    },
    saveRecords(state) {
      window.localStorage.setItem("recordList",
        JSON.stringify(state.recordList));
    },
  }

});
export default store;