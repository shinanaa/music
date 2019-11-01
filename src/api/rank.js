import Jsonp from 'common/js/jsonp'
import {commonParams, options} from './config'
import axios from 'axios'

export function getTopList() {
  const url = '/getTopList'
  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    needNewCode: 1
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getMusicList(topid) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg'
  const data = Object.assign({}, commonParams, {
    topid,
    page: 'detail',
    type: 'top',
    platform: 'h5',
    needNewCode: 1,
    tpl: 3
  })
  return Jsonp(url, data, options)
}

export function getPlaySongPurl(songmidArr, typeArr) {
  const url = '/getPlaySongPurl '
  const data = Object.assign({}, commonParams, {
    notice: 0,
    platform: 'h5',
    needNewCode: 1,
    uin: 0,
    format: 'json'
  })
  const req = {
    'method': 'CgiGetVkey', 'module': 'vkey.GetVkeyServer', 'param': {'guid': +new Date(), 'songmid': songmidArr, 'songtype': typeArr, 'uin': '0', 'loginflag': 0, 'platform': '23'}
  }
  return axios.post(url, {
    comm: data,
    req_0: req
  }).then((res) => {
    console.log(123)
    return Promise.resolve(res.data.req_0.data)
  })
}
