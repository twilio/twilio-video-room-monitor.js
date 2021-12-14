import React from 'react';
import { shallow } from 'enzyme';
import { AudioTrackPublicationInfo, AudioTrackInfo } from './AudioTrackPublicationInfo';
import { useTrackBandwidth, useTrackData } from '../../../hooks/useStats/useStatsUtils';
import useMediaStreamTrackProperties from '../../../hooks/useMediaStreamTrackProperties/useMediaStreamTrackProperties';
import useTrack from '../../../hooks/useTrack/useTrack';

jest.mock('../../../hooks/useIsTrackEnabled/useIsTrackEnabled', () => () => true);
jest.mock('../../../hooks/useStats/useStatsUtils');
jest.mock('../../../hooks/useTrack/useTrack');
jest.mock('../../../hooks/useMediaStreamTrackProperties/useMediaStreamTrackProperties');

const mockUseTrackBandwidth = useTrackBandwidth as jest.Mock<any>;
const mockUseTrackData = useTrackData as jest.Mock<any>;
const mockUseTrack = useTrack as jest.Mock<any>;
const mockMediaStreamTrackProperties = useMediaStreamTrackProperties as jest.Mock<any>;

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
    const wrapper = shallow(<AudioTrackInfo track={{} as any} trackSid="testSid" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly if there is no audio track data', () => {
    mockUseTrackData.mockImplementationOnce(() => null);
    const wrapper = shallow(<AudioTrackInfo track={{} as any} trackSid="testSid" />);
    expect(wrapper.find({ label: 'Codec' }).exists()).toBeFalsy();
  });

  describe('the Packet Loss Percentage', () => {
    it('should display null when packetsLost, packetsReceived and packetsSent are not defined', () => {
      mockUseTrackData.mockImplementationOnce(() => ({
        codec: 'testCodec',
        frameRate: null,
        packetsLost: null,
      }));
      const wrapper = shallow(<AudioTrackInfo track={{} as any} trackSid="testSid" />);
      expect(wrapper.find({ label: 'Packet Loss Percentage' }).prop('value')).toBe(null);
    });

    it('should display a value for the RemoteAudioTrack when both packetsReceived and packetsLost are defined', () => {
      mockUseTrackData.mockImplementationOnce(() => ({
        codec: 'testCodec',
        frameRate: null,
        packetsLost: 7,
        packetsReceived: 100,
      }));
      const wrapper = shallow(<AudioTrackInfo track={{} as any} trackSid="testSid" />);
      expect(wrapper.find({ label: 'Packet Loss Percentage' }).prop('value')).toBe('7%');
    });

    it('should display a value for the LocalAudioTrack when both packetsSent and packetsLost are defined', () => {
      mockUseTrackData.mockImplementationOnce(() => ({
        codec: 'testCodec',
        frameRate: null,
        packetsLost: 30,
        packetsSent: 29448,
      }));
      const wrapper = shallow(<AudioTrackInfo track={{} as any} trackSid="testSid" />);
      expect(wrapper.find({ label: 'Packet Loss Percentage' }).prop('value')).toBe('0.102%');
    });

    it('should display 0% for the RemoteAudioTrack when packetsLost is 0 and packetsReceived is defined', () => {
      mockUseTrackData.mockImplementationOnce(() => ({
        codec: 'testCodec',
        frameRate: null,
        packetsLost: 0,
        packetsReceived: 29448,
      }));
      const wrapper = shallow(<AudioTrackInfo track={{} as any} trackSid="testSid" />);
      expect(wrapper.find({ label: 'Packet Loss Percentage' }).prop('value')).toBe('0%');
    });

    it('should display 0% for the LocalAudioTrack when packetsLost is 0 and packetsSent is defined', () => {
      mockUseTrackData.mockImplementationOnce(() => ({
        codec: 'testCodec',
        frameRate: null,
        packetsLost: 0,
        packetsSent: 2134,
      }));
      const wrapper = shallow(<AudioTrackInfo track={{} as any} trackSid="testSid" />);
      expect(wrapper.find({ label: 'Packet Loss Percentage' }).prop('value')).toBe('0%');
    });

    it('should display null for the RemoteAudioTrack when packetsLost is null and packetsReceived is defined', () => {
      mockUseTrackData.mockImplementationOnce(() => ({
        codec: 'testCodec',
        frameRate: null,
        packetsLost: null,
        packetsReceived: 29448,
      }));
      const wrapper = shallow(<AudioTrackInfo track={{} as any} trackSid="testSid" />);
      expect(wrapper.find({ label: 'Packet Loss Percentage' }).prop('value')).toBe(null);
    });

    it('should display null for the LocalAudioTrack when packetsLost is null and packetsSent is defined', () => {
      mockUseTrackData.mockImplementationOnce(() => ({
        codec: 'testCodec',
        frameRate: null,
        packetsLost: null,
        packetsSent: 2134,
      }));
      const wrapper = shallow(<AudioTrackInfo track={{} as any} trackSid="testSid" />);
      expect(wrapper.find({ label: 'Packet Loss Percentage' }).prop('value')).toBe(null);
    });
  });
});

describe('the AudioTrackPublicationInfo component', () => {
  it('should render correctly', () => {
    const wrapper = shallow(
      <AudioTrackPublicationInfo publication={{ trackName: 'testName', trackSid: 'testSid' } as any} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should not render the AudioTrackInfo component if an audio track is not present', () => {
    mockUseTrack.mockImplementationOnce(() => null);
    const wrapper = shallow(
      <AudioTrackPublicationInfo publication={{ trackName: 'testName', trackSid: 'testSid' } as any} />
    );
    expect(wrapper.find(AudioTrackInfo).exists()).toBeFalsy();
  });
});
