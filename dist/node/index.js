"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoRoomMonitor = void 0;
const react_1 = __importDefault(require("react"));
const react_dom_1 = __importDefault(require("react-dom"));
const App_1 = __importDefault(require("./App"));
const eventemitter3_1 = __importDefault(require("eventemitter3"));
const RoomProvider_1 = require("./components/RoomProvider/RoomProvider");
class VideoRoomMonitorImpl extends eventemitter3_1.default {
    get isOpen() {
        return Boolean(this.container);
    }
    openMonitor() {
        if (!this.container) {
            const container = document.createElement('div');
            document.body.appendChild(container);
            container.id = 'TwilioVideoRoomMonitorContainer';
            react_dom_1.default.render(react_1.default.createElement(App_1.default, null), container);
            this.container = container;
            this.emit('opened');
        }
    }
    closeMonitor() {
        if (this.container) {
            react_dom_1.default.unmountComponentAtNode(this.container);
            this.container.remove();
            this.container = undefined;
            this.emit('closed');
        }
    }
    toggleMonitor() {
        this.isOpen ? this.closeMonitor() : this.openMonitor();
    }
    registerVideoRoom(room) {
        RoomProvider_1.roomRegistry.registerVideoRoom(room);
    }
}
exports.VideoRoomMonitor = new VideoRoomMonitorImpl();
// Add API to window variable when the parcel target is browser
if (process.env.PARCEL_TARGET === 'browser') {
    // @ts-ignore
    window.Twilio = window.Twilio || {};
    // @ts-ignore
    window.Twilio.VideoRoomMonitor = exports.VideoRoomMonitor;
}
