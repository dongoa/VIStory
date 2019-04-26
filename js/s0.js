
import {set_op} from "./set_op.js";
import {attributeF} from "./attributeF.js";
var clicked=[];

var new_selection=[];//存储论文编号


function s0(s3,selection,s,type){
    // console.log("更新venues面版");
    console.log("当前venues数据集为：",selection);
    let map_s0={};
    let venues2data={};//存储对应venues2paper论文编号
    for(let paper_i in selection){
        let ii=s.indexOf(selection[paper_i]);
        let venuse = selection[paper_i]["Conference"];
        if(venuse!=undefined)
        map_s0[venuse]==undefined?map_s0[venuse]=1:map_s0[venuse]+=1;
        venues2data[venuse]==undefined?venues2data[venuse]=[ii]:venues2data[venuse].push(ii);
    }
    // console.log("venues面板映射",map_s0);
    // console.log("venues与文章映射对象",venues2data);
    let data=[];
    for(var i in map_s0){
        let tmp= {};
        tmp['name'] = i;
        tmp['num'] = map_s0[i];
        data.push(tmp);
    }
    data.sort((a,b)=>b.num-a.num);
    // console.log(JSON.stringify(venues2data));
    // console.log("venues数组",data);
   // setClick('.venues-body',data,venues2data,s3,s,clicked,new_selection,V2P,type);
    $('.venues-body').children('*').remove();
    var div=d3.select('.venues-body').selectAll('div').data(data).enter()
        .append('div').attr("class",function(d){if(clicked.indexOf(d.name)!=-1) { $(this).css('background', '#98dafc'); d.click=1; }return "text-box";})
        .on('click',function(d){
            if(d.click!=1){
                clicked.push(d.name);
                $(this).css('background', '#98dafc');
                let k=1;
                console.log("--->",new_selection)
                for(var j in venues2data[d.name]){
                    for(var i in new_selection){
                        if(new_selection[i]===venues2data[d.name][j])k=0;
                    }
                    if(k)new_selection.push(venues2data[d.name][j]);
                }
                d.click=1;

            }else {
                var index = clicked.indexOf(d.name);
                if (index > -1) {
                    clicked.splice(index, 1);
                }
                d.click=0;
                $(this).css('background', '');
                // new_selection.filter(function(value,index,arr){
                //     return arr.indexOf(value,index+1) === -1
                // })
                var ans1=[];
                var ans2=[];
                console.log(0,new_selection,V2P[d.name]);
                for(var i in new_selection) {
                    let k=1;
                    for(var j in V2P[d.name]){
                        if(new_selection[i]==V2P[d.name][j])k=0;
                    }
                    if(k)ans1.push(new_selection[i]);
                    // else ans2.push(new_selection[i]);
                }
                new_selection=ans1;

            }


            s3[0] = new_selection.map(function(item,index,array){
                return s[item];
            });
            var ans = set_op(s3,s);

            if(ans.length==s.length)  attributeF([[],[],[]],s,s,-1);
            console.log(0,ans,s3,s);

            attributeF(s3,ans,s,0);
        });
    div.append('span').text(d=>d.name).attr('class', 'text-style');
    div.append('span').text(d=>d.num).attr('class', 'num-style');

}
export {s0};