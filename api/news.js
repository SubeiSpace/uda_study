import {formatTime} from "../utils/util.js"

const http = require("../api/http.js")


const fetchNews = (type) => new Promise((resolve, reject) => {
  const url = 'https://test-miniprogram.com/api/news/list?type=' + type
  http.get(url).then(({ code, message, result}) => {
    if(code !== 200){
      reject(message)
    }
    const news = result.map(it =>{
      it.date = formatTime(it.date)
      return it
    })

    resolve(news)
  }).catch(error => reject(error))
})

const fetchDetail = (id) => new Promise((resolve, reject) => {
  const url = 'https://test-miniprogram.com/api/news/detail?id=' + id
  console.log(url)
  http.get(url).then(({ code, message, result }) => {
    if (code !== 200) {
      reject(message)
    }

    result.date = formatTime(result.date)
    resolve(result)
  }).catch(error => reject(error))
})

module.exports = {
  fetchNews,
  fetchDetail
}