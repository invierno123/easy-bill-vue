<template>
  <div class="nav-wrapper">
    <div class="content">
     <slot/>
    </div>
    <Nav/>
  </div>
</template>

<script lang="ts">
export default {
name: "Layout"
}
</script>

<style lang="scss" scoped>
.nav-wrapper{
  border: 1px solid #6ac8f0;
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.content{
  overflow: auto;
  border: 1px solid lavenderblush;
  flex-grow: 1;//尽量把所有高度都给content
}
</style>