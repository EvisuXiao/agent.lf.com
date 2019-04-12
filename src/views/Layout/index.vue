<template>
  <div style="height:100%;">
    <view-box ref="viewBox" :body-padding-top="headerHeight" :body-padding-bottom="bottomHeight">
      <div ref="header" slot="header" class="layout-header">
        <x-header
          v-if="showHeader"
          :left-options="{ showBack: showBack, backText: '' }"
          :title="title"
        >
          <div slot="right" v-if="showIcon" @click="showDialog=true">
            <icon :type="rightIcon"></icon>
          </div>
        </x-header>
        <slot name="header"></slot>
      </div>
      <slot></slot>
      <div slot="bottom" ref="footer" class="layout-footer">
        <slot name="bottom"></slot>
      </div>
    </view-box>
    <!--搜索框-->
    <div v-transfer-dom>
      <x-dialog v-model="showDialog" hide-on-blur :mask-z-index="500" :dialog-style="{ top: '-160px' }">
        <slot name="search"></slot>
        <group :gutter="0">
          <x-button mini action-type="button" @click.native="search">确定</x-button>
        </group>
      </x-dialog>
    </div>
  </div>
</template>

<script>
  import {
    Icon,
    Group,
    TransferDomDirective as TransferDom,
    ViewBox,
    XButton,
    XDialog,
    XHeader
  } from 'vux'

  export default {
    name: 'Layout',
    directives: {
      TransferDom
    },
    components: {
      Icon,
      Group,
      ViewBox,
      XButton,
      XDialog,
      XHeader
    },
    props: {
      showHeader: {
        type: Boolean,
        default: true
      },
      showBack: {
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
    },
    data () {
      return {
        showDialog: false,
        headerHeight: '',
        bottomHeight: ''
      }
    },
    mounted () {
      this.$nextTick(() => {
        this.headerHeight = this.$refs.header.offsetHeight + 'px';
        this.bottomHeight = this.$refs.footer.offsetHeight + 'px'
      })
    },
    methods: {
      search () {
        this.$emit('search-do');
        this.showDialog = false
      }
    }
  }
</script>

<style scoped lang="less">
  @import '../../../node_modules/vux/src/styles/1px.less';

  .layout-header {
    width:100%;
    position:fixed;
    left:0;
    top:0;
    z-index:100;
  }

  .layout-footer {
    width:100%;
    position:fixed;
    left:0;
    bottom:0;
    z-index:100;
  }

  html, body {
    height: 100%;
    width: 100%;
    overflow-x: hidden;
  }
</style>
