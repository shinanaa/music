<template>
    <transition name="slide">
      <music-list :rank="rank" :title="title" :bg-image="bgImage" :songs="songs"></music-list>
    </transition>
</template>

<script>
import MusicList from '@/components/music-list/music-list'
import {mapGetters} from 'vuex'
import {getMusicList} from '@/api/rank'
import {ERR_OK} from '@/api/config'
import {createSong} from 'common/js/song'

export default {
  name: 'top-list',
  created() {
    this._getTopList()
  },
  computed: {
    title() {
      return this.topList.topTitle
    },
    bgImage() {
      if (this.songs.length) {
        return this.songs[0].image
      }
      return this.topList.picUrl
    },
    ...mapGetters([
      'topList'
    ])
  },
  data() {
    return {
      songs: [],
      rank: true
    }
  },
  methods: {
    _getTopList() {
      if (!this.topList.id) {
        this.$router.push('/rank')
        return
      }
      getMusicList(this.topList.id).then((res) => {
        if (res.code === ERR_OK) {
          this.songs = this.normalizeSongs(res.songlist)
        }
      })
    },
    normalizeSongs(list) {
      let ret = []
      // let songmidArr = []
      // let typeArr = []
      list.forEach((item) => {
        const musicData = item.data
        if (musicData.songid && musicData.albumid) {
          // songmidArr.push(musicData.songmid)
          // typeArr.push(0)
          ret.push(createSong(musicData))
        }
      })
      // console.log(songmidArr)
      // console.log(typeArr)
      // getPlaySongPurl(songmidArr, typeArr).then((res) => {
      //   console.log(123)
      //   console.log(res)
      // })
      return ret
    }
  },
  components: {MusicList}
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s ease

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
