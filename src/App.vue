<template>
  <div id="app">
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>
<script lang="ts">
import {Vue, Component, Provide} from 'vue-property-decorator'

@Component({

  name: 'App',

})

export default class extends Vue {
  private isRouterAlive = true
  @Provide('reload')
  reload () {

    this.isRouterAlive = false

    this.$nextTick(() => {

      this.isRouterAlive = true

    })

  }
}
</script>
<style lang="scss">
@import "src/assets/style/helper.scss";
@import "src/assets/style/reset.scss";

body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
  font-size: 16px;
  line-height: 1.5;
  font-family: $font-hei;
  background: #f5f5f5;
}

#app {
  max-width: 500px;
  margin: 0 auto;
}

</style>
