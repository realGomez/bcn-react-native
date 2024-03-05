/**
 * html2Json 改造来自: https://github.com/Jxck/html2json
 * 
 * 
 * author: Di (微信小程序开发工程师)
 * organization: WeAppDev(微信小程序开发论坛)(http://weappdev.com)
 *               垂直微信小程序开发交流社区
 * 
 * github地址: https://github.com/icindy/wxParse
 * 
 * for: 微信小程序富文本解析
 * detail : http://weappdev.com/t/wxparse-alpha0-1-html-markdown/184
 */

var __placeImgeUrlHttps = "https";
// var __emojisReg = '';
// var __emojisBaseSrc = '';
// var __emojis = {};
var __emojisReg = '[]';
var __emojisBaseSrc = '';
var __emojis = {
  "emoji_memo": "📝",
  "emoji_blowing_a_kiss": "😘",
  "emoji_kissing_closed_eyes": "😚",
  "emoji_smiling_open_hands": "🤗",
  "emoji_partying_face": "🥳",
  "emoji_gift": "🎁",
  "emoji_red_heart": "❤",
  "emoji_red_suit": "♥",
  "emoji_heart_with_arrow": "💘",
  "emoji_revolving _hearts": "💞",
  "emoji_purple_heart": "💜",
  "emoji_yellow_heart": "💛",
  "emoji_musical_notes": "🎶",
  "emoji_night_with_stars": "🌃",
  "emoji_gem_stone": "💎",
  "emoji_ring": "💍",
  "emoji_balloon": "🎈",
  "emoji_party_popper": "🎉",
  "emoji_firecracker": "🧨",
  "emoji_new_button": "🆕",
  "emoji_rose": "🌹",
  "emoji_tulip": "🌷",
  "emoji_four_leaf_clover": "🍀",
  "emoji_	cherry_blossom": "🌸",
  "emoji_maple_leaf": "🍁",
  "emoji_fallen_leaf": "🍂",
  "emoji_congratulations": "㊗",
  "emoji_no_vacancy": "🈵",
  "emoji_warning": "⚠️",
  "emoji_high_voltage": "⚡",
  "emoji_money_bag": "💰",
  "emoji_megaphone": "📣",
  "emoji_microphone": "🎤",
  "emoji_camera": "📸",
  "emoji_ribbon": "🎀",
  "emoji_candy": "🍬",
  "emoji_bubbles": "🫧",
  "emoji_rainbow": "🌈",
  "emoji_glowing_star": "🌟",
  "emoji_sparkles": "✨",
  "emoji_dizzy": "💫",
  "emoji_full_moon": "🌕",
  "emoji_sun": "🌞",
  "emoji_hourglass": "⌛",
  "emoji_umbrella_on_ground": "🏖️",
  "emoji_butterfly": "🦋",
  "emoji_mouse": "🐭",
  "emoji_ox": "🐮",
  "emoji_tiger": "🐯",
  "emoji_rabbit": "🐰",
  "emoji_dragon": "🐲",
  "emoji_snake": "🐍",
  "emoji_horse": "🐴",
  "emoji_sheep": "🐑",
  "emoji_monkey": "🐒",
  "emoji_chicken": "🐔",
  "emoji_dog": "🐶",
  "emoji_pig": "🐷",
  "emoji_handclap": "👏",
  "emoji_vulcan_salute": "🖖",
  "emoji_handshake": "🤝",
  "emoji_pointing_left": "👈",
  "emoji_pointing_right": "👉",
  "emoji_pointing_up": "👆",
  "emoji_pointing_down": "👇",
  "emoji_kiss_mark": "💋",
  "emoji_hundred_points": "💯",
  "emoji_watch": "⌚️",
  "emoji_check_mark_button": "✅",
  "emoji_alarm_clock": "⏰",
  "emoji_fire": "🔥",
  "emoji_couple_with_heart": "💏",
  "emoji_holding_hands": "👫",
  "emoji_princess": "👸",
  "emoji_woman_dancing": "💃",
  "emoji_dress": "👗",
  "emoji_hat": "🎩",
  "emoji_sunglasses": "🕶️",
  "emoji_shopping_bags": "🛍",
  "emoji_handbag": "👜",
  "emoji_flag_HK": "🇭🇰",
  "emoji_flag_CN": "🇨🇳",
  // "emoji_Santa_Claus": "🎅",
  // "emoji_christmas_tree": "🎄",
  // "emoji_snowman": "⛄",
  // "emoji_jack_o_lantern": "🎃"

};
var wxDiscode = require('./wxDiscode.js');
var HTMLParser = require('./htmlparser.js');
// Empty Elements - HTML 5
var empty = makeMap("area,base,basefont,br,col,frame,hr,img,input,link,meta,param,embed,command,keygen,source,track,wbr");
// Block Elements - HTML 5
var block = makeMap("br,a,code,address,article,applet,aside,audio,blockquote,button,canvas,center,dd,del,dir,div,dl,dt,fieldset,figcaption,figure,footer,form,frameset,h1,h2,h3,h4,h5,h6,header,hgroup,hr,iframe,ins,isindex,li,map,menu,noframes,noscript,object,ol,output,p,pre,section,script,table,tbody,td,tfoot,th,thead,tr,ul,video");

// Inline Elements - HTML 5
var inline = makeMap("abbr,acronym,applet,b,basefont,bdo,big,button,cite,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var");

// Elements that you can, intentionally, leave open
// (and which close themselves)
var closeSelf = makeMap("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr");

// Attributes that have their values filled in disabled="disabled"
var fillAttrs = makeMap("checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected");

// Special Elements (can contain anything)
var special = makeMap("wxxxcode-style,script,style,view,scroll-view,block");
function makeMap(str) {
  var obj = {}, items = str.split(",");
  for (var i = 0; i < items.length; i++)
    obj[items[i]] = true;
  return obj;
}

function q(v) {
  return '"' + v + '"';
}

function removeDOCTYPE(html) {
  return html
    .replace(/<\?xml.*\?>\n/, '')
    .replace(/<.*!doctype.*\>\n/, '')
    .replace(/<.*!DOCTYPE.*\>\n/, '');
}

function trimHtml(html) {
  return html
    .replace(/\r?\n+/g, '')
    .replace(/<!--.*?-->/ig, '')
    .replace(/\/\*.*?\*\//ig, '')
    .replace(/[ ]+</ig, '<')
}


function html2json(html, bindName, previewImageId = '') {
  //处理字符串
  html = removeDOCTYPE(html);
  html = trimHtml(html);
  html = wxDiscode.strDiscode(html);
  //生成node节点
  var bufArray = [];
  var results = {
    node: bindName,
    nodes: [],
    images: [],
    imageUrls: [],
    videos: [],
    videoUrls: []
  };
  var index = 0;
  HTMLParser(html, {
    start: function (tag, attrs, unary) {
      //debug(tag, attrs, unary);
      // node for this element
      var node = {
        node: 'element',
        tag: tag,
      };

      if (bufArray.length === 0) {
        node.index = index.toString()
        index += 1
      } else {
        var parent = bufArray[0];
        var parentPreV = bufArray[1];
        if (parent.nodes === undefined) {
          parent.nodes = [];
        }
        node.index = parent.index + '.' + parent.nodes.length;
        node.parentClassStr = parent.classStr;
        node.parentPageBuilderContentType = parent.attr ? parent.attr['data-content-type'] : '';

        // const autoFitA = parent && parent.classStr ? parent.classStr.indexOf('auto-fit') != -1 : false;
        // const autoFitB = parentPreV && parentPreV.classStr ? parentPreV.classStr.indexOf('auto-fit') != -1 : false;
        // node.imageAutoFit = autoFitA || autoFitB;
      }

      if (block[tag]) {
        node.tagType = "block";
      } else if (inline[tag]) {
        node.tagType = "inline";
      } else if (closeSelf[tag]) {
        node.tagType = "closeSelf";
      }

      if (attrs.length !== 0) {
        node.attr = attrs.reduce(function (pre, attr) {
          var name = attr.name;
          var value = attr.value;
          if (name == 'class') {
            // console.dir(value);
            //  value = value.join("")
            node.classStr = value;
          }
          // has multi attibutes
          // make it array of attribute
          if (name == 'style') {
            //  value = value.join("")
            node.styleStr = value;
          }
          if (value.match(/ /)) {
            value = value.split(' ');
          }

          // page builder
          if (name == 'data-content-type') {
            node.pageBuilderContentType = value
          }


          // if attr already exists
          // merge it
          if (pre[name]) {
            if (Array.isArray(pre[name])) {
              // already array, push to last
              pre[name].push(value);
            } else {
              // single value, make it array
              pre[name] = [pre[name], value];
            }
          } else {
            // not exist, put it
            pre[name] = value;
          }

          return pre;
        }, {});
      }

      //对img添加额外数据
      if (node.tag === 'img') {
        node.imgIndex = results.images.length;
        var imgUrl = node.attr.src.replace(/cache\/.*?\//, '');
        if (imgUrl[0] == '') {
          imgUrl.splice(0, 1);
        }
        imgUrl = wxDiscode.urlToHttpUrl(imgUrl, __placeImgeUrlHttps);
        node.attr.src = imgUrl;
        node.from = bindName;
        results.images.push(node);
        results.imageUrls.push(imgUrl);

        if (bufArray.length > 0) {

          var parent = bufArray[0];
          var parentPreV = bufArray[1];
          if (parent.nodes === undefined) {
            parent.nodes = [];
          }
          // node.parentClassStr = parent.classStr;
          const autoFitA = parent && parent.classStr ? parent.classStr.indexOf('auto-fit') != -1 : false;
          const autoFitB = parentPreV && parentPreV.classStr ? parentPreV.classStr.indexOf('auto-fit') != -1 : false;
          node.imageAutoFit = autoFitA || autoFitB;
          node.clickToZoom = parent.tag == "figure" && previewImageId == 'previewImage';
          node.parentPrevIndex = parentPreV ? parentPreV.index : '';

        }


        if (bufArray.length > 4) {
          var parent = bufArray[4];
          var parentPreV = bufArray[3];

          node.pageBuilderSliderImage = parent.attr && parent.attr['data-content-type'] == "slider" || (parentPreV.attr && parentPreV.attr['data-content-type'] == "slider")
        }
      }

      if (node.tag === 'video') {
        node.videoIndex = results.videos.length;
        node.from = bindName;
        results.videos.push(node);
        results.videoUrls.push(node.attr.src);

        if (bufArray.length > 7) {
          var parent = bufArray[7];
          var parentPreV = bufArray[6];

          node.hideVideoPlayer = parent.attr && parent.attr['data-content-type'] == "slider" || (parentPreV.attr && parentPreV.attr['data-content-type'] == "slider")
        }

      }

      // if(node.tag === 'video'){
      //     node.attr.src = results.source;
      //     node.from = bindName;
      //     results.videos.push(node);
      //     results.videoUrls.push(node.attr.src);
      //     delete results.source;
      // }

      // 处理font标签样式属性
      if (node.tag === 'font') {
        var fontSize = ['x-small', 'small', 'medium', 'large', 'x-large', 'xx-large', '-webkit-xxx-large'];
        var styleAttrs = {
          'color': 'color',
          'face': 'font-family',
          'size': 'font-size'
        };
        if (!node.attr.style) node.attr.style = [];
        if (!node.styleStr) node.styleStr = '';
        for (var key in styleAttrs) {
          if (node.attr[key]) {
            var value = key === 'size' ? fontSize[node.attr[key] - 1] : node.attr[key];
            node.attr.style.push(styleAttrs[key]);
            node.attr.style.push(value);
            node.styleStr += styleAttrs[key] + ': ' + value + ';';
          }
        }
      }

      //临时记录source资源
      if (node.tag === 'source') {
        results.source = node.attr.src;
      }

      if (unary) {
        // if this tag doesn't have end tag
        // like <img src="hoge.png"/>
        // add to parents
        var parent = bufArray[0] || results;
        if (parent.nodes === undefined) {
          parent.nodes = [];
        }
        parent.nodes.push(node);
      } else {
        bufArray.unshift(node);
      }
    },
    end: function (tag) {
      //debug(tag);
      // merge into parent tag
      var node = bufArray.shift();
      if (node.tag !== tag) console.error('invalid state: mismatch end tag');

      // 当有缓存source资源时于于video补上src资源
      if (node.tag === 'video' && results.source) {
        node.videoIndex = results.videos.length;
        node.attr.src = results.source;
        node.from = bindName;
        results.videos.push(node);
        delete results.source;
      }

      if (bufArray.length === 0) {
        results.nodes.push(node);
      } else {
        var parent = bufArray[0];
        if (parent.nodes === undefined) {
          parent.nodes = [];
        }
        parent.nodes.push(node);
      }
    },
    chars: function (text) {
      //debug(text);
      var parent = bufArray[0];
      var textAfterFilter = text;
      if (parent && parent.classStr == 'price') {
        textAfterFilter = text.replace(' ', '');
      }

      var node = {
        node: 'text',
        text: textAfterFilter,
        textArray: transEmojiStr(textAfterFilter)
      };

      if (bufArray.length === 0) {
        node.index = index.toString()
        index += 1
        results.nodes.push(node);
      } else {
        var parent = bufArray[0];
        if (parent.nodes === undefined) {
          parent.nodes = [];
        }

        // gomez bcn
        if (parent.tag == "ol" || parent.tag == "ul" || parent.tag == "tr" || parent.tag == "tbody" || parent.tag == "thead" || parent.tag == "table") {

        } else {
          node.index = parent.index + '.' + parent.nodes.length
          parent.nodes.push(node);
        }
      }
    },
    comment: function (text) {
      //debug(text);
      // var node = {
      //     node: 'comment',
      //     text: text,
      // };
      // var parent = bufArray[0];
      // if (parent.nodes === undefined) {
      //     parent.nodes = [];
      // }
      // parent.nodes.push(node);
    },
  });
  // const nodes = results.nodes

  //Bcn Issac deep filter

  // results.nodes = filterNodes(nodes)
  return results;

};

function transEmojiStr(str) {

  // console.log('str',str);
  // var eReg = new RegExp("["+__reg+' '+"]");
  //   str = str.replace(/\[([^\[\]]+)\]/g,':$1:')

  var emojiObjs = [];
  //如果正则表达式为空
  if (__emojisReg.length == 0 || !__emojis) {
    var emojiObj = {}
    emojiObj.node = "text";
    emojiObj.text = str;
    array = [emojiObj];
    return array;
  }
  //这个地方需要调整
  str = str.replace(/\[([^\[\]]+)\]/g, ':$1:')
  var eReg = new RegExp("[:]");
  var array = str.split(eReg);
  for (var i = 0; i < array.length; i++) {
    var ele = array[i];
    var emojiObj = {};
    if (__emojis[ele]) {
      emojiObj.node = "element";
      emojiObj.tag = "emoji";
      emojiObj.text = __emojis[ele];
      emojiObj.baseSrc = __emojisBaseSrc;
    } else {
      emojiObj.node = "text";
      emojiObj.text = ele;
    }
    emojiObjs.push(emojiObj);
  }

  return emojiObjs;
}

// function emojisInit(reg = '', baseSrc = "/wxParse/emojis/", emojis) {
//   __emojisReg = reg;
//   __emojisBaseSrc = baseSrc;
//   __emojis = emojis;
// }

module.exports = {
  html2json: html2json,
  // emojisInit: emojisInit
};

