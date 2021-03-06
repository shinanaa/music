<template>
    <scroll class="listView"
            :data="data"
            ref="listView"
            :listenScroll='ListenScroll'
            :probeType="probeType"
            @scroll="scroll">
      <ul>
        <li v-for="(group, index) in data"
            :key="index"
            class="list-group"
            ref="listGroup">
          <h2 class="list-group-title">{{group.title}}</h2>
          <ul>
            <li @click="selectItem(item)" v-for="(item, index) in group.items" class="list-group-item" :key="index">
              <img v-lazy="item.avatar" alt="" class="avatar">
              <span class="name">{{item.name}}</span>
            </li>
          </ul>
        </li>
      </ul>
      <div class="list-shortcut" @touchstart="onShortcutTouchStart" @touchmove.stop.prevent="onShortcutTouchMove">
        <ul>
          <li v-for="(item, index) in shortcutList"
              :key="index" class="item"
              :class="{'current' : currentIndex == index}"
              :data-index="index">{{item}}</li>
        </ul>
      </div>
      <div class="list-fixed" v-show="fixedTitle" ref="fixed">
        <h1 class="fixed-title">{{fixedTitle}}</h1>
      </div>
      <div v-show="!data.length" class="loading-container">
        <Loading></Loading>
      </div>
    </scroll>
</template>

<script>
import Scroll from '@/base/scroll/scroll'
import Loading from '@/base/loading/loading'
import {getData} from 'common/js/dom'
const ANCHOR_HEIGHT = 18 // 每个元素的高度，用以判定在滑动过程中活动了几个元素
const TITLE_HEIGHT = 30
export default {
  name: 'list-view',
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      scrollY: -1,
      currentIndex: 0,
      diff: -1
    }
  },
  computed: {
    shortcutList() {
      return this.data.map((group) => {
        return group.title.substr(0, 1) // 热门取‘热’，其他字母正常显示
      })
    },
    fixedTitle() {
      if (this.scrollY > 0) {
        return ''
      }
      console.log(this.currentIndex)
      return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
    }
  },
  components: {
    Scroll,
    Loading
  },
  created() {
    this.touch = {}
    this.ListenScroll = true
    this.probeType = 3 // 不仅在屏幕滑动的过程中，而且在 momentum 滚动动画运行过程中实时派发 scroll 事件
    this.listHeight = []
  },
  methods: {
    selectItem(item) {
      this.$emit('select', item)
    },
    onShortcutTouchStart(e) {
      let anchorIndex = getData(e.target, 'index')
      let firstTouch = e.touches[0]
      this.touch.y1 = firstTouch.pageY
      this.touch.anchorIndex = anchorIndex
      this._scrollTo(anchorIndex)
    },
    onShortcutTouchMove(e) {
      let firstTouch = e.touches[0]
      this.touch.y2 = firstTouch.pageY
      let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0
      let anchorIndex = parseInt(this.touch.anchorIndex) + delta
      this._scrollTo(anchorIndex)
    },
    refresh() {
      this.$refs.listView.refresh()
    },
    scroll(pos) {
      this.scrollY = pos.y
    },
    _scrollTo(index) {
      // 以下边界情况不设置也生效
      if (!index && index !== 0) {
        return
      }
      if (index < 0) {
        index = 0
      } else if (index > this.listHeight.length - 2) {
        index = this.listHeight.length - 2
      }
      this.scrollY = -this.listHeight[index] // 点击右侧列表实现选中状态的同步
      this.$refs.listView.scrollToElement(this.$refs.listGroup[index], 0) // 0代表没有滚动动画
    },
    _calculateHeight() {
      this.listHeight = [] // 每一个分组距离顶部的距离
      const list = this.$refs.listGroup
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < list.length; i++) {
        let item = list[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
    }
  },
  watch: {
    data() {
      setTimeout(() => {
        this._calculateHeight()
      }, 20)
    },
    scrollY(newY) {
      const listHeight = this.listHeight
      // 当列表滚动到顶部，newY > 0
      if (newY > 0) {
        this.currentIndex = 0
        return
      }
      // 当列表在中间部分滚动
      for (let i = 0; i < listHeight.length - 1; i++) {
        let height1 = listHeight[i] // 当前分组的顶部距列表顶部的距离
        let height2 = listHeight[i + 1] // 当前分组底部距列表顶部的距离
        if (!height2 || (-newY >= height1 && -newY < height2)) { // 滚动最后一个列表 或 滚动到在列表之间时（向上滚动时newY是负值）
          this.currentIndex = i // 确定当前区间
          this.diff = height2 + newY // 当前区域的底端 - 当前滚动的距离（当前区域的底端距页面滚动区域顶部的距离）
          return
        }
      }
      // 当滚动到底部 且-newY大于最后一个元素的上限
      this.currentIndex = listHeight.length - 2
    },
    diff(newVal) {
      // 当前区域未滚动出滚动区域并且距滚动区域的顶端<30px时，fixedTop为当前top滚入fixed的值
      let fixedTop = (newVal > 0 && newVal < TITLE_HEIGHT) ? newVal - TITLE_HEIGHT : 0
      if (this.fixedTop === fixedTop) {
        return // 不需要修改dom
      }
      this.fixedTop = fixedTop
      this.$refs.fixed.style.transform = `translate3d(0, ${fixedTop}px, 0)`
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .listView
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-group
      padding-bottom: 30px
      .list-group-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          color: $color-text-l
          font-size: $font-size-medium
    .list-shortcut
      position: absolute
      z-index: 30
      right: 0
      top: 50%
      transform: translateY(-50%)
      width: 20px
      padding: 20px 0
      border-radius: 10px
      text-align: center
      background: $color-background-d
      font-family: Helvetica
      .item
        padding: 3px
        line-height: 1
        color: $color-text-l
        font-size: $font-size-small
        &.current
          color: $color-theme
    .list-fixed
      position: absolute
      top: 0
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
