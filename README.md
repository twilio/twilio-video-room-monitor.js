# Twilio Video Inspector

### Install dependencies:

```
npm install
```

### Scripts:

#### `npm start`

This will compile the app into a single file (`dist/index.js`). This file will be re-compiled when any file is saved. This file can be loaded into the browser by pasting the following snippet into the JavaScript Console.

```
(function () {
  var tag = document.createElement('script');
  tag.src = 'http://localhost:1234/index.js';
  window.getTwilioRoom = () => twilioRoom; // Update this function to return your Twilio Room object
  document.body.appendChild(tag);
})();
```

This snippet will tear down the app if it is already running. This means that this
snippet can be run multiple times on a page without having to reload the page.

Alternatively: You can use a chrome extension to invoke twilio-video-inspector.
Step 1) copy generated `index.js` into `extension/web_accessible/index.js`
Step 2)  Install chrome extension from the `extension` directory following instructions [here](https://developer.chrome.com/docs/extensions/mv2/getstarted/)
Now on any web page using twilio-video, Clicking the extension will invoke video-inspector,

#### `npm run build`

This will compile a minified version of the app into a single file (`dist/index.js`) and exit. It will not re-compile when changes are detected.

#### `npm run ts`

Parcel does not perform type checking, so we must do this ourselves. Run this command to check the types in the app.

#### `npm run ts:watch`

Same as `npm run ts`, but it will watch for changes and re-check types when any file is saved. It is useful to have this running in a separate terminal.
