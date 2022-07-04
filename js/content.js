
// console.log('js 注入')

function injectCustomJs(jsPath)
{
	jsPath = jsPath || 'js/inject.js';
	var temp = document.createElement('script');
	temp.setAttribute('type', 'text/javascript');
	// 获得的地址类似：chrome-extension://ihcokhadfjfchaeagdoclpnjdiokfakg/js/inject.js
	temp.src = chrome.extension.getURL(jsPath);
	temp.onload = function()
	{
		// 放在页面不好看，执行完后移除掉
		this.parentNode.removeChild(this);
	};
	document.head.appendChild(temp);
}
injectCustomJs()

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
{
    console.log(request)
    // sendResponse('我收到了你的消息！');

    window.postMessage(request, '*');
});


// window.addEventListener("message", function(e)
// {
// 	console.log(e.data);
// }, false);