import {set_op} from "./set_op.js";
import {attributeF} from "./attributeF.js";
var clicked=[];
var new_selection=[];
function s0(s3,selection,s){
    let map_s0={};
    let venues2data={};
    for(let paper_i in selection){
        let ii=s.indexOf(selection[paper_i]);
        let venuse = selection[paper_i]["Conference"];
        if(venuse!=undefined)
        map_s0[venuse]==undefined?map_s0[venuse]=1:map_s0[venuse]+=1;
        venues2data[venuse]==undefined?venues2data[venuse]=[ii]:venues2data[venuse].push(ii);
    }
    let data=[];
    for(var i in map_s0){
        let tmp= {};
        tmp['name'] = i;
        tmp['num'] = map_s0[i];
        let sumfig=0;
        for(let j in V2P[i]){

            sumfig+=figure2data[j][0].fignums;
        }
        tmp['fignum']=sumfig;
        data.push(tmp);
    }
    data.sort((a,b)=>b.num-a.num);
    $('.venues-body').children('*').remove();
    var div=d3.select('.venues-body').selectAll('div').data(data).enter()
        .append('div').attr("class",function(d){if(clicked.indexOf(d.name)!=-1) { $(this).css('background', '#98dafc'); d.click=1; }return "text-box";})
        .on('click',function(d){
            if(d.click!=1){
                clicked.push(d.name);
                $(this).css('background', '#98dafc');
                console.log("--->",new_selection)
                for(var j in venues2data[d.name]){
                    let k=1;
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
                var ans1=[];
                for(var i in new_selection) {
                    let k=1;
                    for(var j in V2P[d.name]){
                        if(new_selection[i]==V2P[d.name][j])    k=0;
                    }
                    if(k)ans1.push(new_selection[i]);
                }
                new_selection=ans1;
            }
            s3[0] = new_selection.map(function(item){
                return s[item];
            });
            var ans = set_op(s3,s);
            if(ans.length==s.length)  attributeF([[],[],[]],s,s,-1);
            attributeF(s3,ans,s,0);
        });
    div.append('span').text(d=>d.name).attr('class', 'text-style');
    div.append('span').text(d=>d.num).attr('class', 'num-style');
    div.append("span").text(d=>d.fignum).attr("class","num-figures").style("left",function(d){
        if(d.fignum>1000){
            return '-20px';
        }
        if(d.num>100){
            return '-12px';
        }
        if(d.num>10){
            return '-8px';
        }
        return '-2px';
    });
}
export {s0};