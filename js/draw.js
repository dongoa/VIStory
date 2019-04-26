import {groupArray} from './groupArray.js';
import {r} from './r.js';
import {positioneachG} from './positioneachG.js';
import {pathString} from './pathString.js';
var colormap=['#F39C29', '#7FBD66', '#BEA4DB'];
var color = d3.scaleOrdinal()
    .range(["#98abc5", "#8a89a6", "#7b6888"]);
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
    //将ans转为论文id
    var Idans = turnPaperId(ans,s);
    //计算一个包含分组情况的数组
    var [g2paper,groupNumber]=groupArray(gType,Idans,s,numGroups);
    console.log(g2paper);

    //重新装载数组
    var p_each_year=new Array(0,0,0,0,0,0,0,0,0,0);
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
                    // if(k==0) cirleArray.push(item);
                    cirleArray.push(item);
                }
            }
        }
    }

    console.log(cirleArray,maxL,maxY,p_each_year);

    //画上一些标记
    var svg = d3.select(".svg");
    const width=$('.svg').width();
    var height=$('.svg').height();
    $('.svg').children('*').remove();
    //baseline
    var YearWidth=width/10;
    var textyearheight=30;
    height-=textyearheight;
    // svg.append("line").attr("x1",0).attr("x2",width).attr("y1",height/2).attr("y2",height/2);
    var yearText=svg.append("g").attr("class","year-text");
    for(var i=0;i<10;i++){
        yearText.append("text").attr("x",width/10*i+YearWidth/2-25).attr("y",25).text(function(){ return i+2009; }).attr("class","yearText");
    }
    svg=svg.append("g").attr("class","content");
    var yearbar=svg.append("g").attr("class","year-bar");
    for(var i=1;i<10;i++){
        yearbar.append("line").attr("x1",width/10*i/*+YearWidth/2*/).attr("x2",width/10*i/*+YearWidth/2*/).attr("y1",0).attr("y2",height);
    }


    var lineYear=svg.append("g").attr("class","line-year");
    var gPath=svg.append("g").attr("class","group-path");
    var gCirlce=svg.append("g").attr("class","circles");
    var gRing=svg.append("g").attr("class","rings");
    var gNameText=svg.append("g").attr("class","group-name");
    var year2p=p_each_year;

    var [_,maxp_year]=d3.extent(year2p);
    const y = d3.scaleLinear()
        .range([height, 0])
        .domain([maxp_year,0]);


    //计算半径
    var cR=0,cols=0;
    for(var i=0;i<10;i++){
        for(var gi in g2paper){
            var tmp = g2paper[gi].arrYear[i];
            var tl=tmp.length;
            if(tl!=0)
            var [cRi,colsi]=r(YearWidth,y(tl),tl);
            // console.log("-------------",cRi,colsi);
            if(colsi>cols){
                cols=colsi;
                cR=cRi;
            }else if(colsi==cols&&cRi<cR){
                cR=cRi;
            }
        }
    }
    console.log("求出的半径和列数为",cR,cols);


    //计算path
    //计算一个保存path的数组
    var posotion_each_group=positioneachG(g2paper,YearWidth,height,y,p_each_year);
    console.log(posotion_each_group);
    //保存path-string的数组
    var pathstring=pathString(posotion_each_group,groupNumber,YearWidth);
    // console.log(pathstring);
    gPath.selectAll("path").data(pathstring).enter().append("path").attr("d",function(d){ return d; }).attr("fill",function(d,i){ return colormap[i];}).style("opacity","0.3");


    //计算圆的位置
    var padingWidth=(YearWidth-cols*2*cR)/2;
    var startmoveNumber=2;
    if(cols<3)startmoveNumber=0;
    console.log(cirleArray);
    for(let i in cirleArray){

        let d=cirleArray[i];
        let tmp=g2paper[d.group].arrYear[d.year].length+startmoveNumber;

        let padingHeight=((posotion_each_group[d.year][Number(d.group)+1]-posotion_each_group[d.year][d.group])-Math.ceil(tmp/cols)*2*cR)/2;
        // console.log(posotion_each_group[d.year][Number(d.group)+1],padingHeight,tmp);
        let y=posotion_each_group[d.year][d.group]+padingHeight;
        let x=YearWidth*(d.year)+padingWidth;
        let rowi=Math.floor((d.groupid+startmoveNumber)/cols);
        let coli=(d.groupid+startmoveNumber)%cols;
        d.x=coli*cR*2+cR+x;
        d.y=rowi*cR*2+cR+y;
        // console.log(rowi,coli);
        let z=(d.gLength+startmoveNumber)%cols;
        if(d.groupid >=(d.gLength-z)){
            let z2=cR*2*(cols-z)/2;
            d.x+=z2;
        }
        if(d.groupid<cols-startmoveNumber){
            let moveTopPadding=cR*startmoveNumber;
            d.x-=moveTopPadding;
        }
        // if(d.groupid)
        //对齐最后一行
        // if(i!=0&&cirleArray[i+1].group!=d.group){
        //     console.log()
        // }
    }

    //画⚪
    // console.log(cirleArray);
    // gCirlce.selectAll("circle").data(cirleArray).enter().append("circle")
    //     .attr("cx",function(d){
    //
    //         return d.x;
    //     })
    //     .attr("cy",function(d){
    //         return d.y;
    //     })
    //     .attr("r",cR-2);

    // 画ring
    {
        let cR2=cR-2;

        var arc = d3.arc()
            .outerRadius(cR2)
            // .innerRadius(cR2*Math.random());
        var pie = d3.pie()
            .sort(null)
            .value(function (d) {
                return d.size;
            });
        let data=[10, 20, 100];
        var geachRing = gRing.selectAll("g").data(cirleArray).enter().append("g")
            .attr("transform", function (d) {
                return "translate(" + d.x + "," + d.y + ")";//设置ring的圆心
            });
        // var json={};
        var g = geachRing.selectAll(".arc")
            .data(function(d,i){
                let data=figure2data[d.pid];
                // console.log(s[d.pid],i);
                let tmp=pie(data);

                return tmp;
            })
            .enter().append("g")
            .attr("class", function(d,i,j){
                // console.log(d,i,j)

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
                arc.innerRadius(cR2*(1-scaleR(d.data.fratio)));
                return arc(d);
            })
            .style("fill", function (d) {
                // console.log(d);
                // if( colorload_data[d.data.figureid]==undefined){
                //     var image=new Image();
                //     image.src=d.data.src;
                //     var colorThief = new ColorThief();
                //     image.onload=function(){
                //         var domaincolor = colorThief.getColor(image);
                //         console.log(domaincolor);
                //         json[d.data.figureid]=domaincolor;
                //         console.log(JSON.stringify(json));
                //     }
                //
                // }



                return "rgba(" + colorload_data[d.data.figureid] + ")";
            })
            .on('mouseover', function (k) {  tip2.show(k,i);})
            .on('mouseout', function (k) { tip2.hide(k,i); });
        // console.log("绘制Ring时查看图片数据",figure_data);
    }

    //tips
    var tip2 = d3.tip()
        .attr('class', 'd3-tip')
        .offset([10, 100])
        .direction('s')
        .html(function (d,_i) {
            console.log(d);
            var _url = d.data.src;
            let node=s[i]["Paper Title"];
            var  string = "<div class='out'>" +
                "<div class='top'>" +
                "  " +"<div class='title t'><strong>CURRENT PAPER TITLE:</strong><br>"+s[d.data.paperid]["Paper Title"]+"</div></div>" +
                "<div class='left'><img class='img' src=" +_url +" ></div>" +
                "<div class='right'><div class='contain-t'>" +

                "" +"<div class='author t'><strong>AUTHORS:</strong><p>"+s[d.data.paperid]["Author Names"]+"</p></div>"+
                "" +"<div class='year t'><strong>PUBLISHED YEAR:</strong><span>"+s[d.data.paperid]["Year"]+"</span></div>"+
                "" +"<div class='conference t'><strong>CONFERENCE:</strong><span>"+s[d.data.paperid]["Conference"]+"</span></div>"+
                "" +"<div class='keyword t'><strong>KEYWORDS:</strong><p>"+s[d.data.paperid]["Author Keywords"]+"</p></div>"+
                // "" +"<div class='caption t'><strong>Caption:</strong>"+"Fig."+(d.index+1)+"</div>"+
                "</div></div><div class='figs'>"+"Fig."+(d.index+1)+" of "+(d.data.fignums)+"</div></div>";
            return string;
        });
    svg.call(tip2);

    // lineYear.append("path").attr('d',function(){
    //     let s="M "+0 +" "+riverY(y(year2p[0]),height) ;
    //     for(let i=0;i<10;i++){
    //         s += "L" + ( (i+1)*YearWidth)+" "+riverY(y(year2p[i]),height)+" ";
    //         if(i!=9)
    //             s+="L "+( (i+1)*YearWidth)+" "+riverY(y(year2p[i+1]),height);
    //     }
    //     for(let i=9;i>-1;i--){
    //         if(i!=9)
    //         s+="L "+( (i+1)*YearWidth)+" "+(riverY(y(year2p[i+1]),height)-y(year2p[i+1]))+" ";
    //         s+= "L " + ( (i+1)*YearWidth)+" "+(riverY(y(year2p[i]),height)-y(year2p[i]))+" ";
    //     }
    //     s+="L "+0+" "+(riverY(y(year2p[0]),height)-y(year2p[0])) ;
    //     return s+"Z";
    // });

    let px=0;
    for(var i in g2paper){
        gNameText.append("text").attr("x",function(){
            if(i==0) return 0;
            let l = g2paper[i-1].name.length;
            px+=l*10;
            console.log(px,l);
            return px;
        }).attr("y",height-10).attr("fill",function(){ return colormap[i]; })
            .text(function () {
                return g2paper[i].name;
            })
    }
}
function riverY(y,Y){ return y+(Y-y)/2; }