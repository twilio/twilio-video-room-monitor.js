/* eslint-disable no-console */
/* eslint-disable strict */
/* eslint-disable no-undef */
function setChildTextNode(elementId, text) {
  document.getElementById(elementId).innerText = text;
}

function openVideoInspector() {
  setChildTextNode('openInspectorResults', 'loading...');
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    setChildTextNode('openInspectorResults', 'got tab...');
    var tab = tabs[0];

    // inject video-inspector script to render rooms details.
    // chrome.tabs.executeScript(tab.id, { code: scriptCode });
    chrome.tabs.executeScript(tab.id, { file: 'content.js' });

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
