/**
 * author: Di (微信小程序开发工程师)
 * organization: WeAppDev(微信小程序开发论坛)(http://weappdev.com)
 *               垂直微信小程序开发交流社区
 * 
 * github地址: https://github.com/icindy/wxParse
 * 
 * for: 微信小程序富文本解析
 * detail : http://weappdev.com/t/wxparse-alpha0-1-html-markdown/184
 */

/**
 * utils函数引入
 **/
import showdown from './showdown.js';
import HtmlToJson from './html2json.js';
/**
 * 配置及公有属性
 **/
var realWindowWidth = 0;
var realWindowHeight = 0;
// wx.getSystemInfo({
//   success: function (res) {
//     realWindowWidth = res.windowWidth
//     realWindowHeight = res.windowHeight
//   }
// })

/**
 * 主函数入口区
 **/
function wxParse(bindName = 'wxParseData', type = 'html', data = '<div ></div>', target, imagePadding, isComponent = false, previewImageId = '') {
  var that = target;

  var transData = {};//存放转化后的数据
  if (type == 'html') {
    transData = HtmlToJson.html2json(data, bindName, previewImageId);
    // console.log(transData);
  } else if (type == 'md' || type == 'markdown') {
    var converter = new showdown.Converter();
    var html = converter.makeHtml(data);
    transData = HtmlToJson.html2json(html, bindName);
    console.log(JSON.stringify(transData, ' ', ' '));
  }
  transData.view = {};
  transData.view.imagePadding = 0;
  if (typeof (imagePadding) != 'undefined') {
    transData.view.imagePadding = imagePadding
  }

  // gomez video ios z-index issue


  transData.videos.forEach((item) => {
    let key = ``;
    let keyArr = item.index.split('.');
   
    let newdata = '';
    let htmlData = '';

    keyArr.forEach((keyName, index) => {
      if (index == 0) {
        newdata = transData.nodes[keyName]
      } else {
        newdata = newdata.nodes[keyName]
      }
      if (index == 3) {
        if (newdata.nodes && newdata.nodes[0]['pageBuilderContentType'] == 'video' && newdata.nodes[1] && newdata.nodes[1]['pageBuilderContentType'] == 'html') {
          htmlData = newdata.nodes[1];
          newdata.nodes[1] = '';
        }
      }

    })
    newdata.nodes = [htmlData];
  })

  var bindData = {};
  bindData[bindName] = transData;
  // that.setData(bindData);


  that.isComponent = isComponent;
  that.wxParseImgLoad = wxParseImgLoad;
  that.wxParseSliderImgLoad = wxParseSliderImgLoad;
  that.wxParseImgTap = wxParseImgTap;
  that.wxParseTagATap = wxParseTagATap;
  that.wxParseVideoLoad = wxParseVideoLoad
  return { content: transData }
}
// 图片点击事件
function wxParseImgTap(e) {
  var that = this;
  var nowImgUrl = e.target.dataset.src;
  var tagFrom = e.target.dataset.from;
  var zoom = e.target.dataset.zoom;

  if (typeof (tagFrom) != 'undefined' && tagFrom.length > 0 && zoom == '1') {
    // wx.previewImage({
    //   current: nowImgUrl, // 当前显示图片的http链接
    //   // urls: that.data[tagFrom].imageUrls // 需要预览的图片http链接列表
    //   urls: [nowImgUrl]
    // })
  }
}

/**
 * 图片视觉宽高计算函数区 
 **/
function wxParseImgLoad(e) {
  var that = this;
  var tagFrom = e.target.dataset.from;
  var idx = e.target.dataset.idx;
  var temData = that.data[tagFrom];

  if (!temData || temData.images.length == 0) {
    return;
  }
  var temImages = temData.images;
  var index = temImages[idx].index;

  if (typeof (tagFrom) != 'undefined' && tagFrom.length > 0) {
    calMoreImageInfo(e, idx, that, tagFrom)
    initSwiper(index, that, tagFrom)
  }

}

function wxParseSliderImgLoad(e) {
  var that = this;
  var tagFrom = e.target.dataset.from;
  var idx = e.target.dataset.idx;
  var temData = that.data[tagFrom];

  if (!temData || temData.images.length == 0) {
    return;
  }
  var temImages = temData.images;
  var index = temImages[idx].index;

  if (typeof (tagFrom) != 'undefined' && tagFrom.length > 0) {
    // calMoreImageInfo(e, idx, that, tagFrom)
    initSwiper(index, that, tagFrom)
  }

}

function wxParseVideoLoad(e) {
  var that = this;

  var tagFrom = e.target.dataset.item.from;
  var idx = e.target.dataset.item.videoIndex;
  var temData = that.data[tagFrom];

  if (!temData || temData.videos.length == 0) {
    return;
  }

  var temvideo = temData.videos;
  var index = temvideo[idx].index;

  if (typeof (tagFrom) != 'undefined' && tagFrom.length > 0) {
    calMoreVideoInfo(e, idx, that, tagFrom)
    initSwiper(index, that, tagFrom)
  }

  const windowWidth = wx.getSystemInfoSync().windowWidth
  const { detail: { height, width }, target: { dataset: { item } } } = e
  // console.log(windowWidth);
  // console.log(e,'wxParseVideoLoad');
  const rate = width / windowWidth
  const realHeight = height / rate
  item.realHeight = realHeight
  // console.log(realHeight);
  // console.log(item);
}
// 假循环获取计算图片视觉最佳宽高
function calMoreImageInfo(e, idx, that, bindName) {

  var temData = that.data[bindName];
  if (!temData || temData.images.length == 0) {
    return;
  }
  var temImages = temData.images;
  //因为无法获取view宽度 需要自定义padding进行计算，稍后处理 （弃用 wxAutoImageCal）
  // var recal = wxAutoImageCal(e.detail.width, e.detail.height, that, bindName);
  // temImages[idx].width = recal.imageWidth;
  // temImages[idx].height = recal.imageheight; 
  // temData.images = temImages;
  // var bindData = {};
  // bindData[bindName] = temData;
  // that.setData(bindData);

  var index = temImages[idx].index;

  const imgContainerId = `#img-index-${idx}`;
  let imgContainerWidth = 0;
  let imgContainerHeight = 0;
  let originalWidth = e.detail.width / 2;
  let originalHeight = e.detail.height / 2;
  let autoWidth = 0;
  let autoHeight = 0;

  let key = `${bindName}`;
  for (let i of index.split('.')) key += `.nodes[${i}]`;
  let keyW = key + '.width';
  let keyH = key + '.height';
  let results = {};


  let query = {};
  if (that.isComponent) {
    query = that.createSelectorQuery();
  } else {
    query = wx.createSelectorQuery();
  }
  query.select(imgContainerId).boundingClientRect(function (containerRes) {

    if (containerRes) {
      imgContainerWidth = containerRes.right - containerRes.left;
      if (originalWidth > imgContainerWidth) {//在图片width大于width时候
        autoWidth = imgContainerWidth;
        // console.log("autoWidth" + autoWidth);
        autoHeight = (autoWidth * originalHeight) / originalWidth;
        // console.log("autoHeight" + autoHeight);
        results.imageWidth = autoWidth;
        results.imageheight = autoHeight;
      } else {//否则展示原来的数据
        results.imageWidth = originalWidth;
        results.imageheight = originalHeight;
      }
    } else {//否则展示原来的数据
      results.imageWidth = originalWidth;
      results.imageheight = originalHeight;
    }

    that.setData({
      [keyW]: results.imageWidth,
      [keyH]: results.imageheight,
    })

    wx.nextTick(() => {
      initSwiper(index, that, bindName)
    })
  })
  query.exec();


}

function calMoreVideoInfo(e, idx, that, bindName) {

  var temData = that.data[bindName];
  if (!temData || temData.videos.length == 0) {
    return;
  }
  var temvideos = temData.videos;

  var index = temvideos[idx].index;

  const videoContainerId = `#video-index-${idx}`;
  let videoContainerWidth = 0;
  let videoContainerHeight = 0;
  let originalWidth = e.detail.width;
  let originalHeight = e.detail.height;
  let autoWidth = 0;
  let autoHeight = 0;

  let key = `${bindName}`;
  for (let i of index.split('.')) key += `.nodes[${i}]`;
  let keyW = key + '.width';
  let keyH = key + '.height';
  let results = {};

  let query = {};
  if (that.isComponent) {
    query = that.createSelectorQuery();
  } else {
    query = wx.createSelectorQuery();
  }
  query.select(videoContainerId).boundingClientRect(function (containerRes) {

    if (containerRes) {
      const windowWidth = wx.getSystemInfoSync().windowWidth
      const { detail: { height, width } } = e
      // console.log(windowWidth);
      // console.log(e,'wxParseVideoLoad');
      const rate = width / windowWidth
      const realHeight = height / rate
      results.videoHeight = realHeight;
    } else {//否则展示原来的数据
      const windowWidth = wx.getSystemInfoSync().windowWidth
      const { detail: { height, width } } = e
      // console.log(windowWidth);
      // console.log(e,'wxParseVideoLoad');
      const rate = width / windowWidth
      const realHeight = height / rate
      results.videoHeight = realHeight;
    }

    that.setData({
      [keyH]: results.videoHeight
    })

  })
  query.exec();
}

// 计算视觉优先的图片宽高
function wxAutoImageCal(originalWidth, originalHeight, that, bindName) {
  //获取图片的原始长宽
  var windowWidth = 0, windowHeight = 0;
  var autoWidth = 0, autoHeight = 0;
  var results = {};
  var padding = that.data[bindName].view.imagePadding;

  windowWidth = realWindowWidth - 2 * padding;
  windowHeight = realWindowHeight;

  //判断按照那种方式进行缩放
  // console.log("windowWidth" + windowWidth);
  if (originalWidth > windowWidth) {//在图片width大于手机屏幕width时候
    autoWidth = windowWidth;
    // console.log("autoWidth" + autoWidth);
    autoHeight = (autoWidth * originalHeight) / originalWidth;
    // console.log("autoHeight" + autoHeight);
    results.imageWidth = autoWidth;
    results.imageheight = autoHeight;
  } else {//否则展示原来的数据
    results.imageWidth = originalWidth;
    results.imageheight = originalHeight;
  }

  return results;

}

function wxParseTemArray(temArrayName, bindNameReg, total, that) {
  var array = [];
  var temData = that.data;
  var obj = null;
  for (var i = 0; i < total; i++) {
    var simArr = temData[bindNameReg + i].nodes;
    array.push(simArr);
  }

  temArrayName = temArrayName || 'wxParseTemArray';
  obj = JSON.parse('{"' + temArrayName + '":""}');
  obj[temArrayName] = array;
  that.setData(obj);
}


// 图片点击事件
function wxParseTagATap(e) {

  var that = this;
  var navUrl = e.currentTarget.dataset.src;

  // const isUrl = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/; 

  const isMiniProPath = /^\/pages/.test(navUrl) || /^\/packageMagentoRoute\/pages\/productDetail\?id/.test(navUrl);
  // const isProductDetailPath = 
  // const isMiniProPathForWebView = /^pages\/webview\/webview/.test(navUrl);
  // const isUrl = domainPath.test(navUrl); 

  if (isMiniProPath) {
    wx.navigateTo({
      url: navUrl,
    })
  } else {
    wx.navigateTo({
      url: `/pages/webview/webview?url=${navUrl}`,
    })
  }
  // else{
  //   wx.navigateTo({
  //     url: `/packageMagentoRoute/pages/magentoRoute/magentoRoute?url=${navUrl}`
  //   })
  // }
}

function initSwiper(index, that, bindName) {
  const query = wx.createSelectorQuery();
  query.selectAll('.bcn-mini-pagebuilder-slider-item').boundingClientRect(function (res) {
    // console.log('res==============', res)
    res.forEach((sliderItemEle) => {
      const nodeIndex = sliderItemEle.dataset.nodeIndex;

      if (index.indexOf(nodeIndex) == 0) {

        var nodeKey = `${bindName}`;
        // for (var i of nodeIndex.split('.')){

        //   nodeKey += `.nodes[${i}]`;
        // } 

        const sliderItemOffsetHeight = sliderItemEle.height;

        const sliderItemNodeIndexArr = nodeIndex.split('.');

        const sliderNodeIndexArr = sliderItemNodeIndexArr.slice(0, sliderItemNodeIndexArr.length - 1);

        const sliderNodeIndexDataKey = `swiper_${sliderNodeIndexArr.join('_')}`;

        // console.log('sliderItemNodeIndexArr',sliderItemNodeIndexArr,sliderNodeIndexArr)
        // console.log('sliderNodeIndexDataKey',sliderNodeIndexDataKey)

        sliderItemNodeIndexArr.forEach((i, nodeIndex) => {

          if (nodeIndex != sliderItemNodeIndexArr.length - 1) {
            nodeKey += `.nodes[${i}]`;
          }
        })
        // console.log('index',index)
        // console.log('nodeKey',nodeKey)
        var nodeKeyH = nodeKey + '.height';

        // if (!that.data[nodeKeyH] || that.data[nodeKeyH] < recal.imageheight) {
        //   that.setData({ [nodeKeyH]: recal.imageheight });
        // }

        // console.log('sliderItemOffsetHeight',sliderItemOffsetHeight)
        // console.log('that.data[sliderNodeIndexDataKey]',that.data[sliderNodeIndexDataKey])

        if (!that.data[sliderNodeIndexDataKey] || that.data[sliderNodeIndexDataKey] < sliderItemOffsetHeight) {
          that.setData({
            [nodeKeyH]: sliderItemOffsetHeight,
            [sliderNodeIndexDataKey]: sliderItemOffsetHeight
          });
        }
      }

    })

  })
  query.exec();
}

/**
 * 配置emojis
 * 
 */

// function emojisInit(reg = '', baseSrc = "/wxParse/emojis/", emojis) {
//   HtmlToJson.emojisInit(reg, baseSrc, emojis);
// }

module.exports = {
  wxParse: wxParse,
  wxParseTemArray: wxParseTemArray,
  // emojisInit: emojisInit
}


