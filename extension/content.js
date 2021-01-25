/* eslint-disable no-console */
/* eslint-disable no-undef */
'use strict';
(() => {
  const version = 8;
  console.log('opened content.js version:', version);

  var tag = document.createElement('script');
  tag.src = chrome.runtime.getURL('web_accessible/index.js');
  document.body.appendChild(tag);

  // also start listening for request for CPU usage.
  chrome.runtime.sendMessage({ command: 'version', id: 1 }, (response) => {
    console.log('version returned:', response);
  });

  // listen on request from the app, and forward it to the extension.
  window.addEventListener(
    'message',
    (event) => {
      // We only accept messages from ourselves (that is within the app)
      if (event.source !== window) {
        console.log('Ignoring message from unknown source');
        return;
      }
      // our protocol requires command and id fields
      if (event.data && event.data.command === 'getCPU' && event.data.id) {
        // console.log('Content script received: getCPU');
        chrome.runtime.sendMessage({ id: event.data.id, command: 'getCPU' }, (response) => {
          // console.log('getCPU returned:', response);
          window.postMessage(response, '*');
        });
      }
    },
    false
  );
})();
