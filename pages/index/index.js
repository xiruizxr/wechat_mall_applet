const product = require('../../utils/product.js')

Page({
  data: {
    categories: [2,7,9],
    items: [],
    slides: [],
    navs: [{icon: "../../images/1.png", name: "资产", key: '1'},
           {icon: "../../images/1.png", name: "直销", key: '2'},
           {icon: "../../images/1.png", name: "严选", key: '3'},
           {icon: "../../images/1.png", name: "包装", key: '4'}]
  },

  bindShowProduct: function (e) {
    wx.navigateTo({
      url: `../show_product/show_product?id=${e.currentTarget.dataset.id}`
    })
  },

  catchTapCategory: function (e) {
    wx.navigateTo({
      url: `../category/category?type=${e.currentTarget.dataset.type}`
    })
  },

  onLoad: function() {
    var that = this

    product.getSlides().then(function(result) {
      var data = getApp().store.sync(result.data)
      that.setData({'slides': data})
      wx.setStorage({
        key:"indexSlides",
        data:data
      })
    })

    wx.getNetworkType({
      success: function(res) {
        var networkType = res.networkType // 返回网络类型2g，3g，4g，wifi
        if (networkType) {
          product.getProducts().then(function(result) {
            var data = getApp().store.sync(result.data)
            that.setData({'items': data})
            wx.setStorageSync('products', data)
          })
        } else {
           cache = wx.getStorageSync('products')
           if (cache) {
             that.setData({'items': cache})
           } else {
             that.setData({'items': []})
           }
        }
      }
    })
  }
})
