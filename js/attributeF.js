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

    console.log("绘制图形数据集为：",ans);



    $(".gV").click(function(){
        let nn=$("#selectN").val();
        $(this).css('border-bottom','5px #49BEAA solid');
        $('.gA').css('border-bottom','5px #ddd solid');
        $('.gK').css('border-bottom','5px #ddd solid');
        draw(ans,s,0,nn); });
    $(".gA").click(function(){
        $(this).css('border-bottom','5px #49BEAA solid');
        $('.gV').css('border-bottom','5px #ddd solid');
        $('.gK').css('border-bottom','5px #ddd solid');
        let nn=$("#selectN").val();
        // let n=$(".group input").val();

        draw(ans,s,1,nn); });
    $(".gK").click(function(){
        $(this).css('border-bottom','5px #49BEAA solid');
        $('.gA').css('border-bottom','5px #ddd solid');
        $('.gV').css('border-bottom','5px #ddd solid');
        let nn=$("#selectN").val();
        // let n=$(".group input").val();

        draw(ans,s,2,nn); });
    $('.gA').css('border-bottom','5px #49BEAA solid');
    $('.gV').css('border-bottom','5px #ddd solid');
    $('.gK').css('border-bottom','5px #ddd solid');
    draw(ans,s,1,3);
}
export {attributeF};