"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = require("enzyme");
const RoomInfo_1 = __importDefault(require("./RoomInfo"));
const useRoomState_1 = __importDefault(require("../../hooks/useRoomState/useRoomState"));
const useRoom_1 = __importDefault(require("../../hooks/useRoom/useRoom"));
jest.mock('../../hooks/useDominantSpeaker/useDominantSpeaker', () => () => ({
    dominantSpeaker: { identity: 'testIdentity' },
}));
jest.mock('../../hooks/useIsRecording/useIsRecording', () => () => 'false');
jest.mock('../../hooks/useRoom/useRoom');
jest.mock('../../hooks/useRoomState/useRoomState');
jest.mock('../../hooks/useStats/useStats', () => () => ({
    currentReceivedBitrate: 1234.56,
    currentSentBitrate: 6543.21,
}));
const mockUseRoomState = useRoomState_1.default;
mockUseRoomState.mockImplementation(() => 'connected');
const mockUseRoom = useRoom_1.default;
mockUseRoom.mockImplementation(() => ({
    name: 'test123',
    sid: 'XXXXXXXXXXXXX1234',
    mediaRegion: 'testRegion',
    _options: {
        audio: true,
        automaticSubscription: true,
        bandwidthProfile: 'mockBandwidthProfile',
        dominantSpeaker: true,
        dscpTagging: true,
        enableDscp: false,
        iceServers: [],
        iceTransportPolicy: undefined,
        insights: true,
        maxAudioBitrate: 1600,
        maxVideoBitrate: null,
        name: 'testRoom',
        networkQuality: true,
        region: 'testRegion',
        preferredAudioCodecs: ['PCMU'],
        preferredVideoCodecs: ['VP8'],
        loggerName: 'logger-twilio-video',
        tracks: ['mockTrack'],
        video: true,
    },
}));
describe('The RoomInfo component', () => {
    it('should render information about the room if connected to a Twilio Video room', () => {
        const wrapper = enzyme_1.shallow(react_1.default.createElement(RoomInfo_1.default, null));
        expect(wrapper).toMatchSnapshot();
    });
    it('should not render anything and return null if the room does not exist', () => {
        mockUseRoom.mockImplementationOnce(() => null);
        const wrapper = enzyme_1.shallow(react_1.default.createElement(RoomInfo_1.default, null));
        expect(wrapper.getElement()).toBe(null);
    });
    it('should display warning when not connected to a Twilio Video room', () => {
        mockUseRoomState.mockImplementationOnce(() => 'disconnected');
        const wrapper = enzyme_1.shallow(react_1.default.createElement(RoomInfo_1.default, null));
        expect(wrapper.contains(react_1.default.createElement("span", null, "Not connected to a Twilio Video room."))).toBe(true);
    });
});
