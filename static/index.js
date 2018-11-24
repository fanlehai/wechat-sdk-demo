document.getElementById('refresh').onclick = function () { location.reload(); }

/**
 *  以下内容多摘自官方demo
 *
**/
wx.config({
  debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
  appId: appId, // 必填，公众号的唯一标识
  timestamp: timestamp, // 必填，生成签名的时间戳
  nonceStr: nonceStr, // 必填，生成签名的随机串
  signature: signature,// 必填，签名，见附录1
  jsApiList: ['checkJsApi',
    'updateAppMessageShareData',
    'onMenuShareTimeline',
    'onMenuShareAppMessage',
    'onMenuShareQQ',
    'onMenuShareWeibo',
    'hideMenuItems',
    'showMenuItems',
    'hideAllNonBaseMenuItem',
    'showAllNonBaseMenuItem',
    'translateVoice',
    'startRecord',
    'stopRecord',
    'onRecordEnd',
    'playVoice',
    'pauseVoice',
    'stopVoice',
    'uploadVoice',
    'downloadVoice',
    'chooseImage',
    'previewImage',
    'uploadImage',
    'downloadImage',
    'getNetworkType',
    'openLocation',
    'getLocation',
    'hideOptionMenu',
    'showOptionMenu',
    'closeWindow',
    'scanQRCode',
    'chooseWXPay',
    'openProductSpecificView',
    'addCard',
    'chooseCard',
    'openCard'] // 必填，需要使用的JS接口列表，
});

wx.ready(function () {
  // 1 判断当前版本是否支持指定 JS 接口，支持批量判断
  document.querySelector('#checkJsApi').onclick = function () {
    wx.checkJsApi({
      jsApiList: [
        'getNetworkType',
        'previewImage'
      ],
      success: function (res) {
        alert(JSON.stringify(res));
      }
    });
  };

  // 2. 分享接口
  // 2.1 监听“分享给朋友”，按钮点击、自定义分享内容及分享结果接口
  document.querySelector('#updateAppMessageShareData').onclick = function () {

    console.log("updateAppMessageShareData******");
    // wx.onMenuShareAppMessage({
    //   title: '互联网之子',
    //   desc: '在长大的过程中，我才慢慢发现，我身边的所有事，别人跟我说的所有事，那些所谓本来如此，注定如此的事，它们其实没有非得如此，事情是可以改变的。更重要的是，有些事既然错了，那就该做出改变。',
    //   link: 'http://movie.douban.com/subject/25785114/',
    //   imgUrl: 'http://demo.open.weixin.qq.com/jssdk/images/p2166127561.jpg',
    //   trigger: function (res) {
    //     // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
    //     alert('用户点击发送给朋友');
    //   },
    //   success: function (res) {
    //     alert('已分享');
    //   },
    //   cancel: function (res) {
    //     alert('已取消');
    //   },
    //   fail: function (res) {
    //     alert(JSON.stringify(res));
    //   }
    // });
    // alert('已注册获取“发送给朋友”状态事件');

    // 自定义“分享给朋友”及“分享到QQ”按钮的分享内容（1.4.0）
    // wx.ready(function () {   //需在用户可能点击分享按钮前就先调用
    wx.updateAppMessageShareData({
      title: '互联网之子', // 分享标题
      desc: '在长大的过程中，我才慢慢发现，我身边的所有事，别人跟我说的所有事', // 分享描述
      link: 'http://www.learn-anything.cn/page?v=9be6a001e57c4f058b2c1a496017e1a6', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: 'http://demo.open.weixin.qq.com/jssdk/images/p2166127561.jpg', // 分享图标
      success: function () {
        // 设置成功
        alert('已分享');
      },
      cancel: function (res) {
        alert('已取消');
      },
      fail: function (res) {
        alert(JSON.stringify(res));
      }
    });

    // })


  };

  // 5 图片接口
  // 5.1 拍照、本地选图
  var images = {
    localId: [],
    serverId: []
  };
  document.querySelector('#chooseImage').onclick = function () {
    wx.chooseImage({
      success: function (res) {
        images.localId = res.localIds;
        alert('已选择 ' + res.localIds.length + ' 张图片');
      }
    });
  };
  // 5.2 图片预览
  document.querySelector('#previewImage').onclick = function () {
    wx.previewImage({
      current: 'http://img5.douban.com/view/photo/photo/public/p1353993776.jpg',
      urls: [
        'http://img3.douban.com/view/photo/photo/public/p2152117150.jpg',
        'http://img5.douban.com/view/photo/photo/public/p1353993776.jpg',
        'http://img3.douban.com/view/photo/photo/public/p2152134700.jpg'
      ]
    });
  };

  // 7.2 获取当前地理位置
  document.querySelector('#getLocation').onclick = function () {
    wx.getLocation({
      success: function (res) {
        alert(JSON.stringify(res));
      },
      cancel: function (res) {
        alert('用户拒绝授权获取地理位置');
      }
    });
  };

  // 9 微信原生接口
  // 9.1.1 扫描二维码并返回结果
  document.querySelector('#scanQRCode0').onclick = function () {
    wx.scanQRCode();
  };


  // 9.1.1 扫描二维码并返回结果
  document.querySelector('#updateTimelineShareData').onclick = function () {
    wx.updateTimelineShareData({
      title: '分享标题', // 分享标题
      link: 'http://www.learn-anything.cn/page?v=9be6a001e57c4f058b2c1a496017e1a6', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: 'http://demo.open.weixin.qq.com/jssdk/images/p2166127561.jpg', // 分享图标
      success: function () {
        // 设置成功
        alert('已分享');
      },
      cancel: function (res) {
        alert('已取消');
      },
      fail: function (res) {
        alert(JSON.stringify(res));
      }
    });
  };

});

wx.error(function (res) {
  JSON.stringify(res)
});