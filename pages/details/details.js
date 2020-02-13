const news = require("../../api/news.js")

Component({
  data:{

  },
  methods:{
    onLoad: function(options){
      this.fetchDetil(options.id)
    },

    fetchDetil: function(id){
      news.fetchDetail(id).then(data => {
        this.setData({
          news_detail: data
         })
      }).catch(error =>{
        console.log(error)
      })
    }

  }
})