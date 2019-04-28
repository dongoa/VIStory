export function positioneachG(g2paper,x,y,scale,p_each_year) {
    var arr=[[],[],[],[],[],[],[],[],[],[]];
    console.log(x,y);
    p_each_year.forEach(function(item,index){
        arr[index].push( (y-scale(item))/2 );
    });
    for(var i=0;i<10;i++){
        for(var gi in g2paper){
            var tmp = g2paper[gi].arrYear[i];
            let l=tmp.length;
            arr[i].push(arr[i][gi]+scale(l));
        }
    }
    return arr;
}