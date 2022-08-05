"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomContext = exports.roomRegistry = void 0;
const react_1 = __importStar(require("react"));
const eventemitter3_1 = __importDefault(require("eventemitter3"));
class RoomRegistry extends eventemitter3_1.default {
    registerVideoRoom(room) {
        this.room = room;
        this.emit('roomRegistered', room);
    }
}
exports.roomRegistry = new RoomRegistry();
exports.RoomContext = react_1.default.createContext(undefined);
function RoomProvider({ children }) {
    const [room, setRoom] = (0, react_1.useState)();
    (0, react_1.useEffect)(() => {
        if (exports.roomRegistry.room) {
            setRoom(exports.roomRegistry.room);
        }
        const handleRoomRegister = (newRoom) => setRoom(newRoom);
        exports.roomRegistry.on('roomRegistered', handleRoomRegister);
        return () => {
            exports.roomRegistry.off('roomRegistered', handleRoomRegister);
        };
    }, []);
    return react_1.default.createElement(exports.RoomContext.Provider, { value: room }, children);
}
exports.default = RoomProvider;
