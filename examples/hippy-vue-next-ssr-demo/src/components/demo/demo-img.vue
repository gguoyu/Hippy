<template>
  <div id="demo-img">
    <div id="demo-img-container">
      <label>Contain:</label>
      <img
        alt=""
        src="https://user-images.githubusercontent.com/12878546/148736102-7cd9525b-aceb-41c6-a905-d3156219ef16.png"
        :placeholder="defaultImage"
        class="image contain"
        @touchstart="onTouchStart"
        @touchmove="onTouchMove"
        @touchend="onTouchEnd"
      >
      <label>Cover:</label>
      <img
        alt=""
        :placeholder="defaultImage"
        src="https://user-images.githubusercontent.com/12878546/148736102-7cd9525b-aceb-41c6-a905-d3156219ef16.png"
        class="image cover"
      >
      <label>Center:</label>
      <img
        alt=""
        :placeholder="defaultImage"
        src="https://user-images.githubusercontent.com/12878546/148736102-7cd9525b-aceb-41c6-a905-d3156219ef16.png"
        class="image center"
      >
      <label>CapInsets:</label>
      <img
        :placeholder="defaultImage"
        src="https://user-images.githubusercontent.com/12878546/148736102-7cd9525b-aceb-41c6-a905-d3156219ef16.png"
        class="image cover"
        :capInsets="{
          top: 50,
          left: 50,
          bottom: 50,
          right: 50,
        }"
      >
      <label>TintColor:</label>
      <img
        :src="hippyLogoImage"
        class="image center tint-color"
      >
      <label>Gif:</label>
      <img
        v-if="isMounted"
        alt=""
        :placeholder="defaultImage"
        src="https://user-images.githubusercontent.com/12878546/148736255-7193f89e-9caf-49c0-86b0-548209506bd6.gif"
        class="image cover"
        @load="onLoad"
      >
      <div class="img-result">
        <p>Load Result: {{ gifLoadResult }}</p>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from '@vue/runtime-core';

import defaultImage from '../../assets/defaultSource.jpg';
import hippyLogoImage from '../../assets/hippyLogoWhite.png';

export default defineComponent({
  setup() {
    const isMounted = ref(false);
    // img touch event is supported after hippy-vue 2.6.2
    const onTouchStart = (evt: Event) => {
      console.log('onTouchDown', evt);
      evt.stopPropagation();
    };
      // img touch event is supported after hippy-vue 2.6.2
    const onTouchMove = (evt: Event) => {
      console.log('onTouchMove', evt);
      evt.stopPropagation();
      console.log(evt);
    };
      // img touch event is supported after hippy-vue 2.6.2
    const onTouchEnd = (evt: Event) => {
      console.log('onTouchEnd', evt);
      evt.stopPropagation();
      console.log(evt);
    };
    const onLoad = (evt: Event) => {
      console.log('onLoad', evt);
      const { width, height, url } = evt;
      gifLoadResult.value = {
        width,
        height,
        url,
      };
    };

    const gifLoadResult = ref({});

    onMounted(() => {
      // In SSR, node event will be bind at client bundle side, you should make img load
      // in mounted lifecycle.
      // You don't need this if you don't want to use SSR.
      isMounted.value = true;
    });

    return {
      defaultImage,
      hippyLogoImage,
      gifLoadResult,
      isMounted,
      onTouchEnd,
      onTouchMove,
      onTouchStart,
      onLoad,
    };
  },
});
</script>
<style scoped>
#demo-img {
  overflow-y: scroll;
  flex: 1;
  margin: 7px;
}

#demo-img #demo-img-container {
  display: flex;
  flex-direction: column;
}

#demo-img .image {
  width: 300px;
  height: 180px;
  margin: 30px;
  border-width: 1px;
  border-style: solid;
  border-color: #40b883;
}

#demo-img .img-result {
  width: 300px;
  height: 150px;
  margin-top: -30px;
  margin-horizontal: 30px;
  border-width: 1px;
  border-style: solid;
  border-color: #40b883;
}

#demo-img .contain {
  resize-mode: contain;
}

#demo-img .cover {
  resize-mode: cover;
}

#demo-img .center {
  resize-mode: center;
}

#demo-img .tint-color {
  tint-color: #40b88399
}
</style>
