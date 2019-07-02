import originJSONP from 'jsonp'

export default function jsonp(url, data, option) {
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)
  return new Promise((resolve, reject) => {
    originJSONP(url, option, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}
function param(data) {
  let url = ''
  for (let k in data) {
    let value = data[k] !== undefined ? data[k] : ''
    /* encodeURIComponent 把字符串作为url组件进行编码 */
    url += `&${k}=${encodeURIComponent(value)}`
  }
  /* 如果url存在（即data有值）时，截取掉第一个参数的&符，否则返回空字符串 */
  return url ? url.substring(1) : ''
}
