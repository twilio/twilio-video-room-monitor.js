import { fireEvent, render, screen } from '@testing-library/react';
import RoomInfo from './RoomInfo';
import useRoomState from '../../hooks/useRoomState/useRoomState';
import useRoom from '../../hooks/useRoom/useRoom';

jest.mock('../../hooks/useDominantSpeaker/useDominantSpeaker', () => () => ({ identity: 'testIdentity' }));
jest.mock('../../hooks/useIsRecording/useIsRecording', () => () => 'false');
jest.mock('../../hooks/useRoom/useRoom');

jest.mock('../../hooks/useRoomState/useRoomState');
jest.mock('../../hooks/useStats/useStats', () => () => ({
  currentReceivedBitrate: 1234.56,
  currentSentBitrate: 6543.21,
}));
jest.mock('../typography/trackInformation/ConnectionOptionTracks/ConnectionOptionTracks', () => ({ tracks }: any) => (
  <div>connection option tracks: {tracks.join(', ')}</div>
));

const mockUseRoomState = useRoomState as jest.Mock<any>;
mockUseRoomState.mockImplementation(() => 'connected');

const mockUseRoom = useRoom as jest.Mock<any>;
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
    render(<RoomInfo />);
    [
      'Room Name: test123',
      'SID: XXXXXXXXXXXXX1234',
      'State: connected',
      'Dominant Speaker: testIdentity',
      'Media Region: testRegion',
      'Is Recording: false',
      'Total Sent Bandwidth: 6,543.21kbps',
      'Total Received Bandwidth: 1,234.56kbps',
    ].forEach((text) => expect(screen.getByText(text)).toBeInTheDocument());
  });

  it('should display the connection options when the Connection Options accordion is opened', () => {
    render(<RoomInfo />);
    expect(screen.queryByText('Automatic Subscription: true')).not.toBeInTheDocument();

    fireEvent.click(screen.getByText('Connection Options'));
    [
      'Audio: true',
      'Automatic Subscription: true',
      'Bandwidth Profile: mockBandwidthProfile',
      'Dominant Speaker: true',
      'DSCP Tagging: true',
      'Enable DSCP: false',
      'Ice Servers: undefined',
      'Ice Transport Policy: undefined',
      'Insights: true',
      'Max Audio Bitrate: 1600',
      'Max Video Bitrate: null',
      'Name: testRoom',
      'Network Quality: true',
      'Region: testRegion',
      'Logger Name: logger-twilio-video',
      'connection option tracks: mockTrack',
      'Video: true',
    ].forEach((text) => expect(screen.getByText(text)).toBeInTheDocument());
    expect(screen.getByText('Preferred Audio Codecs')).toBeInTheDocument();
    expect(screen.getByText('Preferred Video Codecs')).toBeInTheDocument();
  });

  it('should not render anything if the room does not exist', () => {
    mockUseRoom.mockImplementationOnce(() => null);
    const { container } = render(<RoomInfo />);
    expect(container).toBeEmptyDOMElement();
  });

  it('should display a warning when not connected to a Twilio Video room', () => {
    mockUseRoomState.mockImplementationOnce(() => 'disconnected');
    render(<RoomInfo />);
    expect(screen.getByText('Not connected to a Twilio Video room.')).toBeInTheDocument();
    expect(screen.queryByText('Room Name: test123')).not.toBeInTheDocument();
  });
});
