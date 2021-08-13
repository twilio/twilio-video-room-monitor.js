"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = require("enzyme");
const AudioTrackPublicationInfo_1 = require("./AudioTrackPublicationInfo");
const useStatsUtils_1 = require("../../../hooks/useStats/useStatsUtils");
const useMediaStreamTrackProperties_1 = __importDefault(require("../../../hooks/useMediaStreamTrackProperties/useMediaStreamTrackProperties"));
const useTrack_1 = __importDefault(require("../../../hooks/useTrack/useTrack"));
jest.mock('../../../hooks/useIsTrackEnabled/useIsTrackEnabled', () => () => true);
jest.mock('../../../hooks/useStats/useStatsUtils');
jest.mock('../../../hooks/useTrack/useTrack');
jest.mock('../../../hooks/useMediaStreamTrackProperties/useMediaStreamTrackProperties');
const mockUseTrackBandwidth = useStatsUtils_1.useTrackBandwidth;
const mockUseTrackData = useStatsUtils_1.useTrackData;
const mockUseTrack = useTrack_1.default;
const mockMediaStreamTrackProperties = useMediaStreamTrackProperties_1.default;
mockUseTrackBandwidth.mockImplementation(() => 1234.56);
mockUseTrackData.mockImplementation(() => ({ codec: 'testCodec', jitter: 2, packetsLost: 7 }));
mockUseTrack.mockImplementation(() => 'testTrack');
mockMediaStreamTrackProperties.mockImplementation(() => ({
    id: 'mockId',
    muted: false,
    kind: 'mockKind',
    label: 'mockLabel',
    readyState: 'mockReadyState',
}));
describe('the AudioTrackInfo component', () => {
    it('should render correctly if an audio track is present', () => {
        const wrapper = enzyme_1.shallow(react_1.default.createElement(AudioTrackPublicationInfo_1.AudioTrackInfo, { track: {}, trackSid: "testSid" }));
        expect(wrapper).toMatchSnapshot();
    });
    it('should render correctly if there is no audio track data', () => {
        mockUseTrackData.mockImplementationOnce(() => null);
        const wrapper = enzyme_1.shallow(react_1.default.createElement(AudioTrackPublicationInfo_1.AudioTrackInfo, { track: {}, trackSid: "testSid" }));
        expect(wrapper.find({ label: 'Codec' }).exists()).toBeFalsy();
    });
    describe('the Packet Loss Percentage', () => {
        it('should display null when packetsLost, packetsReceived and packetsSent are not defined', () => {
            mockUseTrackData.mockImplementationOnce(() => ({
                codec: 'testCodec',
                frameRate: null,
                packetsLost: null,
            }));
            const wrapper = enzyme_1.shallow(react_1.default.createElement(AudioTrackPublicationInfo_1.AudioTrackInfo, { track: {}, trackSid: "testSid" }));
            expect(wrapper.find({ label: 'Packet Loss Percentage' }).prop('value')).toBe('null%');
        });
        it('should display a value for the RemoteAudioTrack when both packetsReceived and packetsLost are defined', () => {
            mockUseTrackData.mockImplementationOnce(() => ({
                codec: 'testCodec',
                frameRate: null,
                packetsLost: 7,
                packetsReceived: 100,
            }));
            const wrapper = enzyme_1.shallow(react_1.default.createElement(AudioTrackPublicationInfo_1.AudioTrackInfo, { track: {}, trackSid: "testSid" }));
            expect(wrapper.find({ label: 'Packet Loss Percentage' }).prop('value')).toBe('7%');
        });
        it('should display a value for the LocalAudioTrack when both packetsSent and packetsLost are defined', () => {
            mockUseTrackData.mockImplementationOnce(() => ({
                codec: 'testCodec',
                frameRate: null,
                packetsLost: 30,
                packetsSent: 29448,
            }));
            const wrapper = enzyme_1.shallow(react_1.default.createElement(AudioTrackPublicationInfo_1.AudioTrackInfo, { track: {}, trackSid: "testSid" }));
            expect(wrapper.find({ label: 'Packet Loss Percentage' }).prop('value')).toBe('0.102%');
        });
        it('should display 0% for the RemoteAudioTrack when packetsLost is 0 and packetsReceived is defined', () => {
            mockUseTrackData.mockImplementationOnce(() => ({
                codec: 'testCodec',
                frameRate: null,
                packetsLost: 0,
                packetsReceived: 29448,
            }));
            const wrapper = enzyme_1.shallow(react_1.default.createElement(AudioTrackPublicationInfo_1.AudioTrackInfo, { track: {}, trackSid: "testSid" }));
            expect(wrapper.find({ label: 'Packet Loss Percentage' }).prop('value')).toBe('0%');
        });
        it('should display 0% for the LocalAudioTrack when packetsLost is 0 and packetsSent is defined', () => {
            mockUseTrackData.mockImplementationOnce(() => ({
                codec: 'testCodec',
                frameRate: null,
                packetsLost: 0,
                packetsSent: 2134,
            }));
            const wrapper = enzyme_1.shallow(react_1.default.createElement(AudioTrackPublicationInfo_1.AudioTrackInfo, { track: {}, trackSid: "testSid" }));
            expect(wrapper.find({ label: 'Packet Loss Percentage' }).prop('value')).toBe('0%');
        });
        it('should display 0% for the RemoteAudioTrack when packetsLost is null and packetsReceived is defined', () => {
            mockUseTrackData.mockImplementationOnce(() => ({
                codec: 'testCodec',
                frameRate: null,
                packetsLost: null,
                packetsReceived: 29448,
            }));
            const wrapper = enzyme_1.shallow(react_1.default.createElement(AudioTrackPublicationInfo_1.AudioTrackInfo, { track: {}, trackSid: "testSid" }));
            expect(wrapper.find({ label: 'Packet Loss Percentage' }).prop('value')).toBe('0%');
        });
        it('should display 0% for the LocalAudioTrack when packetsLost is null and packetsSent is defined', () => {
            mockUseTrackData.mockImplementationOnce(() => ({
                codec: 'testCodec',
                frameRate: null,
                packetsLost: null,
                packetsSent: 2134,
            }));
            const wrapper = enzyme_1.shallow(react_1.default.createElement(AudioTrackPublicationInfo_1.AudioTrackInfo, { track: {}, trackSid: "testSid" }));
            expect(wrapper.find({ label: 'Packet Loss Percentage' }).prop('value')).toBe('0%');
        });
    });
});
describe('the AudioTrackPublicationInfo component', () => {
    it('should render correctly', () => {
        const wrapper = enzyme_1.shallow(react_1.default.createElement(AudioTrackPublicationInfo_1.AudioTrackPublicationInfo, { publication: { trackName: 'testName', trackSid: 'testSid' } }));
        expect(wrapper).toMatchSnapshot();
    });
    it('should not render the AudioTrackInfo component if an audio track is not present', () => {
        mockUseTrack.mockImplementationOnce(() => null);
        const wrapper = enzyme_1.shallow(react_1.default.createElement(AudioTrackPublicationInfo_1.AudioTrackPublicationInfo, { publication: { trackName: 'testName', trackSid: 'testSid' } }));
        expect(wrapper.find(AudioTrackPublicationInfo_1.AudioTrackInfo).exists()).toBeFalsy();
    });
});
