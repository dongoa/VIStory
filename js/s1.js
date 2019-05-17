import {set_op} from "./set_op.js";
import {attributeF} from "./attributeF.js";
var new_selection=[];
var clicked=[];
function s1(s3,selection,s){
    let map_s1={};
    let authors2data={};
    for(let paper_i in selection){
        let ii=s.indexOf(selection[paper_i]);
        let authors = selection[paper_i]["Author Names"];
        if(authors!=undefined){
            let author_arr=authors.split(';');
            for(let i in author_arr){
                let author = author_arr[i];
                map_s1[author]==undefined?map_s1[author]=1:map_s1[author]+=1;
                authors2data[author]==undefined?authors2data[author]=[ii]:authors2data[author].push(ii);
            }
        }
    }
    let data=[];
    for(var i in map_s1){
        let tmp= {};
        tmp['name'] = i;
        tmp['num'] = map_s1[i];
        let sumfig=0;
        for(let j in A2P[i]){

            sumfig+=figure2data[j][0].fignums;
        }
        tmp['fignum']=sumfig;
        data.push(tmp);
    }
    data.sort((a,b)=>b.num-a.num);
    $('.author-body').children('*').remove();
    var div=d3.select('.author-body').selectAll('div').data(data).enter()
        .append('div').attr("class",function(d){if(clicked.indexOf(d.name)!=-1) { $(this).css('background', '#98dafc'); d.click=1; }return "text-box";})
        .on('click',function(d){
            console.log("修改之前的selection",new_selection);
            if(d.click!=1){
                clicked.push(d.name);
                $(this).css('background', '#98dafc');

                for(var j in authors2data[d.name]){
                    let k=1;
                    for(var i in new_selection){

                        if(new_selection[i]===authors2data[d.name][j]) {  console.log(new_selection[i],authors2data[d.name][j]); k=0;}
                    }
                    if(k){  console.log("插入的编号",authors2data[d.name][j]);  new_selection.push(authors2data[d.name][j]);}
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
                    for(var j in A2P[d.name]){
                        if(new_selection[i]==A2P[d.name][j])k=0;
                    }
                    if(k)ans1.push(new_selection[i]);
                }
                new_selection=ans1;
            }
            s3[1] = new_selection.map(function(item){
                return s[item];
            });
            console.log(s3[1],A2P["Shixia Liu"],new_selection);
            var ans = set_op(s3,s);
            if(ans.length==s.length)  attributeF([[],[],[]],s,s,-1);
            attributeF(s3,ans,s,1);
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
            return '-12px';
        }
        return '-5px';
    });;
}
export {s1};