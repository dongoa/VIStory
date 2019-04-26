
import {set_op} from "./set_op.js";
import {attributeF} from "./attributeF.js";
var new_selection=[];
var clicked=[];

function s1(s3,selection,s,type){
    // console.log("更新authors面版");
    // console.log("当前authors数据集为：",selection);
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

    // console.log("authors面板映射",map_s1);
    // console.log("authors与文章映射对象",authors2data);
    // console.log(JSON.stringify(authors2data));
    let data=[];
    for(var i in map_s1){
        let tmp= {};
        tmp['name'] = i;
        tmp['num'] = map_s1[i];
        data.push(tmp);
    }
    data.sort((a,b)=>b.num-a.num);

    $('.author-body').children('*').remove();
    var div=d3.select('.author-body').selectAll('div').data(data).enter()
        .append('div').attr("class",function(d){if(clicked.indexOf(d.name)!=-1) { $(this).css('background', '#98dafc'); d.click=1; }return "text-box";})
        .on('click',function(d){
            if(d.click!=1){
                clicked.push(d.name);
                $(this).css('background', '#98dafc');
                let k=1;
                console.log("--->",new_selection)
                for(var j in authors2data[d.name]){
                    for(var i in new_selection){
                        if(new_selection[i]===authors2data[d.name][j])k=0;
                    }
                    if(k)new_selection.push(authors2data[d.name][j]);
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
                console.log(1,new_selection,A2P[d.name]);
                for(var i in new_selection) {
                    let k=1;
                    for(var j in A2P[d.name]){
                        if(new_selection[i]==A2P[d.name][j])k=0;
                    }
                    if(k)ans1.push(new_selection[i]);
                    // else ans2.push(new_selection[i]);
                }
                new_selection=ans1;

            }


            s3[1] = new_selection.map(function(item,index,array){
                return s[item];
            });
            var ans = set_op(s3,s);

            if(ans.length==s.length)  attributeF([[],[],[]],s,s,-1);
            console.log(1,ans,s3,s);

            attributeF(s3,ans,s,1);
        });
    div.append('span').text(d=>d.name).attr('class', 'text-style');
    div.append('span').text(d=>d.num).attr('class', 'num-style');
}
export {s1};