export function groupArray(gType,Idans,s,numGroups) {
    var grouphash;
    if(gType==0) grouphash=V2P;
    if(gType==1) grouphash=A2P;
    if(gType==2) grouphash=K2P;
    if(gType==3) grouphash=NC2P;
    var maxL=0;
    var g2paper=[];
    for(var name in grouphash){
        let item={};
        item.name=name;
        item.arr=[];
        for(var j in grouphash[name]){
            for(var i in Idans){
                if(Idans[i]==grouphash[name][j])
                    item.arr.push(Idans[i]);
            }
        }
        item.arrYear=[[],[],[],[],[],[],[],[],[],[]];
        item.FigYear=[[],[],[],[],[],[],[],[],[],[]];
        let l=item.arr.length;

        item.arr.forEach(function(ii,index,array){
            let y=(Number(s[ii].Year)-2009);
            let f2 =figure2data[ii][0].fignums;

            item.arrYear[y].push(ii);
            item.FigYear[y].push(f2);


        });

        item.arrYear.forEach(function(iii,index,array){

            maxL= Math.max(iii.length,maxL);
        });
        if(l!=0){
            item.length=l;
            g2paper.push(item);
        }
    }
    g2paper.sort(function(a,b){
        return b.length-a.length;
    });
    g2paper.splice(numGroups);
    let groupNumber=g2paper.length;
    return [g2paper,groupNumber];
}