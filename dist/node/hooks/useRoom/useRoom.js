"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const RoomProvider_1 = require("../../components/RoomProvider/RoomProvider");
function useRoom() {
    const context = (0, react_1.useContext)(RoomProvider_1.RoomContext);
    return context;
}
exports.default = useRoom;
