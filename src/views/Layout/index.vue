<template>
  <div style="height:100%;">
    <view-box ref="viewBox" :body-padding-top="showHeader ? '46px' : ''">
      <x-header
        v-if="showHeader"
        slot="header"
        class="layout-header"
        :left-options="{ backText: '' }"
        :title="title"
      >
        <div slot="right" v-if="showIcon" @click="$emit('on-click-icon')">
          <icon :type="rightIcon"></icon>
        </div>
      </x-header>
      <slot></slot>
      <div slot="bottom">
        <slot name="bottom"></slot>
      </div>
    </view-box>
  </div>
</template>

<script>
  import {
    Icon,
    ViewBox,
    XHeader
  } from 'vux'

  export default {
    name: 'Layout',
    components: {
      Icon,
      ViewBox,
      XHeader
    },
    props: {
      showHeader: {
        type: Boolean,
        default: true
      },
      title: {
        type: String,
        default: ''
      },
      showIcon: {
        type: Boolean,
        default: false
      },
      rightIcon: {
        type: String,
        default: 'search'
      }
    }
  }
</script>

<style scoped lang="less">
  @import '../../../node_modules/vux/src/styles/1px.less';

  .layout-header {
    width:100%;
    position:absolute;
    left:0;
    top:0;
    z-index:100;
  }

  html, body {
    height: 100%;
    width: 100%;
    overflow-x: hidden;
  }
</style>
