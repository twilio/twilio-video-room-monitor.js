"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const ConnectionOptionTracks_1 = __importDefault(require("./ConnectionOptionTracks"));
const enzyme_1 = require("enzyme");
const twilio_video_1 = require("twilio-video");
class MockMediaStreamTrack {
    constructor() {
        this.id = 'mockIdProp';
        this.muted = 'mockIsNotMutedProp';
        this.kind = 'mockKindProp';
        this.label = 'mockLabelProp';
        this.readyState = 'mockReadyStateProp';
    }
}
const mockMediaStreamTrack = new MockMediaStreamTrack();
jest.mock('twilio-video', () => ({
    LocalVideoTrack: class MockLocalVideoTrack {
        constructor() {
            this.kind = 'video';
            this.name = 'mockNameLocalVideo';
            this.id = 'mockIdLocalVideo';
            this.mediaStreamTrack = new MockMediaStreamTrack();
        }
    },
    LocalAudioTrack: class MockLocalAudioTrack {
        constructor() {
            this.kind = 'audio';
            this.name = 'mockNameLocalAudio';
            this.id = 'mockIdLocalAudio';
            this.mediaStreamTrack = new MockMediaStreamTrack();
        }
    },
    LocalDataTrack: class MockLocalDataTrack {
        constructor() {
            this.kind = 'data';
            this.name = 'mockName';
            this.id = 'mockIdLocal';
            this.maxPacketLifeTime = 'mockMaxPacketLifeTime';
            this.maxRetransmits = 'mockMaxRetransmits';
            this.ordered = 'mockOrdered';
            this.reliable = 'mockReliable';
        }
    },
}));
Object.defineProperty(window, 'MediaStreamTrack', {
    value: MockMediaStreamTrack,
});
describe('the ConnectionOptionTracks component', () => {
    describe('when there is no track', () => {
        it('should return a Datum component with a label when the track is undefined', () => {
            const wrapper = enzyme_1.shallow(react_1.default.createElement(ConnectionOptionTracks_1.default, { tracks: undefined }));
            expect(wrapper).toMatchInlineSnapshot(`
                <Memo(Datum)
                  label="Tracks"
                />
              `);
        });
        it('should return the Datum component with a null value when the track is null', () => {
            const wrapper = enzyme_1.shallow(react_1.default.createElement(ConnectionOptionTracks_1.default, { tracks: null }));
            expect(wrapper).toMatchInlineSnapshot(`
                <Memo(Datum)
                  label="Tracks"
                  value={null}
                />
              `);
        });
    });
    describe('when there are tracks in the array', () => {
        it('should return a MediaStreamTrack component for MediaStreamTrack objects', () => {
            // @ts-ignore
            const wrapper = enzyme_1.shallow(react_1.default.createElement(ConnectionOptionTracks_1.default, { tracks: [mockMediaStreamTrack] }));
            expect(wrapper).toMatchInlineSnapshot(`
        <Accordion
          label="Tracks"
        >
          <Memo(styled.div)
            key="0"
          >
            <Memo(MediaStreamTrackInfo)
              track={
                MockMediaStreamTrack {
                  "id": "mockIdProp",
                  "kind": "mockKindProp",
                  "label": "mockLabelProp",
                  "muted": "mockIsNotMutedProp",
                  "readyState": "mockReadyStateProp",
                }
              }
            />
          </Memo(styled.div)>
        </Accordion>
      `);
        });
        it('should return a container with properties for LocalAudioTrack objects', () => {
            // @ts-ignore
            const wrapper = enzyme_1.shallow(react_1.default.createElement(ConnectionOptionTracks_1.default, { tracks: [new twilio_video_1.LocalAudioTrack()] }));
            expect(wrapper).toMatchInlineSnapshot(`
        <Accordion
          label="Tracks"
        >
          <Memo(styled.div)
            key="0"
          >
            <Memo(Datum)
              label="Kind"
              value="audio"
            />
            <Memo(Datum)
              label="Name"
              value="mockNameLocalAudio"
            />
            <Memo(Datum)
              label="ID"
              value="mockIdLocalAudio"
            />
            <Memo(MediaStreamTrackInfo)
              track={
                MockMediaStreamTrack {
                  "id": "mockIdProp",
                  "kind": "mockKindProp",
                  "label": "mockLabelProp",
                  "muted": "mockIsNotMutedProp",
                  "readyState": "mockReadyStateProp",
                }
              }
            />
          </Memo(styled.div)>
        </Accordion>
      `);
        });
        it('should return a container with properties for LocalVideoTrack objects', () => {
            // @ts-ignore
            const wrapper = enzyme_1.shallow(react_1.default.createElement(ConnectionOptionTracks_1.default, { tracks: [new twilio_video_1.LocalVideoTrack()] }));
            expect(wrapper).toMatchInlineSnapshot(`
        <Accordion
          label="Tracks"
        >
          <Memo(styled.div)
            key="0"
          >
            <Memo(Datum)
              label="Kind"
              value="video"
            />
            <Memo(Datum)
              label="Name"
              value="mockNameLocalVideo"
            />
            <Memo(Datum)
              label="ID"
              value="mockIdLocalVideo"
            />
            <Memo(MediaStreamTrackInfo)
              track={
                MockMediaStreamTrack {
                  "id": "mockIdProp",
                  "kind": "mockKindProp",
                  "label": "mockLabelProp",
                  "muted": "mockIsNotMutedProp",
                  "readyState": "mockReadyStateProp",
                }
              }
            />
          </Memo(styled.div)>
        </Accordion>
      `);
        });
        it('should return a container with properties for LocalDataTrack objects', () => {
            const wrapper = enzyme_1.shallow(react_1.default.createElement(ConnectionOptionTracks_1.default, { tracks: [new twilio_video_1.LocalDataTrack()] }));
            expect(wrapper).toMatchInlineSnapshot(`
        <Accordion
          label="Tracks"
        >
          <Memo(styled.div)
            key="0"
          >
            <Memo(Tracks)
              track={
                MockLocalDataTrack {
                  "id": "mockIdLocal",
                  "kind": "data",
                  "maxPacketLifeTime": "mockMaxPacketLifeTime",
                  "maxRetransmits": "mockMaxRetransmits",
                  "name": "mockName",
                  "ordered": "mockOrdered",
                  "reliable": "mockReliable",
                }
              }
            />
          </Memo(styled.div)>
        </Accordion>
      `);
        });
    });
});
