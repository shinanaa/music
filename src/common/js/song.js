import {getLyric} from '@/api/song'
import {ERR_OK} from '@/api/config'
import {Base64} from 'js-base64'

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
    if (this.lyric) {
      return Promise.resolve(this.lyric)
    }
    return new Promise((resolve, reject) => {
      getLyric(this.mid).then((res) => {
        if (res.retcode === ERR_OK) {
          this.lyric = Base64.decode(res.lyric)
          resolve(this.lyric)
        } else {
          reject(new Error('no lyric'))
        }
      })
    })
  }
}
// Song 的工厂方法（不直接调用new 通过一个方法，返回一个实例）
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
export function createDisc(musicData, songVkey) {
  return new Song({
    id: musicData.id,
    mid: musicData.mid,
    singer: filterSinger(musicData.singer),
    name: musicData.name,
    album: musicData.album.subtitle,
    duration: musicData.interval,
    image: `http://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.album.mid}.jpg?max_age=2592000`,
    url: `http://ws.stream.qqmusic.qq.com/${songVkey}`
  })
}
export function createRank() {
  // return new Song({
  //   id: musicData.id,
  //   mid: musicData.mid,
  //   singer: filterSinger(musicData.singer),
  //   name: musicData.name,
  //   album: musicData.album.subtitle,
  //   duration: musicData.interval,
  //   image: `http://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.album.mid}.jpg?max_age=2592000`,
  //   url: `http://aqqmusic.tc.qq.com/amobile.music.tc.qq.com/${songVkey}`
  // })
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
