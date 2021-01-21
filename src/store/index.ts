import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);//把store绑到Vue.prototype上

const store = new Vuex.Store({
  state: {//data
    count: 0,
  },
  mutations: {//methods
increment(){
  store.state.count+=1
}
  }

});
export default store;