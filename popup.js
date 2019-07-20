function getCurrentTabId(callback) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        if (callback) callback(tabs.length ? tabs[0].id : null);
    });
}

function sendMessageToContentScript(message, callback) {
    getCurrentTabId((tabId) => {
        chrome.tabs.sendMessage(tabId, message, function (response) {
            if (callback) callback(response);
        });
    });
}



//写cookies
function setCookie(name, value) {
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}
//读取cookie
function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}

onload = () => {
    if (getCookie("startday") != null) {
        document.querySelector("#startday").value = getCookie("startday").toString();
    }
    if (getCookie("endday") != null) {
        document.querySelector("#endday").value = getCookie("endday").toString();
    }
    document.querySelector("#btn").onclick = () => {
        const startday = document.querySelector("#startday").value;
        const endday = document.querySelector("#endday").value;
        if(!startday || !endday){
            return false;
        }
        setCookie("startday", startday);
        setCookie("endday", endday);
        let c = { "startday": startday, "endday": endday };
        sendMessageToContentScript(c, (response) => {
            if (response) { 
                $("#token").text(response.toString());
            };
        });
    }

}