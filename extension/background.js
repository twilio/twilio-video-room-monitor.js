/* eslint-disable no-undef */
/* eslint-disable strict */

const version = 2;

// eslint-disable-next-line consistent-return
chrome.runtime.onMessage.addListener( (request, sender, sendResponse) => {
  if (request.command === 'version') {
    sendResponse({ id: request.id, version });
  } else if (request.command === 'getCPU') {
    try {
      chrome.system.cpu.getInfo(cpuInfo => {
        // setChildTextNode('openInspectorResults', 'gotCPU...');
        sendResponse({ id: request.id, cpuInfo });
      });

      // returning true tells caller that response
      // is coming, don't close the port
      return true;
    } catch (e) {
      sendResponse({ error: e.message });
    }
  }
});
