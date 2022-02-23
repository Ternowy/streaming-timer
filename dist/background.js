chrome.runtime.onMessage.addListener((e,s,o)=>{e==="close-tab"&&chrome.tabs.remove(s.tab.id)});
