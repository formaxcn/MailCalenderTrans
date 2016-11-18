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
            var innerContent = $('div .Bu')[0].innerHTML;
            var contt;
            if(e.which == 49 && e.ctrlKey && e.shiftKey)
            {
                contt = decripCR(innerContent);
            }
            else if(e.which == 65 && e.ctrlKey && e.shiftKey)
            {
                contt = decripYHA(innerContent);
                debugger;
            }
        });

        var decripYHA = (function(innerHtm){
            var calend = new Object();
            calend.start   =   1;
            calend.end   =   2;
            calend.location = innerHtm;
            calend.title = 3;
            calend.remarkd =4;
            return   calend;
        });

        var decripCR = (function(innerHtm){
            var calend = new Object();
            calend.start   =   1;
            calend.end   =   2;
            calend.location = innerHtm;
            calend.title = 3;
            calend.remarkd =4;
            return   calend;
        });
	});
})();