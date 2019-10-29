import Jsonp from 'common/js/jsonp'
import {commonParams, options} from './config'

export function getTopList() {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg'
  const data = Object.assign({}, commonParams, {
    g_tk: 67232076,
    platform: 'h5',
    needNewCode: 1
  })
  return Jsonp(url, data, options)
}
