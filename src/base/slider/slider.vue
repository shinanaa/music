<template>
    <div class="slider" ref="slider">
      <div class="slider-group" ref="sliderGroup">
        <slot></slot>
      </div>
      <div class="dots"></div>
    </div>
</template>

<script>
import BScroll from 'better-scroll'
import {addClass} from 'common/js/dom'
export default {
  name: 'slider',
  props: {
    loop: {
      type: Boolean,
      default: true
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 300
    }
  },
  componments: [
    BScroll, addClass
  ],
  mounted() {
    setTimeout(() => {
      this._setSliderWith()
      this._initSlider()
    }, 20)
  },
  methods: {
    _setSliderWith() {
      // this.children = this.$ref.sliderGroup.children
      // let width = 0
      // let sliderWidth = this.$ref.slider.clientWidth
      // for (let i = 0; i < this.children.length; i++) {
      //   let child = this.children[i]
      // }
    },
    _initSlider() {

    }
  }
}
</script>

<style scoped>

</style>
