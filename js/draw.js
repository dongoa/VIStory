import {groupArray} from './groupArray.js';
import {r} from './r.js';
import {positioneachG} from './positioneachG.js';
import {pathString} from './pathString.js';
var colormap=['#F39C29', '#7FBD66', '#BEA4DB'];
function turnPaperId(c1,c2){
    let arr=[];
    for(var i in c1){
        for(var j in c2){
            if(c1[i]==c2[j]) arr.push(j);
        }
    }
    return arr;
}
export function draw(ans,s,gType,numGroups=5){
    var Idans = turnPaperId(ans,s);
    var [g2paper,groupNumber]=groupArray(gType,Idans,s,numGroups);
    var p_each_year=new Array(10).fill(0);
    var cirleArray=[];
    var maxL=0,maxY;
    {
        for(var i=0;i<10;i++){
            for(var gi in g2paper){
                let n=0;
                var tmp = g2paper[gi].arrYear[i];
                var tl=tmp.length;
                if(tl>maxL){ maxL=tl;maxY=i; }
                p_each_year[i]+=tl;
                for(var k in tmp){
                    let item={};
                    item.pid=tmp[k];
                    item.group=gi;
                    item.year=i;
                    item.groupid=n++;
                    item.gLength=tl;
                    cirleArray.push(item);
                }
            }
        }
    }
    var svg = d3.select(".svg");
    const width=$('.svg').width();
    var height=$('.svg').height();
    $('.svg').children('*').remove();
    var YearWidth=width/10;
    var textyearheight=30;
    height-=textyearheight;
    var yearText=svg.append("g").attr("class","year-text");
    for(var i=0;i<10;i++){
        yearText.append("text").attr("x",width/10*i+YearWidth/2-25).attr("y",25).text(function(){ return i+2009; }).attr("class","yearText");
    }
    svg=svg.append("g").attr("class","content");
    var yearbar=svg.append("g").attr("class","year-bar");
    for(var i=1;i<10;i++){
        yearbar.append("line").attr("x1",width/10*i).attr("x2",width/10*i).attr("y1",0).attr("y2",height);
    }
    var gPath=svg.append("g").attr("class","group-path");
    var gRing=svg.append("g").attr("class","rings");
    var gNameText=svg.append("g").attr("class","group-name");
    var year2p=p_each_year;
    var [_,maxp_year]=d3.extent(year2p);
    const y = d3.scaleLinear()
        .range([height, 0])
        .domain([maxp_year,0]);
    var cR=0,cols=0;
    for(var i=0;i<10;i++){
        for(var gi in g2paper){
            var tmp = g2paper[gi].arrYear[i];
            var tl=tmp.length;
            if(tl!=0)
            var [cRi,colsi]=r(YearWidth,y(tl),tl);
            if(colsi>cols){
                cols=colsi;
                cR=cRi;
            }else if(colsi==cols&&cRi<cR){
                cR=cRi;
            }
        }
    }
    var posotion_each_group=positioneachG(g2paper,YearWidth,height,y,p_each_year);
    var pathstring=pathString(posotion_each_group,groupNumber,YearWidth);
    gPath.selectAll("path").data(pathstring).enter().append("path").attr("d",function(d){ return d; }).attr("fill",function(d,i){ return colormap[i%3];}).style("opacity","0.3");
    var padingWidth=(YearWidth-cols*2*cR)/2;
    var startmoveNumber=1;
    if(cols<3)startmoveNumber=0;
    for(let i in cirleArray){
        let d=cirleArray[i];
        let tmp=g2paper[d.group].arrYear[d.year].length+startmoveNumber;
        let padingHeight=((posotion_each_group[d.year][Number(d.group)+1]-posotion_each_group[d.year][d.group])-Math.ceil(tmp/cols)*2*cR)/2;
        let y=posotion_each_group[d.year][d.group]+padingHeight;
        let x=YearWidth*(d.year)+padingWidth;
        let rowi=Math.floor((d.groupid+startmoveNumber)/cols);
        let coli=(d.groupid+startmoveNumber)%cols;
        d.x=coli*cR*2+cR+x;
        d.y=rowi*cR*2+cR+y;
        let z=(d.gLength+startmoveNumber)%cols;
        if(d.groupid >=(d.gLength-z)){
            let z2=cR*2*(cols-z)/2;
            d.x+=z2;
        }
        if(d.groupid<cols-startmoveNumber){
            let moveTopPadding=cR*startmoveNumber;
            d.x-=moveTopPadding;
        }
    }
    {
        let cR2=cR-2;
        var arc = d3.arc()
            .outerRadius(cR2)
        var pie = d3.pie()
            .sort(null)
            .value(function (d) {
                return d.size;
            });
        var geachRing = gRing.selectAll("g").data(cirleArray).enter().append("g")
            .attr("transform", function (d) {
                return "translate(" + d.x + "," + d.y + ")";
            });
        var g = geachRing.selectAll(".arc")
            .data(function(d){
                let data=figure2data[d.pid];
                let tmp=pie(data);
                return tmp;
            })
            .enter().append("g")
            .attr("class", function(){
                return "arc";
            });
        const scaleR = d3.scaleLinear()
            .range([0,1])
            .domain([0,8]);
        g.append("path")
            .attr("d", function(d){

                // console.log(scaleR(d.data.fratio));
                let pages=(parseInt(s[d.data.paperid]["Last page"])-parseInt(s[d.data.paperid]["First page"]))+1;
                // arc.innerRadius(0.8*cR2*(1-((d.data.textp)/(2200*2800*pages))));
                arc.innerRadius(cR2*(1-scaleR(d.data.fratio))*0.5);


                return arc(d);
            })
            .style("fill", function (d,i) {
                return "rgba(" + colorload_data[d.data.figureid] + ")";
            })
            .on('mouseover', function (k) {  tip2.show(k,i);})
            .on('mouseout', function (k) { tip2.hide(k,i); });
    }
    var tip2 = d3.tip()
        .attr('class', 'd3-tip')
        .offset([10, 100])
        .direction('s')
        .html(function (d,_i) {
            console.log(d);
            var _url = d.data.src;
            var  string = "<div class='out'>" +
                "<div class='top'>" +
                "  " +"<div class='title t'>"+s[d.data.paperid]["Paper Title"]+"</div></div>" +
                "<div class='left'><img class='img' src=" +_url +" ></div>" +
                "<div class='right'><div class='contain-t'>" +
                "" +"<div class='author t'><strong>AUTHORS:</strong><p>"+s[d.data.paperid]["Author Names"]+"</p></div>"+
                "" +"<div class='year t'><strong>PUBLISHED YEAR:</strong><span>"+s[d.data.paperid]["Year"]+"</span></div>"+
                "" +"<div class='conference t'><strong>CONFERENCE:</strong><span>"+s[d.data.paperid]["Conference"]+"</span></div>"+
                "" +"<div class='keyword t'><strong>KEYWORDS:</strong><p>"+s[d.data.paperid]["Author Keywords"]+"</p></div>"+
                "</div></div><div class='figs'>"+"Fig."+(d.index+1)+" of "+(d.data.fignums)+"</div></div>";
            return string;
        });
    svg.call(tip2);
    let px=0;
    let pp=0;
    for(var i in g2paper){
        gNameText.append("text").attr("x",function(){
            // if(i==0) return 0;
            // let l = g2paper[i-1].name.length;
            // px+=l*10+10;
            //
            // console.log(px,l);

            return 0;
        }).attr("y",height-10).attr("fill",function(){ return colormap[(i%3)]; })
            .text(function () {
                return g2paper[i].name;
            }).attr("class","gsort")
            .attr("transform",function(d){
                let wid= (this).getBBox().width;
                console.log(wid);
                px+=(wid);
                return `translate(${px-wid+i*10},${0})`;
            })
    }
}