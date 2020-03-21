
function typeFn(){
    let mType =  /(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent);
    if(mType){
        let scritUrl = document.createElement("script");
        let metaUrl = document.createElement("meta");
        let heads = document.getElementsByTagName("head"); 
        metaUrl.setAttribute("name", "viewport");
        metaUrl.setAttribute("content", "width=device-width; initial-scale=1; maximum-scale=1; minimum-scale=1; user-scalable=no;");
        scritUrl.setAttribute("src", "//mnweb.mini1.cn/mnwbridge/miniwBridge-0.3.0-beta.js");
        scritUrl.setAttribute("type", "text/javascript");
        document.documentElement.appendChild(scritUrl); 
        if(heads.length){
            heads[0].appendChild(metaUrl);
        } else {
            document.documentElement.appendChild(metaUrl);
        }
    } else {
        let heads = document.getElementsByTagName("head");
        let metaUrl = document.createElement("meta");
        metaUrl.setAttribute("name", "viewport");
        metaUrl.setAttribute("content", "width=device-width, initial-scale=1.0");
        if(heads.length){
            heads[0].appendChild(metaUrl);
        } else {
            document.documentElement.appendChild(metaUrl);
        }
    }
}

(function(){
    typeFn();
})() 