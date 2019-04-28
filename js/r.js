export function r(x,y,n) {
    let f=1;
    // {n=n+2;}//r缩进通用情况
    var cD=0,cols=1;
    for(;cols<20;cols++){

        //r缩进在大于2行的情况


        if(cols>=3&&f){n=n+1;f=0;}
        let xd=x/cols;
        let yc=Math.ceil(n/cols);
        let yd=y/yc;
        let cd=Math.min(xd,yd);
        if(cd<cD) break;
        else cD=cd;
    }
    return [cD/2,--cols];
}