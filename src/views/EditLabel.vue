<template>
  <Layout>
    <div class="navBar">
      <Icon class="leftIcon" name="left" @click.native="back"/>
      <span class="title">编辑标签</span>
      <span class="rightIcon"/>
    </div>
    <div class="Edit-Wrapper">
      <EditItem :value="tag.name"
                field-name="标签名"
                @update:value="update"
                placeholder="请输入标签名"/>
    </div>
    <div class="button-wrapper">
      <Button @click="remove">删除标签</Button>
    </div>

  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import EditItem from '@/components/Money/EditItem.vue';


@Component({
  components: {EditItem},
})
export default class EditLabel extends Vue {
 get tag(){
   return this.$store.state.currentTag;
 }
  created() {//注意这里的created函数并不是自定义的,是钩子函数
   const id= this.$route.params.id;
    this.$store.commit('fetchTags');
    this.$store.commit('setCurrentTag',id);

    if(!this.tag){
      this.$router.replace('/404')
    }
  }
  update(name: string) {
    if (this.tag){
     this.$store.commit('updateTag',  {
       id: this.tag.id,name
      })
    }
   //store.updateTag(this.tag.id, name);
  }

  remove() {
    if (this.tag) {
     this.$store.commit('removeTag',this.tag.id)

    }
  }

  back() {
    this.$router.back();
  }
}
</script>

<style lang="scss" scoped>

.navBar {
  text-align: center;
  font-size: 16px;
  padding: 12px 16px;
  background: white;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;

  > .title {

  }

  > .leftIcon {
    width: 24px;
    height: 24px;
  }

  > .rightIcon {
    width: 24px;
    height: 24px;
  }
}

.Edit-Wrapper {
  background: white;
  margin-top: 8px;
}

.button-wrapper {
  text-align: center;
  padding: 16px;
  margin-top: 44-16px;
}
</style>