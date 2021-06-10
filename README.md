# Twilio Video Inspector

[![CircleCI](https://circleci.com/gh/twilio/twilio-video-inspector.svg?style=svg&circle-token=e455a056673b1eb7a7692269da5154167b0eb32a)](https://circleci.com/gh/twilio/twilio-video-inspector)

### Install dependencies:

```
npm install
```

### Scripts:

#### `npm start`

This will compile the app (in watch mode) into a directory (`dist/node`) that will allow users to install the Inspector with npm.

`npm install -S <path_to_inspector>`

Npm will install the inspector as a symlink, so as files are edited, saved, and re-compiled, they will automatically be reflected in the application that has installed the Inspector locally.

Any TypeScript errors that are found will be displayed in the console.

#### `npm run build`

This will build both Node.js and browser versions of the Inspector in the `dist/` directory.

#### `npm run ts`

Run this command to check the types in the app.

#### `npm test`

Runs all unit tests.

#### `npm run lint`

Runs the linter.
