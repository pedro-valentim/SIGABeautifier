window.console.log('============background running============');
// Seta o icon para ativo
// chrome.browserAction.setIcon({path: '../icon-active.png'});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	window.console.log(request);
    // read `newIconPath` from request and read `tab.id` from sender
    chrome.browserAction.setIcon({
        path: request.newIconPath,
        tabId: sender.tab.id
    });
});