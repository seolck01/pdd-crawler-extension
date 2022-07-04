console.log('手动注入成功')

// window.postMessage({"test": '你好！'}, '*');
window.addEventListener("message", function(e)
{
    // console.log('接收到content的消息')
    window.chrome_plugin_data = e.data
}, false);