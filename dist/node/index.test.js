"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const RoomProvider_1 = require("./components/RoomProvider/RoomProvider");
const index_1 = require("./index");
jest.mock('./App', () => () => react_1.default.createElement("div", null, "Test"));
describe('the Twilio Video Room Monitor API', () => {
    afterEach(() => index_1.VideoRoomMonitor.closeMonitor());
    it('should render the app to the document when opened, and remove it when closed', () => {
        var _a, _b, _c;
        expect((_a = document.querySelector('div')) === null || _a === void 0 ? void 0 : _a.textContent).toEqual(undefined);
        index_1.VideoRoomMonitor.openMonitor();
        expect((_b = document.querySelector('div')) === null || _b === void 0 ? void 0 : _b.textContent).toEqual('Test');
        index_1.VideoRoomMonitor.closeMonitor();
        expect((_c = document.querySelector('div')) === null || _c === void 0 ? void 0 : _c.textContent).toEqual(undefined);
    });
    it('should not render the app when it is already open', () => {
        var _a;
        expect((_a = document.querySelector('div')) === null || _a === void 0 ? void 0 : _a.textContent).toEqual(undefined);
        index_1.VideoRoomMonitor.openMonitor();
        index_1.VideoRoomMonitor.openMonitor();
        expect(document.querySelectorAll('#TwilioVideoRoomMonitorContainer').length).toEqual(1);
    });
    it('should not close the app when it is already closed', () => {
        var _a;
        expect((_a = document.querySelector('div')) === null || _a === void 0 ? void 0 : _a.textContent).toEqual(undefined);
        index_1.VideoRoomMonitor.closeMonitor();
        expect(document.querySelectorAll('#TwilioVideoRoomMonitorContainer').length).toEqual(0);
    });
    it('should emit events when opened and closed', () => {
        jest.spyOn(index_1.VideoRoomMonitor, 'emit');
        index_1.VideoRoomMonitor.openMonitor();
        expect(index_1.VideoRoomMonitor.emit).toHaveBeenCalledWith('opened');
        index_1.VideoRoomMonitor.closeMonitor();
        expect(index_1.VideoRoomMonitor.emit).toHaveBeenCalledWith('closed');
    });
    it('should correctly set isOpen when the monitor is opened or closed', () => {
        jest.spyOn(index_1.VideoRoomMonitor, 'emit');
        index_1.VideoRoomMonitor.openMonitor();
        expect(index_1.VideoRoomMonitor.isOpen).toBe(true);
        index_1.VideoRoomMonitor.closeMonitor();
        expect(index_1.VideoRoomMonitor.isOpen).toBe(false);
    });
    it('should emit events when toggled opened and closed', () => {
        jest.spyOn(index_1.VideoRoomMonitor, 'emit');
        index_1.VideoRoomMonitor.toggleMonitor();
        expect(index_1.VideoRoomMonitor.emit).toHaveBeenCalledWith('opened');
        index_1.VideoRoomMonitor.toggleMonitor();
        expect(index_1.VideoRoomMonitor.emit).toHaveBeenCalledWith('closed');
    });
    it('should register a room with the roomRegistry when registerVideoRoom is called', () => {
        jest.spyOn(RoomProvider_1.roomRegistry, 'emit');
        index_1.VideoRoomMonitor.registerVideoRoom('mockRoom');
        expect(RoomProvider_1.roomRegistry.emit).toHaveBeenCalledWith('roomRegistered', 'mockRoom');
        expect(RoomProvider_1.roomRegistry.room).toBe('mockRoom');
    });
    it('should not attach the VideoRoomMonitor to the window object when the PARCEL_TARGET environment variable is not set', () => {
        // Clears require cache so that we get a fresh import in this test
        jest.resetModules();
        // re-runs ./index.tsx
        require('./index');
        // @ts-ignore
        expect(window.Twilio).toBe(undefined);
    });
    describe('when the PARCEL_TARGET environment variable is "browser"', () => {
        beforeEach(() => {
            // Clears require cache so that we get a fresh import in this test
            jest.resetModules();
            process.env.PARCEL_TARGET = 'browser';
        });
        afterEach(() => {
            // Resets these values
            delete process.env.PARCEL_TARGET;
            // @ts-ignore
            delete window.Twilio;
        });
        it('should attach the VideoRoomMonitor to a new window.Twilio object when it does not already exist', () => {
            const VideoRoomMonitorImport = require('./index.tsx');
            // @ts-ignore
            expect(window.Twilio.VideoRoomMonitor).toBe(VideoRoomMonitorImport.VideoRoomMonitor);
        });
        it('should attach the VideoRoomMonitor to an existing window.Twilio object when it already exists', () => {
            // @ts-ignore
            window.Twilio = { otherTwilioModule: 'foo' };
            const VideoRoomMonitorImport = require('./index.tsx');
            // @ts-ignore
            expect(window.Twilio).toEqual({
                VideoRoomMonitor: VideoRoomMonitorImport.VideoRoomMonitor,
                otherTwilioModule: 'foo',
            });
        });
    });
});
