
const get = (url ) => new Promise((resolve, reject) => {
  wx.request({
    url: url,
    method: 'GET',
    dataType: 'JSON',
    responseType: 'text',
    success: res => {
      let data = JSON.parse(res.data)
      const {code, message, result} = data
      resolve({ code: code, message: message, result: result})
    },
    fail: res => {
      reject(res)
    },
    complete: res =>{}
  })
})

module.exports = {
  get
}