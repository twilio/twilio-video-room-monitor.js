# 2.0.0 (in progress)

### Breaking Changes

- React 18 or 19 is now required when installing from NPM. Support for React 16 and 17 has been removed. Applications on React 16 or 17 can continue to use version 1.x, or load the Monitor with the [Script Tag](https://github.com/twilio/twilio-video-room-monitor.js#script-tag) method, which bundles its own copy of React.

### Bug Fixes

- Fixed `TypeError: react_dom_1.default.render is not a function` when calling `openMonitor()` in applications using React 19. The Monitor now renders with `createRoot` instead of the removed `ReactDOM.render` API.

### Maintenance

- Upgraded `@visx/xychart` and `@visx/curve` to 4.x, which support React 19. `@react-spring/web` is now a dependency.
- Upgraded `styled-components` to 6.x and `eventemitter3` to 5.x.
- Removed the unused `react-spring` 8.x dependency.
- Upgraded the development toolchain (TypeScript 6, Jest 30, ESLint 9, Parcel 2.16) and now track `package-lock.json`. Local development requires Node.js 22 or later.
- Migrated the test suite from Enzyme to React Testing Library, replaced snapshot tests with explicit assertions, and added tests for opening and closing the Monitor with React 18 and 19. Test files are now type-checked by `npm run ts`.

# 1.0.1 (August 5, 2022)

### Improvements

- Added support for React 17

### Maintenance

- Upgraded [a number of packages](https://github.com/twilio/twilio-video-room-monitor.js/pull/49/files#diff-7ae45ad102eab3b6d7e7896acd08c427a9b25b346470d7bc6507b6481575d519).

# 1.0.0 (December 17, 2021)

The Twilio Video Room Monitor has been promoted to `1.0.0` and is now Generally Available!

### Features

- Mobile support now included!

### Bug Fixes

- Fix issue where the Twilio Video Room Monitor would crash after clicking on the `Stats` tab when using the [Script Tag](https://github.com/twilio/twilio-video-room-monitor.js#script-tag) method from the `README.md`.
- Thank you to @shinework [#39](https://github.com/twilio/twilio-video-room-monitor.js/pull/39) for helping us correct `README.md` typos so that our users can properly copy and paste the code snippets!

# 1.0.0-beta.2 (August 16, 2021)

### Improvements

- The README has been updated to provide correct jsDelivr URL and improve usage instructions.

# 1.0.0-beta.1 (August 13, 2021)

This is the intial release of the Twilio Video Room Monitor. Developers can now use this tool to gather insights and metrics on any Twilio Video JavaScript Application.

Features included in this release are:

- Realtime statistics on bandwidth (also represented using graphs)
- Local and remote track information for participant's video, audio, and data tracks
- Copy button to save a Room object JSON to one's clipboard
