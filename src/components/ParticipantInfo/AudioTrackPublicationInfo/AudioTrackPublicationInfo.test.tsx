import { render, screen } from '@testing-library/react';
import { AudioTrackPublicationInfo, AudioTrackInfo } from './AudioTrackPublicationInfo';
import { useTrackBandwidth, useTrackData } from '../../../hooks/useStats/useStatsUtils';
import useTrack from '../../../hooks/useTrack/useTrack';

jest.mock('../../../hooks/useIsTrackEnabled/useIsTrackEnabled', () => () => true);
jest.mock('../../../hooks/useMediaStreamTrack/useMediaStreamTrack', () => () => undefined);
jest.mock('../../../hooks/useStats/useStatsUtils');
jest.mock('../../../hooks/useTrack/useTrack');
jest.mock('../../typography/trackInformation/MediaStreamTrackInfo/MediaStreamTrackInfo', () => () => (
  <div>media stream track info</div>
));

const mockUseTrackBandwidth = useTrackBandwidth as jest.Mock<any>;
const mockUseTrackData = useTrackData as jest.Mock<any>;
const mockUseTrack = useTrack as jest.Mock<any>;

mockUseTrackBandwidth.mockImplementation(() => 1234.56);
mockUseTrackData.mockImplementation(() => ({ codec: 'testCodec', jitter: 2, packetsLost: 7 }));
mockUseTrack.mockImplementation(() => 'testTrack');

describe('the AudioTrackInfo component', () => {
  it('should render correctly if an audio track is present', () => {
    render(<AudioTrackInfo track={{} as any} trackSid="testSid" />);
    [
      'isEnabled: true',
      'Bandwidth: 1,234.56kbps',
      'Codec: testCodec',
      'Jitter: 2',
      'Packets Lost: 7',
      'Packet Loss Percentage: null',
      'media stream track info',
    ].forEach((text) => expect(screen.getByText(text)).toBeInTheDocument());
  });

  it('should render correctly if there is no audio track data', () => {
    mockUseTrackData.mockImplementationOnce(() => null);
    render(<AudioTrackInfo track={{} as any} trackSid="testSid" />);
    expect(screen.queryByText(/^Codec:/)).not.toBeInTheDocument();
    expect(screen.getByText('isEnabled: true')).toBeInTheDocument();
  });

  describe('the Packet Loss Percentage', () => {
    it.each([
      ['null when packetsLost, packetsReceived and packetsSent are not defined', { packetsLost: null }, 'null'],
      [
        'a value for the RemoteAudioTrack when both packetsReceived and packetsLost are defined',
        { packetsLost: 7, packetsReceived: 100 },
        '7%',
      ],
      [
        'a value for the LocalAudioTrack when both packetsSent and packetsLost are defined',
        { packetsLost: 30, packetsSent: 29448 },
        '0.102%',
      ],
      [
        '0% for the RemoteAudioTrack when packetsLost is 0 and packetsReceived is defined',
        { packetsLost: 0, packetsReceived: 29448 },
        '0%',
      ],
      [
        '0% for the LocalAudioTrack when packetsLost is 0 and packetsSent is defined',
        { packetsLost: 0, packetsSent: 2134 },
        '0%',
      ],
      [
        'null for the RemoteAudioTrack when packetsLost is null and packetsReceived is defined',
        { packetsLost: null, packetsReceived: 29448 },
        'null',
      ],
      [
        'null for the LocalAudioTrack when packetsLost is null and packetsSent is defined',
        { packetsLost: null, packetsSent: 2134 },
        'null',
      ],
    ])('should display %s', (_, data, expected) => {
      mockUseTrackData.mockImplementationOnce(() => ({ codec: 'testCodec', ...data }));
      render(<AudioTrackInfo track={{} as any} trackSid="testSid" />);
      expect(screen.getByText(`Packet Loss Percentage: ${expected}`)).toBeInTheDocument();
    });
  });
});

describe('the AudioTrackPublicationInfo component', () => {
  it('should render correctly', () => {
    render(<AudioTrackPublicationInfo publication={{ trackName: 'testName', trackSid: 'testSid' } as any} />);
    ['Name: testName', 'SID: testSid', 'isSubscribed: true', 'isEnabled: true', 'Codec: testCodec'].forEach((text) =>
      expect(screen.getByText(text)).toBeInTheDocument()
    );
    expect(mockUseTrackData).toHaveBeenCalledWith('testSid');
  });

  it('should not render the AudioTrackInfo component if an audio track is not present', () => {
    mockUseTrack.mockImplementationOnce(() => null);
    render(<AudioTrackPublicationInfo publication={{ trackName: 'testName', trackSid: 'testSid' } as any} />);
    expect(screen.getByText('isSubscribed: false')).toBeInTheDocument();
    expect(screen.queryByText('isEnabled: true')).not.toBeInTheDocument();
  });
});
