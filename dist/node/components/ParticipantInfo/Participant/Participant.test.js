"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = require("enzyme");
const Participant_1 = require("./Participant");
jest.mock('../../../hooks/useParticipantIsReconnecting/useParticipantIsReconnecting', () => () => false);
jest.mock('../../../hooks/useParticipantNetworkQualityLevel/useParticipantNetworkQualityLevel', () => () => 4);
jest.mock('../../../hooks/usePublications/usePublications', () => () => [
    { trackName: 'camera-123456', kind: 'video', trackSid: 'testVideoSid' },
    { trackName: 'microphone-123456', kind: 'audio', trackSid: 'testAudioSid' },
]);
describe('the Participant component', () => {
    it('should render correctly', () => {
        const wrapper = enzyme_1.shallow(react_1.default.createElement(Participant_1.Participant, { participant: { identity: 'mockIdentity', sid: 'testSid' } }));
        expect(wrapper).toMatchSnapshot();
    });
});
