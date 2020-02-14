//index.js
//获取应用实例
const app = getApp()
const news = require("../../api/news.js")

const news_tab = [
  {
    postion:0,
    title: "国内",
    type: "gn"
  },
  {
    postion: 1,
    title: "国际",
    type: "gj"
  },
  {
    postion: 2,
    title: "财经",
    type: "cj"
  },
  {
    postion: 3,
    title: "娱乐",
    type: "yl"
  },
  {
    postion: 4,
    title: "军事",
    type: "js"
  },
  {
    postion: 5,
    title: "体育",
    type: "ty"
  },
  {
    postion: 6,
    title: "其他",
    type: "other"
  },
  
]

const defaultBanner = {
  firstImage: '/images/banner.jpg',
  title: '无接触到店取餐',
  source: '麦当劳Pro',
  date: '02:08'
}

Component({
  data:{
    news_tab : news_tab,
    news_items: [],
    currentTab: 0,
    banner: defaultBanner
  },

  methods:{
    onLoad: function(options){
      wx.startPullDownRefresh({})
    },

    onPullDownRefresh: function(){
      this.fetchNews()
    },

    fetchNews: function(){
      let type = news_tab[this.data.currentTab].type
      news.fetchNews(type).then(data => {
        wx.stopPullDownRefresh()

        //判定后台第一数据里的firstImage 是否存在，长度是否为0
        let isNull = data[0].firstImage == undefined || data[0].firstImage.length == 0 
        console.log(isNull)

        this.setData({
          news_items:data,
          banner: !isNull ? data[0] : defaultBanner //三目运算判定处理， 如果isNull=false 则使用后台数据，反之默认banner
        })
       }).catch(error => {  //加入异常处理, 经测试传入错误的type,后台数据清空，正常显示默认的banner
         console.log(error)
         wx.stopPullDownRefresh()  
         this.setData({
           news_items: "",
           banner: defaultBanner 
         })
       })
    },

    //Tab点击事件-获取新闻category
    tabOnClick:function(event){
      let id = event.currentTarget.id
      this.data.currentTab = id
      this.fetchNews()
      this.setData({
        currentTab: id
      })
    }
    
  }

})
