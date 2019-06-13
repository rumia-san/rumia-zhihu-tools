// ==UserScript==
// @name         Rumia_Zhihu_tools
// @namespace    https://www.zhihu.com/people/lu-mi-ya-56
// @version      0.12
// @description  露米娅写的知乎脚本、是~这样吗~
// @author       Rumia
// @match        *://*.zhihu.com/*
// @require      http://code.jquery.com/jquery-3.4.1.min.js
// @grant        none
// ==/UserScript==

'use strict';

var 已经首行缩进 = false;
function 首行缩进函数() {
    if(已经首行缩进){
       $("div.RichText").css("text-indent", "");
        已经首行缩进 = false;
    } else {
       $("div.RichText").css("text-indent", "2em");
        已经首行缩进 = true;
    }
}

function 添加首行缩进按钮函数() {
    var 右箭头SVG代码 = '<svg title="回到顶部" fill="currentColor" viewBox="0 0 24 24" width="24" height="24"><path d="M16.036 19.59a1 1 0 0 1-.997.995H9.032a.996.996 0 0 1-.997-.996v-7.005H5.03c-1.1 0-1.36-.633-.578-1.416L11.33 4.29a1.003 1.003 0 0 1 1.412 0l6.878 6.88c.782.78.523 1.415-.58 1.415h-3.004v7.005z" transform="rotate(90 12 12)"></path></svg>';
    var 按钮html代码 = '<div class="CornerAnimayedFlex"><button id="首行缩进按钮id" data-tooltip="首行缩进" data-tooltip-position="left" data-tooltip-will-hide-on-click="true" aria-label="首行缩进" type="button" class="Button CornerButton Button--plain">'+右箭头SVG代码+'</button></div>';
    $("div.CornerButtons").prepend(按钮html代码);
    $("button#首行缩进按钮id").click(首行缩进函数);
}

var 已经夜间模式 = false;
function 夜间模式函数() {
    if(已经夜间模式){
        $("div#夜间模式div的id").remove();
        已经夜间模式 = false;
    } else {
        var 夜间模式div代码 = '<div id="夜间模式div的id" style="width: 100%; height: 100%; position:fixed; top:0;left:0; z-index:99999;pointer-events:none;"></div>'
        $("body").append(夜间模式div代码);
        $("div#夜间模式div的id").css("background-color", "rgb(32,32,0)");
        $("div#夜间模式div的id").css("opacity", "0.6");
        已经夜间模式 = true;
    }
}

function 添加夜间模式按钮函数() {
    var 月亮SVG代码 = '<svg class="svg-icon" fill="currentColor" viewBox="0 0 20 20"><path d="M10.544,8.717l1.166-0.855l1.166,0.855l-0.467-1.399l1.012-0.778h-1.244L11.71,5.297l-0.466,1.244H10l1.011,0.778L10.544,8.717z M15.986,9.572l-0.467,1.244h-1.244l1.011,0.777l-0.467,1.4l1.167-0.855l1.165,0.855l-0.466-1.4l1.011-0.777h-1.244L15.986,9.572z M7.007,6.552c0-2.259,0.795-4.33,2.117-5.955C4.34,1.042,0.594,5.07,0.594,9.98c0,5.207,4.211,9.426,9.406,9.426c2.94,0,5.972-1.354,7.696-3.472c-0.289,0.026-0.987,0.044-1.283,0.044C11.219,15.979,7.007,11.759,7.007,6.552 M10,18.55c-4.715,0-8.551-3.845-8.551-8.57c0-3.783,2.407-6.999,5.842-8.131C6.549,3.295,6.152,4.911,6.152,6.552c0,5.368,4.125,9.788,9.365,10.245C13.972,17.893,11.973,18.55,10,18.55 M19.406,2.304h-1.71l-0.642-1.71l-0.642,1.71h-1.71l1.39,1.069l-0.642,1.924l1.604-1.176l1.604,1.176l-0.642-1.924L19.406,2.304z"></path></svg>'
    var 按钮html代码 = '<div class="CornerAnimayedFlex"><button id="夜间模式按钮id" data-tooltip="夜间模式" data-tooltip-position="left" data-tooltip-will-hide-on-click="true" aria-label="夜间模式" type="button" class="Button CornerButton Button--plain">'+月亮SVG代码+'</button></div>';
    $("div.CornerButtons").prepend(按钮html代码);
    $("button#夜间模式按钮id").click(夜间模式函数);
}

function 获取用户ID(){
    var 用户ID对象 = JSON.parse($("div#root").children("div").attr("data-zop-usertoken"));
    return 用户ID对象.urlToken;
}

function 获取关注话题URL(){
    return "/api/v4/members/"+获取用户ID()+"/following-topic-contributions?include=data%5B*%5D.topic.introduction&offset=0&limit=20"
}


function 生成关注话题li(关注话题名称, 关注话题id){
    return '<li class="GlobalSideBar-navItem GlobalSideBar-starItem"><a href="/topic/'+关注话题id+'/" target="_blank" data-za-not-track-link="true" type="button" class="Button GlobalSideBar-navLink Button--plain">'+关注话题名称+'</a></li>';
}

var 已经添加关注话题列表 = false;
var 首次添加关注话题列表 = true;
function 添加关注话题列表函数(){
    if(首次添加关注话题列表){
        $("div.Topstory-container").css("width", "1200px");
        $("div.Topstory-container").append('<div id="关注话题列表id" class="Sticky"><div class="Card"><ul id="关注话题列表id" class="GlobalSideBar-navList"></ul></div></div>');
        $.get(获取关注话题URL(),function(res,status){
            for(var i = 0; i < res.data.length; i++){
                var 关注话题名称 = res.data[i].topic.name;
                var 关注话题id = res.data[i].topic.id;
                $("ul#关注话题列表id").append(生成关注话题li(关注话题名称, 关注话题id));
            }
        });
        $("div#关注话题列表id").css("margin-left", "10px");
        首次添加关注话题列表 = false;
        已经添加关注话题列表 = true;
    } else if (已经添加关注话题列表) {
        $("div#关注话题列表id").hide();
        $("div.Topstory-container").css("width", "1000px");
        已经添加关注话题列表 = false;
    } else {
        $("div#关注话题列表id").show();
        $("div.Topstory-container").css("width", "1200px");
        已经添加关注话题列表 = true;
    }
}

function 添加查看关注话题按钮函数() {
    if(document.domain == "zhuanlan.zhihu.com")
        return;
    var SVG代码 = '<svg class="svg-icon" viewBox="0 0 20 20" fill="currentColor"><path d="M14.999,8.543c0,0.229-0.188,0.417-0.416,0.417H5.417C5.187,8.959,5,8.772,5,8.543s0.188-0.417,0.417-0.417h9.167C14.812,8.126,14.999,8.314,14.999,8.543 M12.037,10.213H5.417C5.187,10.213,5,10.4,5,10.63c0,0.229,0.188,0.416,0.417,0.416h6.621c0.229,0,0.416-0.188,0.416-0.416C12.453,10.4,12.266,10.213,12.037,10.213 M14.583,6.046H5.417C5.187,6.046,5,6.233,5,6.463c0,0.229,0.188,0.417,0.417,0.417h9.167c0.229,0,0.416-0.188,0.416-0.417C14.999,6.233,14.812,6.046,14.583,6.046 M17.916,3.542v10c0,0.229-0.188,0.417-0.417,0.417H9.373l-2.829,2.796c-0.117,0.116-0.71,0.297-0.71-0.296v-2.5H2.5c-0.229,0-0.417-0.188-0.417-0.417v-10c0-0.229,0.188-0.417,0.417-0.417h15C17.729,3.126,17.916,3.313,17.916,3.542 M17.083,3.959H2.917v9.167H6.25c0.229,0,0.417,0.187,0.417,0.416v1.919l2.242-2.215c0.079-0.077,0.184-0.12,0.294-0.12h7.881V3.959z"></path></svg>'
    var 按钮html代码 = '<div class="CornerAnimayedFlex"><button id="查看关注话题按钮id" data-tooltip="关注话题" data-tooltip-position="left" data-tooltip-will-hide-on-click="true" aria-label="关注话题" type="button" class="Button CornerButton Button--plain">'+SVG代码+'</button></div>';
    $("div.CornerButtons").prepend(按钮html代码);
    $("button#查看关注话题按钮id").click(添加关注话题列表函数);
}

function 修复知乎悬浮按钮被遮挡函数() {
    //知乎文章页面有个BUG，悬浮按钮会被网页底部的「赞同、评论、分享、收藏」一栏遮挡，用z-index修复
    $("div.CornerButtons").css("z-index", "5");
}

添加首行缩进按钮函数();
添加夜间模式按钮函数();
添加查看关注话题按钮函数();
修复知乎悬浮按钮被遮挡函数();