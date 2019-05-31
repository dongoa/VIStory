import {attributeF} from './attributeF.js';
var paper_data=PAPER;
attributeF([[],[],[],[]],paper_data,paper_data,-1);
var hei=$('.item1').height();
console.log(hei);
var div=document.getElementById('');


// for(var i in V2P){
//     let c=V2P[i];
//     console.log(i);
//     for(var j in c){
//
//     }
// }
// var x={"> 20":[],"10-20":[],"5-10":[],"< 5":[]};
// for(let i=0;i<=1171;i++){
//     let a=figure2data[i][0].fignums;
//     if(a>20) x["> 20"].push(i);
//     else if(a>10) x["10-20"].push(i);
//     else if(a>5) x["5-10"].push(i);
//     else x["< 5"].push(i);
//
//
// }
// console.log(JSON.stringify(x));
var ww = $('.item1').width();
if(ww<230) $('.tag_occurrence').css("display","none");
$('.venues-body').css('height',hei*0.03).css("margin-bottom",hei*0.005);
$('.author-body').css('height',hei*0.35).css("margin-bottom",hei*0.015);
$('.keyword-body').css('height',hei*0.35).css("margin-bottom",hei*0.015);
$('.Fig-body').css('height',hei*0.03).css("margin-bottom",hei*0.01);

$('.venues-head').css('height',hei*0.04);
$('.venues-head').css('font-size',hei*0.025);
$('.author-head').css('height',hei*0.04).css('font-size',hei*0.025);
$('.keyword-head').css('height',hei*0.04).css('font-size',hei*0.025);
$('.Fig-head').css('height',hei*0.04).css('font-size',hei*0.025);
if(ww<230)$('.Fig-head').css('font-size',hei*0.020);
$("#AAA").click(function(){
    let n = $("#AAAnum");
    let n1=n[0].innerHTML;
    let n2=parseInt(n1)+1;
    n[0].innerHTML=n2;
    // alert(n2);
    var a = $(".author-body > .text-box");
    for(let i of a){
        // console.log(i);

        let s = i.children[1].innerHTML;
        let s2 = parseInt(s.substr(1, s.length-1));
        // console.log(s2);
        if(s2>n2){
            // console.log(i);
            i.style.display='inline-block';
        }
        else {
            // console.log(i);
            i.style.display='none';
        }




    }




})
