var btn = document.querySelector('.btn')
var inputValue = document.querySelector('.url-input')


var bgPage = chrome.extension.getBackgroundPage();

var strCode = `var btn = document.querySelector('.chrome-event'); btn.click();`

/**
 * @description: 给content函数发送消息
 * @param {Object} message 消息内容 
 * @param {Object} callback 回调函数 
 * @return: void
 */
function sendMessageToContentScript(message, callback)
{
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs)
	{
		chrome.tabs.sendMessage(tabs[0].id, message, function(response)
		{
			if(callback) callback(response);
		});
	});
}


function getDetail(text) {
    const html = text.replace(/[\r\n]/g, "");
    const script = html.match(/<script>(.*?)<\/script>/g)
    let goodsData = ''
    for(let i = 0; i < script.length; i++) {
        let dataReg = /window.rawData/
       if(dataReg.test(script[i])) {
        goodsData = script[i]
       }
    }
    goodsData = goodsData.replace('<script>','')
    goodsData = goodsData.replace('</script>','')
    goodsData = goodsData.replace(/\s+/g,'')
    goodsData = goodsData.replace('window.rawData=','')
    goodsData = goodsData.replace('window.isUseHttps=true;','')
    goodsData = goodsData.substring(0, goodsData.lastIndexOf(';'));
    goodsData = JSON.parse(goodsData)

    const swiperImage = goodsData.store.initDataObj.goods.topGallery
    const goodsDetail = goodsData.store.initDataObj.goods.detailGallery
    const store_name = goodsData.store.initDataObj.goods.goodsName

    let swiperImageObj = {}
    let description = ''
    
    for(let i = 0; i<swiperImage.length;i++) {
        swiperImageObj[`${i}`] = swiperImage[i]
    }

    for(let i = 0; i<goodsDetail.length;i++) {
        let temp = '<img align="absmiddle" src="$url" style="max-width: 750.0px;">'
        description = description + temp.replace('$url',goodsDetail[i]['url'])
    }
    sendMessageToContentScript({
        slider_image:swiperImageObj,
        description_images: description,
        store_name: store_name
    }, function(response){
        console.log('来自content的回复：'+response);
        chrome.tabs.executeScript({
            code: strCode,
        });  
    });

}

btn.addEventListener('click',function() {
    bgPage.Ajax({
        url: inputValue.value,
        method: 'get',
        header: {
            "content-Type":"application/x-wwww-form-urlencoded;utf-8"
        },
        successFn: function(text) {
            console.log('执行成功')
            getDetail(text)
        },
        failFn: function(e) {
            console.log('执行失败')
        }
    })
})


