"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const DataTrack_1 = __importDefault(require("./DataTrack"));
const enzyme_1 = require("enzyme");
const twilio_video_1 = require("twilio-video");
jest.mock('twilio-video', () => ({
    LocalDataTrack: class MockLocalDataTrack {
        constructor() {
            this.kind = 'mockKindLocal';
            this.name = 'mockName';
            this.id = 'mockIdLocal';
            this.maxPacketLifeTime = 'mockMaxPacketLifeTime';
            this.maxRetransmits = 'mockMaxRetransmits';
            this.ordered = 'mockOrdered';
            this.reliable = 'mockReliable';
        }
    },
    RemoteDataTrack: class MockRemoteDataTrack {
        constructor() {
            this.kind = 'mockKindRemote';
            this.name = 'mockName';
            this.sid = 'mockSidRemote';
            this.maxPacketLifeTime = 'mockMaxPacketLifeTime';
            this.maxRetransmits = 'mockMaxRetransmits';
            this.ordered = 'mockOrdered';
            this.reliable = 'mockReliable';
            this.priority = 'mockPriority';
            this.isEnabled = 'mockIsEnabled';
            this.isSubscribed = 'mockIsSubscribed';
            this.isSwitchedOff = 'mockIsSwitchedOff';
        }
    },
}));
describe('the DataTrack component', () => {
    it('should have the ID property display when there is a LocalDataTrack', () => {
        const wrapper = enzyme_1.shallow(react_1.default.createElement(DataTrack_1.default, { track: new twilio_video_1.LocalDataTrack() }));
        expect(wrapper.find({ label: 'ID', value: 'mockIdLocal' }).exists()).toBe(true);
    });
    it('should have the SID property display when there is a RemoteDataTrack', () => {
        const wrapper = enzyme_1.shallow(react_1.default.createElement(DataTrack_1.default, { track: new twilio_video_1.RemoteDataTrack() }));
        expect(wrapper.find({ label: 'SID', value: 'mockSidRemote' }).exists()).toBe(true);
    });
});
