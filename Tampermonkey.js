// ==UserScript==
// @name         Add12306Calender
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Formax
// @match        https://mail.google.com/*
// @match        https://gmail.com/*
// @match        https://www.gmail.com/*
// @grant        none
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js
// ==/UserScript==

(function() {
    'use strict';
    jQuery(document).ready(function () {

        $(document).keydown(function(e){
            if(e.which == 49 && e.ctrlKey && e.shiftKey){
                var innerContent = $('.Bu')[0].innerHTML;
                var contt=new Object();
                try{
                    contt = decripCR(innerContent,contt);
                    var addUrl="https://www.google.com/calendar/render?action=TEMPLATE&text="+contt.title+"&dates="+contt.start+"/"+contt.end+"&details="+contt.remarkd+"&location="+contt.locat+"&sf=true&output=xml&ctz=Asia/Shanghai";
                    window.open(addUrl);
                }
                catch(e)
                {
                }
            }
        });

        var decripCR = (function(innerHtm,calend){
            var numMatch = innerHtm.match(/EC\d{8}/g);
            var infoMatch = innerHtm.match(/1\..{20,100}元/g);
            var infoContents =infoMatch[0].split(',');
            var timeContents =infoContents[1].split('日');
            var mydate=new Date();
            var newdate;
            if(timeContents[0].length>5){
                newdate = new Date(timeContents[0].replace('年','-').replace('月','-')+" "+timeContents[1].split(':')[0]+":00");
            }
            else{
                var stdate=timeContents[0].split('月');
                newdate= new Date(mydate.getFullYear(),stdate[0]-1,stdate[1],timeContents[1].split(':')[0]);
            }
            if(newdate<mydate){
                newdate.setFullYear(mydate.getFullYear()+1,newdate.getMonth(),newdate.getDate());
            }

            calend.start=newdate.getFullYear()+("0" + (newdate.getMonth()+1)).slice(-2)+("0" + newdate.getDate()).slice(-2)+"T"+("0" + newdate.getHours()).slice(-2)+"0000";
            var enddate = new Date(newdate);
            enddate.setHours(enddate.getHours()+1);
            calend.end   =  enddate.getFullYear()+("0" + (enddate.getMonth()+1)).slice(-2)+("0" + enddate.getDate()).slice(-2)+"T"+("0" + enddate.getHours()).slice(-2)+"0000";
            calend.locat = infoContents[2].split('—')[0]+"火车站";
            calend.title = infoContents[3];
            calend.remarkd ="订单号:"+numMatch[0]+", 座位号:"+infoContents[4];
            return   calend;
        });
    });
})();