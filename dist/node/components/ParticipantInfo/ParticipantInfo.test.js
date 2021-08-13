"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = require("enzyme");
const ParticipantInfo_1 = __importDefault(require("./ParticipantInfo"));
const useRoom_1 = __importDefault(require("../../hooks/useRoom/useRoom"));
const useRoomState_1 = __importDefault(require("../../hooks/useRoomState/useRoomState"));
jest.mock('../../hooks/useParticipants/useParticipants', () => () => [
    {
        sid: 'testSid1',
        identity: 'test user1',
        isReconnecting: false,
        networkQualityLevel: 4,
    },
    {
        sid: 'testSid2',
        identity: 'test user2',
        isReconnecting: false,
        networkQualityLevel: 3,
    },
]);
jest.mock('../../hooks/useRoomState/useRoomState');
jest.mock('../../hooks/useRoom/useRoom');
const mockUseRoom = useRoom_1.default;
mockUseRoom.mockImplementation(() => ({ room: {} }));
const mockUseRoomState = useRoomState_1.default;
mockUseRoomState.mockImplementation(() => 'connected');
describe('the ParticipantInfo component', () => {
    it('should render correctly for each participant when a room exists', () => {
        const wrapper = enzyme_1.shallow(react_1.default.createElement(ParticipantInfo_1.default, null));
        expect(wrapper).toMatchSnapshot();
    });
    it('should not render anything when a room does not exist', () => {
        mockUseRoom.mockImplementationOnce(() => null);
        const wrapper = enzyme_1.shallow(react_1.default.createElement(ParticipantInfo_1.default, null));
        expect(wrapper.getElement()).toBe(null);
    });
    it('should not render anything when a room is disconnected', () => {
        mockUseRoomState.mockImplementationOnce(() => 'disconnected');
        const wrapper = enzyme_1.shallow(react_1.default.createElement(ParticipantInfo_1.default, null));
        expect(wrapper.getElement()).toBe(null);
    });
});
