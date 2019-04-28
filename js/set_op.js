export function set_op(s3,s){
    var ans=[];
    var l0=s3[0].length;
    var l1=s3[1].length;
    var l2=s3[2].length;
    if(l0== 0) s3[0]=s;
    if(l1== 0) s3[1]=s;
    if(l2== 0) s3[2]=s;
    for(let i in s){
        if((s3[0].indexOf(s[i])!=-1)&&(s3[1].indexOf(s[i])!=-1)&&(s3[2].indexOf(s[i])!=-1))
            ans.push(s[i]);
    }
    if(ans.length==0){
        if(l0<l1) return s3[0];
        else if(l2<l1) return s3[2];
        else return s3[1];
    }
    return ans;
}