import { Observable } from 'rxjs'
import { prop, path } from 'ramda'

const serialize = (obj, prefix) => {
  return Object.keys(obj).reduce((m, k) => {
    if (obj.hasOwnProperty(k)) {
      const cK = prefix ? `${prefix}[${k}]` : k
      const v = obj[k]
      m.push((v !== null && typeof v === 'object') ? serialize(v, cK) : `${encodeURIComponent(cK)}=${encodeURIComponent(v)}`)
      return m
    }
    return m
  }, []).join('&')
}

/**
 * @function onXHRLoaded
 * @throws SyntaxError - Throws SyntaxError if response is not a JSON string
 * @param res
 * @param rej
 * @param e
 */
const onXHRLoaded = function onXHRLoaded(res, rej, e) {
  const parsedResponse = JSON.parse(path(['target', 'responseText'], e))
  if (path(['target', 'status'], e) === 200) res(parsedResponse)
  else rej(parsedResponse)
}
/**
 *
 * @param {XMLHttpRequest} xhr - The xhr object
 * @param {String} k - The key value
 * @param {Object} collection - The headers object
 */
const setXHRHeader = function setXHRHeader(xhr, collection, k) {
  xhr.setRequestHeader(k, collection[k])
}
/**
 * @param options
 * @param  {String} options.method - The method name (GET, POST, PUT)
 * @param  {String} options.url - The url to make request
 * @param  {Object} options.data - The request payload data
 * @param  {Object} options.headers - The request headers. By default is set to {'Content-Type':'application/json charset=UTF-8'}
 * @param  {Boolean} options.async - Specify is this request is asynchronous or a synchronous
 * @returns {Observable<T>}
 */
export default function REST(options) {
  return Observable.fromPromise(new Promise((res, rej) => {
    const xhr = new XMLHttpRequest()
    const headers = Object.assign({}, { 'Content-Type': 'application/json charset=UTF-8' }, prop('headers', options))
    const data = prop('data', options) ? prop('data', options) : {}
    let url = options.url
    if (options.method === 'GET') {
      url += `?${serialize(data)}`
    }

    const async = typeof prop('async', options) === 'undefined' ? true : prop('async', options)
    xhr.onload = onXHRLoaded.bind(xhr, res, rej)
    xhr.open(prop('method', options), url, async)
    xhr.withCredentials = true
    if (headers) Object.keys(headers).forEach(setXHRHeader.bind(null, xhr, headers))
    xhr.send(typeof data === 'string' ? data : data instanceof FormData ? data : JSON.stringify(data))
  }))
}
