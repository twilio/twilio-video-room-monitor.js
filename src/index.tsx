import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

console.log('loading index.tsx...');
const CONTAINER_ID = 'TwilioVideoInspectorContainer';

const existingContainer = document.getElementById(CONTAINER_ID);

if (existingContainer) {
  ReactDOM.unmountComponentAtNode(existingContainer);
  ReactDOM.render(<App />, existingContainer);
} else {
  const container = document.createElement('div');
  document.body.appendChild(container);
  container.id = CONTAINER_ID;
  ReactDOM.render(<App />, container);
}

window.TwilioVideoInspector = window.TwilioVideoInspector || {
  destroy: () => ReactDOM.unmountComponentAtNode(document.getElementById(CONTAINER_ID)!),
};
