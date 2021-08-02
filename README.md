# Twilio Video Inspector

[![CircleCI](https://circleci.com/gh/twilio/twilio-video-inspector.svg?style=svg&circle-token=e455a056673b1eb7a7692269da5154167b0eb32a)](https://circleci.com/gh/twilio/twilio-video-inspector)

## What is it

This browser-based tool gives video app developers visibility and insights into the inner workings of any [Twilio Video JavaScript application](https://github.com/twilio/twilio-video.js). It displays real-time information that is gathered from the Video SDKs [Room object](https://media.twiliocdn.com/sdk/js/video/releases/2.14.0/docs/Room.html) and relevant browser APIs.

![Room Monitor gif](https://user-images.githubusercontent.com/40278237/127718088-8581c62d-13c1-4766-850d-14e4afd3ef08.gif)

## Getting Started:

### NPM

You can install directly from npm.

```
npm install @twilio/twilio-video-room-monitor --save
```

Using this method, you can import 'twilio-room-monitor' like so:

```
import Video from 'twilio-video';
import VideoRoomMontitor from 'twilio-video-room-monitor';

Video.connect('token').then(room => {
  VideoRoomMontitor.registerRoom(room);
  VideoRoomMontitor.openMonitor();
});
```

### Script Tag

You can also copy `twilio-video-room-monitor.js` from the `dist/browser` folder and include it directly in your web app using a `<script>` tag.

```
<script src="https://cdn.jsdelivr.net/gh/twilio/twilio-video-room-monitor@0.0.1/dist/twilio-video-room-monitor.min.js"></script>
```

Using this method, you can open the room monitor like so:

```
window.Twilio.VideoRoomMontitor.openMonitor()
```

### Console Script

You can also run the following snippet in the browser console of a twilio-video.js app to load the inspector. Note that you must be able to register the room object in order for this to work:

```
(() => {
  const script = document.createElement('script');
  script.src = 'http://localhost:1234/index.js';
  // Register your Twilio Video Room here
  script.onload = () => window.Twilio.VideoRoomMonitor.registerVideoRoom(twilioRoom);
  document.body.appendChild(script)
})()
```

Using this method, you can open the monitor like so:

```
Twilio.VideoRoomMontitor.openMonitor()
```

## API:

#### `openMonitor()`

This opens the monitor and emits the `opened` event. To open the monitor, you can run this line of code in the console:

```
Twilio.VideoRoomMontitor.openMonitor()
```

To listen for the `opened` event, you can run the following line of code:

```
VideoRoomMontior.on('opened', () => console.log('the monitor has been opened'));
```

#### `closeMonitor()`

This closes the monitor and emits the `closed` event. To close the monitor, you can run this line of code in the console:

```
Twilio.VideoRoomMontitor.closeMonitor()
```

To listen for the `closed` event, you can run the following line of code:

```
VideoRoomMontior.on('closed', () => console.log('the monitor has been closed'));
```

#### `toggleMonitor()`

This toggles the monitor to be either open or closed. If the monitor is currently closed, then it will open the monitor (and emit the `opened` event) and vice versa. To toggle the monitor, you can run this line of code in the console:

```
Twilio.VideoRoomMontitor.toggleMonitor()
```

#### `registerRoom()`

This registers a Twilio Video Room and emits the `roomRegistered` event. To register a room, you can run the following line of code:

```
Twilio.VideoRoomMonitor.registerVideoRoom(newRoom);
```

#### `isOpen`

This is a boolean value that indicates whether or not the monitor is currently open.

## Local Development:

### Prerequisites

You must have the following installed:

- [Node.js v14+](https://nodejs.org/en/download/)
- NPM v7+ (comes installed with newer Node versions)

### Install dependencies:

Run `npm install` to install all dependencies from NPM.

### Scripts

#### `npm start`

This will compile the app (in watch mode) into a directory (`dist/node`) that will allow users to install the Monitor locally with NPM.

`npm install -S <path_to_monitor>`

NPM will install the Monitor as a symlink, so as files are edited, saved, and re-compiled, they will automatically be reflected in the application that has installed the Monitor locally.

Any TypeScript errors that are found will be displayed in the console.

#### `npm run build`

This will build both Node.js and browser versions of the Monitor in the `dist/` directory.

#### `npm run ts`

Run this command to check the types in the app.

#### `npm test`

Runs all unit tests.

#### `npm run lint`

Runs the linter.

#### `npm run parcel:watch`

This will host the app on a local server. This server can then be used to run the tool in the browser by using a script tag:

```
<script src="http://localhost:1234/index.js></script>
```

Or by running this code snippet in the console of your browser:

```
(() => {
const script = document.createElement('script');
script.src = 'http://localhost:1234/index.js';
// Register your Twilio Video Room here
script.onload = () => window.Twilio.VideoRoomMonitor.registerVideoRoom(twilioRoom);
document.body.appendChild(script)
})()
```

After this has finished running, you can run commands to open and close the monitor within the console.
