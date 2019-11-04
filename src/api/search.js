import Jsonp from 'common/js/jsonp'
import {commonParams, options} from './config'
import axios from 'axios'

export function getHotKey() {
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'

  const data = Object.assign({}, commonParams, {
    uin: 0,
    needNewCode: 1,
    platform: 'h5'
  })

  return Jsonp(url, data, options)
}
// export function getHotKey() {
//   const url = ''
//   const data = {
//     cgiKey: 'GetHomePage',
//     '_': 1572587993723,
//     data: {'comm': {'g_tk': 5381, 'uin': '', 'format': 'json', 'inCharset': 'utf-8', 'outCharset': 'utf-8', 'notice': 0, 'platform': 'h5', 'needNewCode': 1}, 'MusicHallHomePage': {'module': 'music.musicHall.MusicHallPlatform', 'method': 'MobileWebHome', 'param': {'ShelfId': [101, 102, 161]}}, 'hotkey': {'module': 'tencent_musicsoso_hotkey.HotkeyService', 'method': 'GetHotkeyForQQMusicMobile', 'param': {'remoteplace': 'txt.miniapp.wxada7aab80ba27074', 'searchid': '1559616839293'}}}
//   }
//   return axios.get(url, {
//     params: data
//   }).then((res) => {
//     return Promise.resolve(res.data)
//   })
// }

export function search(query, page, zhida, perpage) {
  const url = '/search'
  const data = Object.assign({}, commonParams, {
    '_': 1572848157242,
    platform: 'h5',
    needNewCode: 1,
    w: query,
    zhidaqu: 1,
    catZhida: zhida ? 1 : 0,
    t: 0,
    flag: 1,
    ie: 'utf-8',
    sem: 1,
    aggr: 0,
    p: page,
    perpage,
    n: perpage,
    remoteplace: 'txt.mqq.all',
    uin: ''
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
