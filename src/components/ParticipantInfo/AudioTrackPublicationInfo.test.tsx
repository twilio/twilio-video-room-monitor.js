import React from 'react';
import { shallow } from 'enzyme';
import { AudioTrackPublicationInfo, AudioTrackInfo } from './AudioTrackPublicationInfo';
import { useTrackBandwidth, useTrackData } from '../../hooks/useStats/useStatsUtils';
import useTrack from '../../hooks/useTrack/useTrack';

jest.mock('../../hooks/useIsTrackEnabled/useIsTrackEnabled', () => () => true);
jest.mock('../../hooks/useStats/useStatsUtils');
jest.mock('../../hooks/useTrack/useTrack');

const mockUseTrackBandwidth = useTrackBandwidth as jest.Mock<any>;
const mockUseTrackData = useTrackData as jest.Mock<any>;
const mockUseTrack = useTrack as jest.Mock<any>;

mockUseTrackBandwidth.mockImplementation(() => 1234.56);
mockUseTrackData.mockImplementation(() => ({ codec: 'testCodec', jitter: 2, packetsLost: 7 }));
mockUseTrack.mockImplementation(() => 'testTrack');

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

  it('should render correctly for the RemoteAudioTrack when packetsLost is not defined', () => {
    mockUseTrackData.mockImplementationOnce(() => (
      { codec: 'testCodec', frameRate: null, packetsLost: null}
    ));
    const wrapper = shallow(<AudioTrackInfo track={{} as any} trackSid="testSid" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly for the RemoteAudioTrack when both packetsReceived and packetsLost are defined', () => {
    mockUseTrackData.mockImplementationOnce(() => (
      { codec: 'testCodec', frameRate: null, packetsLost: 7, packetsReceived: 100 }
    ));
    const wrapper = shallow(<AudioTrackInfo track={{} as any} trackSid="testSid" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly for the LocalVideoTrack when both packetsSent and packetsLost are defined', () => {
    mockUseTrackData.mockImplementationOnce(() => (
      { codec: 'testCodec', frameRate: null, packetsLost: 56, packetsSent: 183 }
    ));
    const wrapper = shallow(<AudioTrackInfo track={{} as any} trackSid="testSid" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly for the RemoteVideoTrack when packetsLost is 0 and packetsReceived is defined', () => {
    mockUseTrackData.mockImplementationOnce(() => (
      { codec: 'testCodec', frameRate: null, packetsLost: 0, packetsReceived: 10 }
    ));
    const wrapper = shallow(<AudioTrackInfo track={{} as any} trackSid="testSid" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly for the LocalVideoTrack when packetsLost is 0 and packetsSent is defined', () => {
    mockUseTrackData.mockImplementationOnce(() => (
      { codec: 'testCodec', frameRate: null, packetsLost: 0, packetsSent: 10 }
    ));
    const wrapper = shallow(<AudioTrackInfo track={{} as any} trackSid="testSid" />);
    expect(wrapper).toMatchSnapshot();
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
