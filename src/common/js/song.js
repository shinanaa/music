import {getLyric} from '@/api/song'
import {ERR_OK} from '@/api/config'

export default class Song {
  constructor({id, mid, singer, name, album, duration, image, url}) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    this.url = url
  }
  getLyric() {
    getLyric(this.mid).then((res) => {
      if (res.retcode === ERR_OK) {
        this.lyric = res.lyric
      }
    })
  }
}
export function createSong(musicData, songVkey) {
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: filterSinger(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    image: `http://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    // url: `http://ws.stream.qqmusic.qq.com/C400${musicData.songmid}.m4a?guid=1329984726&vkey=${songVkey}&uin=0&fromtag=66`
    url: `http://ws.stream.qqmusic.qq.com/${songVkey}`
  })
}
function filterSinger(singer) {
  let ret = []
  if (!singer) {
    return ''
  }
  singer.forEach((s) => {
    ret.push(s.name)
  })
  return ret.join('/')
}
