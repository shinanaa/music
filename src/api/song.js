import {commonParams} from './config'
import axios from 'axios'
// 获取歌曲歌词
export function getLyric(mid) {
  const url = '/lyric'
  const data = Object.assign({}, commonParams, {
    '-': 'MusicJsonCallback_lrc',
    songmid: mid,
    pcachetime: +new Date(),
    platform: 'yqq.json',
    loginUin: 0,
    hostUin: 0,
    needNewCode: 0
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
