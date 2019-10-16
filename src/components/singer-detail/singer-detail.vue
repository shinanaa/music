<template>
  <transition name="slide" mode="in-out">
    <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
import {getSingerDetail, getPlaySongVkey} from '@/api/singer'
import {ERR_OK} from '@/api/config'
import {createSong} from 'common/js/song'
import MusicList from '@/components/music-list/music-list'

export default {
  name: 'singer-detail',
  data() {
    return {
      songs: []
    }
  },
  computed: {
    title() {
      return this.singer.name
    },
    bgImage() {
      return this.singer.avatar
    },
    ...mapGetters([
      'singer'
    ])
  },
  created() {
    this._getDetails()
  },
  methods: {
    _getDetails() {
      if (!this.singer.id) {
        this.$router.push('/singer')
        return
      }
      getSingerDetail(this.singer.id).then((res) => {
        console.log(res)
        if (res.code === ERR_OK) {
          this.songs = this._normalizeSongs(res.data.list)
        }
      })
    },
    _normalizeSongs(list) {
      let ret = []
      list.forEach((item) => {
        let {musicData} = item
        if (musicData.songmid && musicData.albummid) {
          getPlaySongVkey(musicData.songmid).then((res) => {
            if (res) {
              ret.push(createSong(musicData, res))
            }
          })
        }
      })
      return ret
    }
  },
  components: {MusicList}
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .slide-enter,.slide-leave-to
    transform: translateX(100%)
  .slide-enter-active, .slide-leave-active
    transition: all 0.5s
  .slide-enter-active
    transition-delay: 0.5s
</style>
