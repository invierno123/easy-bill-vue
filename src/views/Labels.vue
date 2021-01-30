<template>
  <Layout>
    <div class="tags">
      <router-link class="tag" v-for="tag in tags" :key="tag.id"
                   :to="`/labels/edit/${tag.id}`">
        <span>{{ tag.name }}</span>
        <Icon name="right"/>
      </router-link>
    </div>
    <div class="newTag-wrapper">
      <Button class="newTag" @click="createTag">新建标签</Button>
    </div>
  </Layout>
</template>

<script lang="ts">

import {Component} from 'vue-property-decorator';

import TagHelper from '@/mixins/TagHelper';
import {mixins} from 'vue-class-component';


@Component
export default class Labels extends mixins(TagHelper) {
  get tags(){
    return this.$store.state.tagList;
  }
  beforeCreated() {
    this.$store.commit('fetchTags');
  }
}
</script>

<style lang="scss" scoped>
.tags {
  background: white;
  font-size: 16px;

  > .tag {
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #e6e6e6;
  }

  svg {
    color: #666;
    width: 18px;
    height: 18px;
    margin-right: 16px;
  }
}

.newTag {
  background: #767676;
  color: white;
  border-right: 4px;
  border: none;
  height: 40px;
  padding: 0 16px;

  &-wrapper {
    text-align: center;
    padding: 16px;
    margin-top: 44-16px;
  }
}
</style>