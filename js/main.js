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



$('.venues-body').css('height',hei*0.04);
$('.author-body').css('height',hei*0.32);
$('.keyword-body').css('height',hei*0.29);
$('.Fig-body').css('height',hei*0.10);

$('.venues-head').css('height',hei*0.04);
$('.author-head').css('height',hei*0.04);
$('.keyword-head').css('height',hei*0.04);
$('.Fig-head').css('height',hei*0.04);

