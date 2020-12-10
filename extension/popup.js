/* eslint-disable no-console */
/* eslint-disable strict */
/* eslint-disable no-undef */
function setChildTextNode(elementId, text) {
  document.getElementById(elementId).innerText = text;
}

// this code is executed on target tab. It runs in separate js context from the
// rest of the page.
const scriptCode = '' +
  ' var tag = document.createElement("script");          ' +
  ' tag.src = "http://localhost:1234/index.js";          ' +
  ' console.log("open inspector version 3");             ' +
  ' document.body.appendChild(tag);              ';

function openVideoInspector() {
  setChildTextNode('openInspectorResults', 'loading...');
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    setChildTextNode('openInspectorResults', 'got tab...');
    var tab = tabs[0];

    // inject video-inspector script to render rooms details.
    chrome.tabs.executeScript(tab.id, { code: scriptCode });
    setChildTextNode('openInspectorResults', 'done.');
  });
}

(function() {
  document.addEventListener('DOMContentLoaded', function() {
    console.log('makarand: video-inspector, DOMContentLoaded');
    document.querySelector('#openInspector').addEventListener(
      'click', openVideoInspector);
  });
})();
