import {s0} from './s0.js';
import {s1} from './s1.js';
import {s2} from './s2.js';
import {sfig} from './s3.js';
import {set_op} from './set_op.js';
import {draw} from './draw.js';

function attributeF(s3,selection,s,type){
    if(type!=0)
        s0(s3,selection,s,0);
    if(type!=1)
        s1(s3,selection,s,1);
    if(type!=2)
        s2(s3,selection,s,2);
    if(type!=2)
        sfig(s3,selection,s,2);
    var ans=set_op(s3,s);



    $("#selectN").change(function() { attributeF(s3,selection,s,type); });

    console.log("绘制图形数据集为：",ans);
    if(selet==0){
        $('gV').css('border-bottom','5px #49BEAA solid');
        $('.gA').css('border-bottom','5px #ddd solid');
        $('.gK').css('border-bottom','5px #ddd solid');
    }
    if(selet==1){
        $('.gA').css('border-bottom','5px #49BEAA solid');
        $('.gV').css('border-bottom','5px #ddd solid');
        $('.gK').css('border-bottom','5px #ddd solid');
    }
    if(selet==2){
        $('.gK').css('border-bottom','5px #49BEAA solid');
        $('.gA').css('border-bottom','5px #ddd solid');
        $('.gV').css('border-bottom','5px #ddd solid');
    }


    $(".gV").click(function(){
        let nn=$("#selectN option:selected").val();
        $(this).css('border-bottom','5px #49BEAA solid');
        $('.gA').css('border-bottom','5px #ddd solid');
        $('.gK').css('border-bottom','5px #ddd solid');
        $('.gF').css('border-bottom','5px #ddd solid');
        selet=0;
        draw(ans,s,0,nn); });
    $(".gA").click(function(){
        $(this).css('border-bottom','5px #49BEAA solid');
        $('.gV').css('border-bottom','5px #ddd solid');
        $('.gK').css('border-bottom','5px #ddd solid');
        $('.gF').css('border-bottom','5px #ddd solid');
        let nn=$("#selectN option:selected").val();
        // let n=$(".group input").val();
        selet=1;
        draw(ans,s,1,nn); });
    $(".gK").click(function(){
        $(this).css('border-bottom','5px #49BEAA solid');
        $('.gA').css('border-bottom','5px #ddd solid');
        $('.gV').css('border-bottom','5px #ddd solid');
        $('.gF').css('border-bottom','5px #ddd solid');
        let nn=$("#selectN option:selected").val();
        // let n=$(".group input").val();
        selet=2;
        draw(ans,s,2,nn); });


    $(".gF").click(function(){
        $(this).css('border-bottom','5px #49BEAA solid');
        $('.gA').css('border-bottom','5px #ddd solid');
        $('.gV').css('border-bottom','5px #ddd solid');
        $('.gK').css('border-bottom','5px #ddd solid');
        let nn=$("#selectN option:selected").val();
        // let n=$(".group input").val();
        selet=3;
        draw(ans,s,3,nn); });
    // $('.gA').css('border-bottom','5px #49BEAA solid');
    // $('.gV').css('border-bottom','5px #ddd solid');
    // $('.gK').css('border-bottom','5px #ddd solid');
    let nn=$("#selectN option:selected").val();
    // console.log(nn);
    console.log(selet);
    draw(ans,s,selet,nn);
}
export {attributeF};