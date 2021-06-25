import React from 'react';
import { shallow } from 'enzyme';
import RoomInfo from './RoomInfo';
import useRoomState from '../../hooks/useRoomState/useRoomState';
import useRoom from '../../hooks/useRoom/useRoom';

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

const mockUseRoomState = useRoomState as jest.Mock<any>;
mockUseRoomState.mockImplementation(() => 'connected');

const mockUseRoom = useRoom as jest.Mock<any>;

beforeEach(() => {
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
});

describe('The RoomInfo component', () => {
  it('should render information about the room if connected to a Twilio Video room', () => {
    const wrapper = shallow(<RoomInfo />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should not render anything and return null if the room does not exist', () => {
    mockUseRoom.mockImplementationOnce(() => null);
    const wrapper = shallow(<RoomInfo />);
    expect(wrapper.getElement()).toBe(null);
  });

  it('should display warning when not connected to a Twilio Video room', () => {
    mockUseRoomState.mockImplementationOnce(() => 'disconnected');
    const wrapper = shallow(<RoomInfo />);
    expect(wrapper.contains(<span>Not connected to a Twilio Video room.</span>)).toBe(true);
  });
});
