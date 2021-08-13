"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const useRoom_1 = __importDefault(require("../useRoom/useRoom"));
function useRoomState() {
    const room = useRoom_1.default();
    const [state, setState] = react_1.useState('disconnected');
    react_1.useEffect(() => {
        if (room) {
            const setRoomState = () => setState((room.state || 'disconnected'));
            setRoomState();
            room.on('disconnected', setRoomState).on('reconnected', setRoomState).on('reconnecting', setRoomState);
            return () => {
                room.off('disconnected', setRoomState).off('reconnected', setRoomState).off('reconnecting', setRoomState);
            };
        }
        else {
            setState('disconnected');
        }
    }, [room]);
    return state;
}
exports.default = useRoomState;
