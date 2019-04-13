<template>
  <layout :title="title" :show-icon="showIcon" @search-do="onPullingDown(true)">
    <div slot="header" ref="header"><slot name="header"></slot></div>
    <div class="position-box" :style="{ top: headerHeight + 'px', bottom: bottomHeight + 'px' }">
      <vue-better-scroll
        ref="scroll"
        class="wrapper"
        :pullDownRefresh="pullDownCfg"
        :pullUpLoad="pullUpCfg"
        :startY="parseInt(headerHeight)"
        @pullingDown="onPullingDown"
        @pullingUp="onPullingUp">
        <slot></slot>
      </vue-better-scroll>
    </div>
    <div slot="bottom" ref="footer"><slot name="bottom"></slot></div>
    <slot slot="search" name="search"></slot>
  </layout>
</template>

<script>
  import Layout from './index'
  import VueBetterScroll from 'vue2-better-scroll'

  export default {
    name: 'LayoutTable',
    components: {
      Layout,
      VueBetterScroll
    },
    props: {
      title: {
        type: String,
        default: ''
      },
      list: {
        type: Array,
        default: []
      },
      showIcon: {
        type: Boolean,
        default: false
      },
      getData: {
        type: Function,
        default: null
      }
    },
    data () {
      return {
        innerList: [],
        searched: false,
        page: 1,
        pageSize: 20,
        pullDownCfg: true,
        pullUpCfg: true,
        headerHeight: '',
        bottomHeight: ''
      }
    },
    watch: {
      innerList: function (val) {
        this.$emit('update:list', val)
      }
    },
    mounted () {
      this.$nextTick(() => {
        this.headerHeight = this.$refs.header.offsetHeight + 46;
        this.bottomHeight = this.$refs.footer.offsetHeight;
      });
      this.$refs.scroll.initScroll();
      this.onPullingDown()
    },
    methods: {
      onPullingDown (searched = null) {
        this.$refs.scroll.scrollTo(0, 0, 50);
        if (searched !== null) {
          this.searched = searched
        }
        this.getData(1, this.pageSize, this.searched).then(data => {
          let list = data;
          if (list === undefined) {
            list = []
          }
          this.innerList = list;
          this.page = 1;
          this.$refs.scroll.forceUpdate(this.innerList.length >= this.pageSize);
          this.$nextTick(() => {
            this.$refs.scroll.refresh()
          })
        })
      },
      onPullingUp () {
        this.getData(this.page + 1, this.pageSize, this.searched).then(data => {
          let list = data;
          if (list === undefined) {
            list = []
          }
          this.innerList = this.innerList.concat(list);
          // 最后一页
          if (list.length < this.pageSize) {
            this.$refs.scroll.forceUpdate(false)
          } else {
            this.$refs.scroll.forceUpdate(true);
            this.page++
          }
          this.$nextTick(() => {
            this.$refs.scroll.refresh()
          })
        })
      }
    },
    beforeDestroy () {
      this.$refs.scroll.destroy();
      this.$refs.scroll = null
    }
  }
</script>

<style>
  .position-box {
    position: fixed;
    left: 0;
    right: 0;
    overflow: hidden;
  }
  .wrapper {
    position: absolute;
    left: 0;
    right: 0;
    overflow: hidden;
  }

  html, body {
    height: 100%;
    width: 100%;
    overflow-x: hidden;
  }
</style>
