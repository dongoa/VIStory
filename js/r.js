export function r(x,y,n) {
    var cD=0,cols=1;
    for(;cols<20;cols++){
        let xd=x/cols;
        let yc=Math.ceil(n/cols);
        let yd=y/yc;
        // console.log(xd,yd);
        let cd=Math.min(xd,yd);
        if(cd<cD) break;
        else cD=cd;
    }
    // console.log(x,y,n,cD,cols);
    return [cD/2,--cols];
}