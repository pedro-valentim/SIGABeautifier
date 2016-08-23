
// Recebe messages de content_scripts
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    // lê `newIconPath` do request e lê `tab.id` de sender
    chrome.browserAction.setIcon({
        path: request.newIconPath,
        tabId: sender.tab.id
    });
});