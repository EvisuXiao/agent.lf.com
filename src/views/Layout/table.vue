<template>
  <layout :title="title" :show-icon="showIcon" @search-hide="$emit('search-hide')">
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
  import { needRefreshList } from '../../utils'

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
        list: [],
        page: 1,
        pageSize: 20,
        pullDownCfg: true,
        pullUpCfg: true,
        headerHeight: '',
        bottomHeight: ''
      }
    },
    mounted () {
      this.$nextTick(() => {
        this.headerHeight = this.$refs.header.offsetHeight + 46;
        this.bottomHeight = this.$refs.footer.offsetHeight;
      });
      this.$refs.scroll.initScroll();
      // this.onPullingDown()
      needRefreshList()
    },
    computed: {
      needRefresh: function () {
        return this.$store.getters.listRefresh
      }
    },
    watch: {
      needRefresh: function (val) {
        if (val) {
          this.$refs.scroll.scrollTo(0, 0, 50);
          this.onPullingDown();
          this.$store.commit('setListRefresh', false)
        }
      }
    },
    methods: {
      onPullingDown () {
        this.getData(1, this.pageSize).then(data => {
          let list = data;
          if (list === undefined) {
            list = []
          }
          this.list = list;
          this.page = 1;
          this.$refs.scroll.forceUpdate(this.list.length >= this.pageSize);
          this.$store.commit('setListTmp', this.list);
          this.$nextTick(() => {
            this.$refs.scroll.refresh()
          })
        })
      },
      onPullingUp () {
        this.getData(this.page + 1, this.pageSize).then(data => {
          let list = data;
          if (list === undefined) {
            list = []
          }
          this.list = this.list.concat(list);
          // 最后一页
          if (list.length < this.pageSize) {
            this.$refs.scroll.forceUpdate(false)
          } else {
            this.$refs.scroll.forceUpdate(true);
            this.page++
          }
          this.$store.commit('setListTmp', this.list);
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
</style>
