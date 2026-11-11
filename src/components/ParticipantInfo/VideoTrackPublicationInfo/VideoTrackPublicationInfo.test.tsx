import { render, screen } from '@testing-library/react';
import { VideoTrackPublicationInfo, VideoTrackInfo } from './VideoTrackPublicationInfo';
import { useTrackBandwidth, useTrackData } from '../../../hooks/useStats/useStatsUtils';
import useTrack from '../../../hooks/useTrack/useTrack';

jest.mock('../../../hooks/useIsTrackEnabled/useIsTrackEnabled', () => () => true);
jest.mock('../../../hooks/useIsTrackSwitchedOff/useIsTrackSwitchedOff', () => () => false);
jest.mock('../../../hooks/useMediaStreamTrack/useMediaStreamTrack', () => () => undefined);
jest.mock(
  '../../../hooks/usePublishPriority/usePublishPriority',
  () => (publication: any) => publication.publishPriority
);
jest.mock('../../../hooks/useStats/useStatsUtils');
jest.mock('../../../hooks/useTrack/useTrack');
jest.mock('../../../hooks/useVideoTrackDimensions/useVideoTrackDimensions', () => () => ({ width: 1280, height: 720 }));
jest.mock('../../typography/trackInformation/MediaStreamTrackInfo/MediaStreamTrackInfo', () => () => (
  <div>media stream track info</div>
));

const mockUseTrackBandwidth = useTrackBandwidth as jest.Mock<any>;
const mockUseTrackData = useTrackData as jest.Mock<any>;
const mockUseTrack = useTrack as jest.Mock<any>;

mockUseTrackBandwidth.mockImplementation(() => 1234.56);
mockUseTrackData.mockImplementation(() => ({ codec: 'testCodec', frameRate: null, packetsLost: 7 }));
mockUseTrack.mockImplementation(() => ({}));

describe('the VideoTrackInfo component', () => {
  it('should render correctly if a video track is present', () => {
    render(<VideoTrackInfo track={{} as any} trackSid="testSid" />);
    [
      'Dimensions: 1280 x 720',
      'isSwitchedOff: false',
      'isEnabled: true',
      'Bandwidth: 1,234.56kbps',
      'Codec: testCodec',
      'Framerate: null',
      'Packets Lost: 7',
      'Packet Loss Percentage: null',
      'media stream track info',
    ].forEach((text) => expect(screen.getByText(text)).toBeInTheDocument());
  });

  it('should render correctly if there is no video track data', () => {
    mockUseTrackData.mockImplementationOnce(() => null);
    render(<VideoTrackInfo track={{} as any} trackSid="testSid" />);
    expect(screen.queryByText(/^Codec:/)).not.toBeInTheDocument();
    expect(screen.getByText('Dimensions: 1280 x 720')).toBeInTheDocument();
  });

  it('should display the subscribePriority when it exists', () => {
    render(<VideoTrackInfo track={{ priority: 'high' } as any} trackSid="testSid" />);
    expect(screen.getByText('subscribePriority: high')).toBeInTheDocument();
  });

  it('should display the subscribePriority when it is null', () => {
    render(<VideoTrackInfo track={{ priority: null } as any} trackSid="testSid" />);
    expect(screen.getByText('subscribePriority: null')).toBeInTheDocument();
  });

  it('should not display the subscribePriority when it doesnt exist', () => {
    render(<VideoTrackInfo track={{} as any} trackSid="testSid" />);
    expect(screen.queryByText(/^subscribePriority:/)).not.toBeInTheDocument();
  });

  describe('the Packet Loss Percentage', () => {
    it.each([
      ['null when packetsLost, packetsReceived and packetsSent are not defined', { packetsLost: null }, 'null'],
      [
        'a value for the RemoteVideoTrack when both packetsReceived and packetsLost are defined',
        { packetsLost: 7, packetsReceived: 100 },
        '7%',
      ],
      [
        'a value for the LocalVideoTrack when both packetsSent and packetsLost are defined',
        { packetsLost: 30, packetsSent: 29448 },
        '0.102%',
      ],
      [
        '0% for the RemoteVideoTrack when packetsLost is 0 and packetsReceived is defined',
        { packetsLost: 0, packetsReceived: 29448 },
        '0%',
      ],
      [
        '0% for the LocalVideoTrack when packetsLost is 0 and packetsSent is defined',
        { packetsLost: 0, packetsSent: 2134 },
        '0%',
      ],
      [
        'null for the RemoteVideoTrack when packetsLost is null and packetsReceived is defined',
        { packetsLost: null, packetsReceived: 29448 },
        'null',
      ],
      [
        'null for the LocalVideoTrack when packetsLost is null and packetsSent is defined',
        { packetsLost: null, packetsSent: 2134 },
        'null',
      ],
    ])('should display %s', (_, data, expected) => {
      mockUseTrackData.mockImplementationOnce(() => ({ codec: 'testCodec', frameRate: null, ...data }));
      render(<VideoTrackInfo track={{} as any} trackSid="testSid" />);
      expect(screen.getByText(`Packet Loss Percentage: ${expected}`)).toBeInTheDocument();
    });
  });
});

describe('the VideoTrackPublicationInfo component', () => {
  it('should render correctly', () => {
    render(
      <VideoTrackPublicationInfo
        publication={{ trackName: 'testName', trackSid: 'testSid', publishPriority: 'standard' } as any}
      />
    );
    [
      'Name: testName',
      'SID: testSid',
      'isSubscribed: true',
      'publishPriority: standard',
      'Dimensions: 1280 x 720',
    ].forEach((text) => expect(screen.getByText(text)).toBeInTheDocument());
    expect(mockUseTrackData).toHaveBeenCalledWith('testSid');
  });

  it('should display publishPriority when it is null', () => {
    render(
      <VideoTrackPublicationInfo
        publication={{ trackName: 'testName', trackSid: 'testSid', publishPriority: null } as any}
      />
    );
    expect(screen.getByText('publishPriority: null')).toBeInTheDocument();
  });

  it('should not display publishPriority when it does not exist', () => {
    render(<VideoTrackPublicationInfo publication={{ trackName: 'testName', trackSid: 'testSid' } as any} />);
    expect(screen.queryByText(/^publishPriority:/)).not.toBeInTheDocument();
  });

  it('should not render the VideoTrackInfo component if a video track is not present', () => {
    mockUseTrack.mockImplementationOnce(() => null);
    render(<VideoTrackPublicationInfo publication={{ trackName: 'testName', trackSid: 'testSid' } as any} />);
    expect(screen.getByText('isSubscribed: false')).toBeInTheDocument();
    expect(screen.queryByText(/^Dimensions:/)).not.toBeInTheDocument();
  });
});
