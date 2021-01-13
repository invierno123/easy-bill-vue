<template>
  <Layout>
    <div class="navBar">
      <Icon class="leftIcon" name="left"/>
      <span class="title">编辑标签</span>
      <span class="rightIcon"></span>
    </div>
    <div class="Edit-Wrapper">
      <EditItem field-name="标签名" placeholder="请输入标签名"/>
    </div>
    <div class="button-wrapper">
      <Button>删除标签</Button>
    </div>

  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import {tagListModel} from '@/models/tagListModel';
import EditItem from '@/components/Money/EditItem.vue';
@Component({
  components: {EditItem}
})
export default class EditLabel extends Vue {
  created() {//注意这里的created函数并不是自定义的,是钩子函数
    const id = this.$route.params.id;
    tagListModel.fetch();
    const tags=tagListModel.data;
    const tag=tags.filter(t=>t.id===id)[0];
    if(tag){
      console.log(tag);
    }else{
      this.$router.replace('/404');//为了路径返回用replace而不用push
    }
  }
}
</script>

<style lang="scss" scoped>

.navBar{
  text-align: center;
  font-size: 16px;
  padding: 12px 16px;
  background: white;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  > .title{

  }
  > .leftIcon{
    width: 24px;
    height: 24px;
  }
  > .rightIcon{
    width: 24px;
    height: 24px;
  }
}
.Edit-Wrapper{
  background: white;
  margin-top: 8px;
}
.button-wrapper{
  text-align: center;
  padding: 16px;
  margin-top: 44-16px;
}
</style>