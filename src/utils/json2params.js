export default function json2params(o){
    let result='';
    result=Object.keys(o).map(v=> {
        return v + "=" + o[v];
    }).join("&");
    return "?"+result
}