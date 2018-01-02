<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>
<style lang="scss" >
@import 'assets/css/function';
.app-padding {
  padding: px2rem(64px);
}
</style>
<style>
* {
  font-family: pingfang;
}

.containter {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.body-box {
  width: 100%;
  height: 100%;
}

.main-box-body {
  width: 100%;
  height: 0;
  flex-grow: 2;
  overflow-y: auto;
  overflow-x: hidden;
}

.flex-box {
  display: flex;
}

.flex-box.flex-row {
  flex-direction: row;
  align-items: center;
}

.flex-box.layout-center {
  justify-content: center;
}

.flex-box.layout-start {
  justify-content: flex-start;
}

.flex-box.layout-end {
  justify-content: flex-end;
}

.flex-box.flex-col {
  flex-direction: column;
  align-items: center;
}

.flex-box.flex-betwn {
  justify-content: space-between;
}

.flex-box.item-center {
  align-items: center;
}

.center-text {
  text-align: center;
}

@keyframes rotateIn {
  from {
    transform-origin: center;
    transform: rotate3d(0, 0, 1, -200deg);
    opacity: 0;
  }

  to {
    transform-origin: center;
    transform: none;
    opacity: 1;
  }
}

@keyframes rotateOut {
  from {
    transform-origin: center;
    opacity: 1;
  }

  to {
    transform-origin: center;
    transform: rotate3d(0, 0, 1, 200deg);
    opacity: 0;
  }
}
</style>
