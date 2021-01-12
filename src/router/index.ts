/* eslint-disable */
import Vue from 'vue';
import VueRouter, {RouteConfig} from 'vue-router';
// @ts-ignore
import Money from '@/views/Money';
// @ts-ignore
import Labels from '@/views/Labels';
// @ts-ignore
import Statistics from '@/views/Statistics';
import NotFound from '@/views/NotFound.vue';
import EditLabel from '@/views/EditLabel.vue';
Vue.use(VueRouter);

const routes: Array<RouteConfig> = [

  {
    path:'/',
    redirect:'/money'
  },
  {
    path:'/money',
    component:Money
  },
  {
    path:'/labels',
    component:Labels
  },
  {
    path:'/labels/edit',
    component:EditLabel
  },
  {
    path:'/statistics',
    component:Statistics
  },
  {
    path:'*',
    component:NotFound
  }
];

const router = new VueRouter({
  routes
});

export default router;
