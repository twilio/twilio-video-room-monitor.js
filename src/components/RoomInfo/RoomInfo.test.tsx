import React from 'react';
import { shallow } from 'enzyme';
import RoomInfo from './RoomInfo';
import useRoomState from '../../hooks/useRoomState/useRoomState';
import { LocalAudioTrack, LocalVideoTrack } from 'twilio-video';

jest.mock('../../hooks/useDominantSpeaker/useDominantSpeaker', () => () => ({
  dominantSpeaker: { identity: 'testIdentity' },
}));
jest.mock('../../hooks/useIsRecording/useIsRecording', () => () => 'false');
jest.mock('../../hooks/useRoom/useRoom', () => () => ({
  name: 'test123',
  sid: 'XXXXXXXXXXXXX1234',
  mediaRegion: 'testRegion',
  _options: {
    audio: { logLevel: {}, loggerName: 'twilio-audio', name: 'testName', workaroundWebKitBug180748: true },
    automaticSubscription: true,
    bandwidthProfile: {
      video: {
        dominantSpeakerPriority: 'standard',
        maxSubscriptionBitrate: 10,
        clientTrackSwitchOffControl: 'auto',
        contentPreferencesMode: 'auto',
        maxTracks: 100,
        mode: 'grid',
        renderDimensions: {
          high: { width: 1080, height: 720 },
          low: { width: 100, height: 70 },
          standard: { width: 340, height: 190 },
        },
        trackSwitchOffMode: 'predicted',
      },
    },
    dscpTagging: true,
    enableDscp: false,
    eventListener: null,
    iceServers: [],
    iceTransportPolicy: undefined,
    insights: true,
    maxAudioBitrate: 1600,
    maxVideoBitrate: null,
    name: 'testRoom',
    networkQuality: {
      local: 1,
      remote: 1,
    },
    region: 'testRegion',
    preferredAudioCodecs: [
      {
        isa: 'testIsa',
        opus: 'testOpus',
        PCMA: 'testPCMA',
        PCMU: 'testPCMU',
      },
    ],
    preferredVideoCodecs: [
      {
        codec: 'VP0',
        simulcast: false,
      },
      {
        codec: 'VP8',
        simulcast: true,
      },
    ],
    logLevel: {},
    loggerName: 'logger-twilio-video',
    tracks: [LocalAudioTrack, LocalVideoTrack],
    video: { logLevel: {}, loggerName: 'twilio-video', name: 'testName', workaroundWebKitBug180748: false },
  },
}));

jest.mock('../../hooks/useRoomState/useRoomState');
jest.mock('../../hooks/useStats/useStats', () => () => ({
  currentReceivedBitrate: 1234.56,
  currentSentBitrate: 6543.21,
}));

const mockUseRoomState = useRoomState as jest.Mock<any>;
mockUseRoomState.mockImplementation(() => 'connected');

describe('The RoomInfo component', () => {
  it('should render information about the room if connected to a Twilio Video room', () => {
    const wrapper = shallow(<RoomInfo />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should display warning when not connected to a Twilio Video room', () => {
    mockUseRoomState.mockImplementationOnce(() => 'disconnected');
    const wrapper = shallow(<RoomInfo />);
    expect(wrapper.contains(<span>Not connected to a Twilio Video room.</span>)).toBe(true);
  });
});
