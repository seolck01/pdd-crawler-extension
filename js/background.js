

function ajax(option){
    let url = option.url
    let method = option.method
    let header = option.header
    let body = option.body
    let successFn = option.successFn
    let failFn = option.failFn
    let request = new XMLHttpRequest
    // console.log('执行了ajax')
    request.open(method, url)
    for(key in header){
        let value = header[key]
        request.setRequestHeader(key,value)
    }
    request.onreadystatechange=function(){
        if(request.readyState===4){
            if(request.status===200){
                successFn.call(undefined,request.responseText)
            } else {
                failFn.call(undefined,request)
            }
        }
        else
        {
            failFn.call(undefined,request)
        }
    }
    request.send(body)
} 

function Ajax(option) {
    ajax(option)
}