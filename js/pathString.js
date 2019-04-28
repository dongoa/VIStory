
// export function pathString(posotion_each_group,groupNumber,YearWidth){
//     var pathstring=[];
//     for(let gi=0;gi<groupNumber;gi++){
//         pathstring.push("M "+"0"+" "+posotion_each_group[0][gi] + " L"+YearWidth/2+" "+posotion_each_group[0][gi]+" ");
//         for(let i=1;i<10;i++){
//             pathstring[gi]+=" C"
//                 +" "+(i*YearWidth)+" "+posotion_each_group[i-1][gi]+" "
//                 +" "+(i*YearWidth)+" "+posotion_each_group[i][gi]+" "
//                 +" "+(i*YearWidth+YearWidth/2)+" "+posotion_each_group[i][gi]+" ";
//         }
//         pathstring[gi]+=" L"+(YearWidth*10)+" "+posotion_each_group[9][gi]+" "
//             +" L"+(YearWidth*10)+" "+posotion_each_group[9][gi+1]+" "
//             +" L"+(YearWidth*10-YearWidth/2)+" "+posotion_each_group[9][gi+1]+" ";
//         for(let i=8;i>=0;i--){
//             pathstring[gi]+=" C"
//                 +" "+((i+1)*YearWidth)+" "+posotion_each_group[i+1][gi+1]+" "
//                 +" "+((i+1)*YearWidth)+" "+posotion_each_group[i][gi+1]+" "
//                 +" "+(i*YearWidth+YearWidth/2)+" "+posotion_each_group[i][gi+1]+" ";
//         }
//         pathstring[gi]+=" L"+0+" "+posotion_each_group[0][gi+1]+" Z";
//
//     }
//     return pathstring;
// }
//上面是原始的单点曲线

var n1=4;
var n2=1;
export function pathString(posotion_each_group,groupNumber,YearWidth){
    var pathstring=[];
    for(let gi=0;gi<groupNumber;gi++){
        pathstring.push("M "+"0"+" "+posotion_each_group[0][gi] + " L"+YearWidth/n1*(n1-n2)+" "+posotion_each_group[0][gi]+" ");
        for(let i=1;i<10;i++){
            pathstring[gi]+=" C"
                +" "+(i*YearWidth)+" "+posotion_each_group[i-1][gi]+" "
                +" "+(i*YearWidth)+" "+posotion_each_group[i][gi]+" "
                +" "+(i*YearWidth+YearWidth/n1*n2)+" "+posotion_each_group[i][gi]+" ";

            pathstring[gi]+=" L"
                +" "+(i*YearWidth+YearWidth/n1*(n1-n2))+" "+posotion_each_group[i][gi]+" ";
        }
        pathstring[gi]+=" L"+(YearWidth*10)+" "+posotion_each_group[9][gi]+" "
            +" L"+(YearWidth*10)+" "+posotion_each_group[9][gi+1]+" "
            +" L"+(YearWidth*10-YearWidth/n1*(n1-n2))+" "+posotion_each_group[9][gi+1]+" ";
        for(let i=8;i>=0;i--){
            pathstring[gi]+=" C"
                +" "+((i+1)*YearWidth)+" "+posotion_each_group[i+1][gi+1]+" "
                +" "+((i+1)*YearWidth)+" "+posotion_each_group[i][gi+1]+" "
                +" "+(i*YearWidth+YearWidth/n1*(n1-n2))+" "+posotion_each_group[i][gi+1]+" ";

            pathstring[gi]+=" L"
                +" "+(i*YearWidth+YearWidth/n1*n2)+" "+posotion_each_group[i][gi+1]+" ";
        }
        pathstring[gi]+=" L"+0+" "+posotion_each_group[0][gi+1]+" Z";

    }
    return pathstring;
}