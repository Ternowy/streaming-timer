chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if(message === 'close-tab') {
    chrome.tabs.remove(sender.tab.id)
  }
})