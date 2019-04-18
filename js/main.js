import {attributeF} from './attributeF.js';
d3.dsv(",", "src/figure-data2.csv", function (d) {
    return {
        d
    };
}).then(function (figure_data) {
    d3.dsv(",", "src/paper-info.csv", function (d) {
        return d;
    }).then(function (paper_data) {
        /**
         初始化*/
        //将图片csv数据转化为hierarchy数据
        var figure_root1 = d3.stratify()
            .id(function (d) {
                return d.d.imageID;
            })
            .parentId(function (d) {
                return d.d.paperID;
            })
            (figure_data);
        var figure_root = d3.hierarchy(figure_root1)
            .sum(function (d) {
                if(d.data.d.size)
                    return 1;
                else return 0;
            })
            .sort(function (a, b) {
                // return b.value - a.value;
            });
        // console.log(figure_root);

        // var figure2d={};
        // for(var i in paper_data){
        //     // console.log(paper_data[i]);
        //     var doi2=paper_data[i]["Paper DOI"];
        //     if(doi2)doi2=doi2.replace('/','@');
        //     console.log(doi2);
        //     for(var j in figure_root.data.children){
        //         var doi1=figure_root.data.children[j].id;
        //         let k=figure_root.data.children[j].children;
        //         let t=Math.random();
        //         if(doi1==doi2){
        //             var tmp=[];
        //             for(let l in k){
        //                 let tmp2={};
        //                 tmp2.size=k[l].data.d.size;
        //                 tmp2.src=k[l].data.d.imagepath;
        //                 tmp2.figureid=k[l].data.d.imageID;
        //                 tmp2.fratio=k[l].data.d.ratio;
        //                 tmp2.textp=t;
        //                 tmp.push(tmp2);
        //             }
        //             figure2d[i]=tmp;
        //         }
        //     }
        // }
        // console.log(JSON.stringify(figure2d));
        console.log(figure2data);




        //查看hierarchy的图片数据
        // console.log("图片数据",figure_root);
        //查看论文数据
        // console.log("论文数据",paper_data);
        //初始化面板和主要视图

        attributeF([[],[],[]],paper_data,paper_data,-1,figure_root);
    })
});