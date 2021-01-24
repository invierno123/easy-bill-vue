import Vue from 'vue';
import Vuex from 'vuex';
import clone from '@/lib/clone';
import createId from '@/lib/createId';

Vue.use(Vuex);//把store绑到Vue.prototype上

const store = new Vuex.Store({
  state: {//data
    recordList: [] as RecordItem[],
    tagList: [] as Tag[]
  },
  mutations: {//methods
    fetchRecords(state) {
      state.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]') as RecordItem[];
    },

    createRecord(state, record) {
      const newRecord: RecordItem = clone(record); //深拷贝,先变成字符串再重新创造一个对象
      newRecord.createdTime = new Date();
      state.recordList.push(newRecord);
      //recordStore.saveRecords();
      store.commit('saveRecords');
    },
    saveRecords(state) {
      window.localStorage.setItem('recordList',
        JSON.stringify(state.recordList));
    },
    fetchTags(state) {

      return state.tagList = JSON.parse(window.localStorage
        .getItem('tagList') || '[]');
    },
    createTag(state, name: string) {
      const names = state.tagList.map(item => item.name);
      if (names.indexOf(name) >= 0) {
        window.alert('标签名已存在');
        return 'duplicate';
      }
      const id = createId().toString();
      state.tagList.push({id: id, name: name});
      window.alert('添加成功');
      store.commit('saveTags');
      //.saveTags();

    },
    saveTags(state) {
      window.localStorage.setItem('tagList',
        JSON.stringify(state.tagList));
    }
  }

});
export default store;