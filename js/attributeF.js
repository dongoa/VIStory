import {s0} from './s0.js';
import {s1} from './s1.js';
import {s2} from './s2.js';
import {set_op} from './set_op.js';
import {draw} from './draw.js';
function attributeF(s3,selection,s,type,figure_root){
    // console.log("查看当前选择集数据",selection);
    if(type!=0)
        s0(s3,selection,s,0);
    if(type!=1)
        s1(s3,selection,s,1);
    if(type!=2)
        s2(s3,selection,s,2);

    var ans=set_op(s3,s);
    console.log("绘制图形数据集为：",ans);
    draw(ans,s,0,3,figure_root);
}
export {attributeF};