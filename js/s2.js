import {attributeF} from './attributeF.js';
import {set_op} from "./set_op.js";
var new_selection=[];
var clicked=[];
function s2(s3,selection,s){
    let map_s2={};
    let keywords2data={};
    for(let paper_i in selection){
        let ii=s.indexOf(selection[paper_i]);
        let keywords = selection[paper_i]["Author Keywords"];
        if(keywords!=undefined){
            let keyword_arr=keywords.split(',');
            for(let i in keyword_arr){
                let key_arr = keyword_arr[i].split(";");
                for(let j in key_arr){
                    let keyword = key_arr[j].toLocaleLowerCase().replace(/(^\s*)|(\s*$)/g, "").replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
                    // console.log(keyword);
                    if(keyword!=""&&keyword!='Visualization'&&keyword!='Visual Analytics'&&keyword!='Information Visualization') {
                        map_s2[keyword] == undefined ? map_s2[keyword] = 1 : map_s2[keyword] += 1;
                        keywords2data[keyword] == undefined ? keywords2data[keyword] = [ii] : keywords2data[keyword].push(ii);
                    }
                }
            }
        }
    }
    let data=[];
    for(var i in map_s2){
        let tmp= {};
        tmp['name'] = i;
        tmp['num'] = map_s2[i];
        let sumfig=0;
        for(let j in K2P[i]){

            sumfig+=figure2data[j][0].fignums;
        }
        tmp['fignum']=sumfig;

        data.push(tmp);
    }
    data.sort((a,b)=>b.num-a.num);
    $('.keyword-body').children('*').remove();
    var div=d3.select('.keyword-body').selectAll('div').data(data).enter()
        .append('div').attr("class",function(d){if(clicked.indexOf(d.name)!=-1) { $(this).css('background', '#98dafc'); d.click=1; }return "text-box";})
        .on('click',function(d){
            if(d.click!=1){
                clicked.push(d.name);
                $(this).css('background', '#98dafc');

                for(var j in keywords2data[d.name]){
                    let k=1;
                    for(var i in new_selection){
                        if(new_selection[i]===keywords2data[d.name][j])k=0;
                    }
                    if(k)new_selection.push(keywords2data[d.name][j]);
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
                    for(var j in K2P[d.name]){
                        if(new_selection[i]==K2P[d.name][j])k=0;
                    }
                    if(k)ans1.push(new_selection[i]);
                }
                new_selection=ans1;
            }
            s3[2] = new_selection.map(function(item){
                return s[item];
            });
            var ans = set_op(s3,s);
            if(ans.length==s.length)  attributeF([[],[],[],[]],s,s,-1);
            attributeF(s3,ans,s,2);
        });
    div.append('span').text(d=>d.name).attr('class', 'text-style');
    div.append('span').text(d=>"("+d.num+")").attr('class', 'num-style');

    $("#BBB").click(function(){
        let n = $("#BBBnum");
        let n1=n[0].innerHTML;
        let n2=++n1;
        n[0].innerHTML=n2;

        var a = $(".keyword-body > .text-box");
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

    $("#BBB2").click(function(){
        let n = $("#BBBnum");
        let n1=n[0].innerHTML;
        let n2=--n1;
        n[0].innerHTML=n2;

        var a = $(".keyword-body > .text-box");
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
}
export {s2};