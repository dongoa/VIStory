import {s0} from './s0.js';
import {s1} from './s1.js';
import {s2} from './s2.js';
import {set_op} from './set_op.js';
import {draw} from './draw.js';
function attributeF(s3,selection,s,type){
    if(type!=0)
        s0(s3,selection,s,0);
    if(type!=1)
        s1(s3,selection,s,1);
    if(type!=2)
        s2(s3,selection,s,2);
    var ans=set_op(s3,s);
<<<<<<< HEAD
    console.log("绘制图形数据集为：",ans);

    $(".gV").click(function(){
        // let n=$(".group input").val();
=======
    $(".gV").click(function(){
>>>>>>> b17ded47996912a17a312d0c8fe9495016ccd0e0
        $(this).css('border-bottom','5px #49BEAA solid');
        $('.gA').css('border-bottom','5px #ddd solid');
        $('.gK').css('border-bottom','5px #ddd solid');
        draw(ans,s,0,3); });
    $(".gA").click(function(){
        $(this).css('border-bottom','5px #49BEAA solid');
        $('.gV').css('border-bottom','5px #ddd solid');
        $('.gK').css('border-bottom','5px #ddd solid');
<<<<<<< HEAD
        // let n=$(".group input").val();
=======
>>>>>>> b17ded47996912a17a312d0c8fe9495016ccd0e0
        draw(ans,s,1,3); });
    $(".gK").click(function(){
        $(this).css('border-bottom','5px #49BEAA solid');
        $('.gA').css('border-bottom','5px #ddd solid');
        $('.gV').css('border-bottom','5px #ddd solid');
<<<<<<< HEAD
        // let n=$(".group input").val();
=======
>>>>>>> b17ded47996912a17a312d0c8fe9495016ccd0e0
        draw(ans,s,2,3); });
    $('.gA').css('border-bottom','5px #49BEAA solid');
    $('.gV').css('border-bottom','5px #ddd solid');
    $('.gK').css('border-bottom','5px #ddd solid');
    draw(ans,s,1,3);
}
export {attributeF};