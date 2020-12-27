<template>
  <nav>
    <router-link to="/money" class="item">
      <Icon name="money bag"/>
      记账
    </router-link>
    <router-link to="/labels" class="item">
      <Icon name="Label"/>
      标签
    </router-link>
    <router-link to="/statistics" class="item">
      <Icon name="statistics"/>
      统计
    </router-link>
  </nav>
</template>
<script lang="ts">
// const importAll=(requireContext: __WebpackModuleApi.RequireContext)=>requireContext.keys().forEach(requireContext);
// try {
//   importAll(require.context('../assets/icons',true,/\.svg$/));
// } catch (error){
//   console.log(error)
// }

// import x from '@/assets/icons/Label.svg';
//
// console.log(x);


export default {
  name: 'Nav'
};
</script>

<style lang="scss" scoped>

nav {
  display: flex;
  box-shadow: 0 0 3px rgba(0, 0, 0.25);
  flex-direction: row;
  font-size: 12px;

  > .item {
    padding: 2px 0;
    width: 33.3333%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .icon {
      width: 32px;
      height: 32px;
    }
  }
}
</style>