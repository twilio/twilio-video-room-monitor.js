import React from 'react';
import Tracks from './ConnectionOptionTracks';
import { shallow } from 'enzyme';
import { LocalVideoTrack, LocalAudioTrack, LocalDataTrack } from 'twilio-video';

class MockMediaStreamTrack {
  id = 'mockIdProp';
  muted = 'mockIsNotMutedProp';
  kind = 'mockKindProp';
  label = 'mockLabelProp';
  readyState = 'mockReadyStateProp';
}

const mockMediaStreamTrack = new MockMediaStreamTrack();

jest.mock('twilio-video', () => ({
  LocalVideoTrack: class MockLocalVideoTrack {
    kind = 'mockKindLocalVideo';
    name = 'mockNameLocalVideo';
    id = 'mockIdLocalVideo';
    mediaStreamTrack = new MockMediaStreamTrack();
  },
  LocalAudioTrack: class MockLocalAudioTrack {
    kind = 'mockKindLocalAudio';
    name = 'mockNameLocalAudio';
    id = 'mockIdLocalAudio';
    mediaStreamTrack = new MockMediaStreamTrack();
  },
  LocalDataTrack: class MockLocalDataTrack {
    kind = 'mockKindLocal';
    name = 'mockName';
    id = 'mockIdLocal';
    maxPacketLifeTime = 'mockMaxPacketLifeTime';
    maxRetransmits = 'mockMaxRetransmits';
    ordered = 'mockOrdered';
    reliable = 'mockReliable';
  },
}));

Object.defineProperty(window, 'MediaStreamTrack', {
  value: MockMediaStreamTrack,
});

describe('the Tracks component', () => {
  describe('when there is no track', () => {
    it('should return a Datum component with a label when the track is undefined', () => {
      const wrapper = shallow(<Tracks tracks={undefined} />);
      expect(wrapper).toMatchInlineSnapshot(`
                <Memo(Datum)
                  label="Tracks"
                />
              `);
    });
    it('should return the Datum component with a null value when the track is null', () => {
      const wrapper = shallow(<Tracks tracks={null} />);
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
      const wrapper = shallow(<Tracks tracks={[mockMediaStreamTrack]} />);
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
      const wrapper = shallow(<Tracks tracks={[new LocalAudioTrack()]} />);
      expect(wrapper).toMatchInlineSnapshot(`
        <Accordion
          label="Tracks"
        >
          <Memo(styled.div)
            key="0"
          >
            <Memo(Datum)
              label="Kind"
              value="mockKindLocalAudio"
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
      const wrapper = shallow(<Tracks tracks={[new LocalVideoTrack()]} />);
      expect(wrapper).toMatchInlineSnapshot(`
        <Accordion
          label="Tracks"
        >
          <Memo(styled.div)
            key="0"
          >
            <Memo(Datum)
              label="Kind"
              value="mockKindLocalVideo"
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
      const wrapper = shallow(<Tracks tracks={[new LocalDataTrack()]} />);
      expect(wrapper).toMatchInlineSnapshot(`
        <Accordion
          label="Tracks"
        >
          <Memo(styled.div)
            key="0"
          >
            <Memo(Datum)
              label="Kind"
              value="mockKindLocal"
            />
            <Memo(Datum)
              label="ID"
              value="mockIdLocal"
            />
            <Memo(Datum)
              label="maxPacketLifeTime"
              value="mockMaxPacketLifeTime"
            />
            <Memo(Datum)
              label="maxRetransmits"
              value="mockMaxRetransmits"
            />
            <Memo(Datum)
              label="Ordered"
              value="mockOrdered"
            />
            <Memo(Datum)
              label="Reliable"
              value="mockReliable"
            />
          </Memo(styled.div)>
        </Accordion>
      `);
    });
  });
});
