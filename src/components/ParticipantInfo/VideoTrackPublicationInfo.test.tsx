import React from 'react';
import { shallow } from 'enzyme';
import { VideoTrackPublicationInfo, VideoTrackInfo } from './VideoTrackPublicationInfo';
import { useTrackBandwidth, useTrackData } from '../../hooks/useStats/useStats';
import useTrack from '../../hooks/useTrack/useTrack';

jest.mock('../../hooks/useIsTrackEnabled/useIsTrackEnabled', () => () => true);
jest.mock('../../hooks/useIsTrackSwitchedOff/useIsTrackSwitchedOff', () => () => false);
jest.mock('../../hooks/usePublishPriority/usePublishPriority', () => () => 'standard');
jest.mock('../../hooks/useStats/useStats');
jest.mock('../../hooks/useTrack/useTrack');
jest.mock('../../hooks/useVideoTrackDimensions/useVideoTrackDimensions', () => () => ({ width: 1280, height: 720 }));

const mockUseTrackBandwidth = useTrackBandwidth as jest.Mock<any>;
const mockUseTrackData = useTrackData as jest.Mock<any>;
const mockUseTrack = useTrack as jest.Mock<any>;

mockUseTrackBandwidth.mockImplementation(() => 1234.56);
mockUseTrackData.mockImplementation(() => ({ codec: 'testCodec', frameRate: null, packetsLost: 7 }));
mockUseTrack.mockImplementation(() => 'testTrack');

describe('the VideoTrackInfo component', () => {
  it('should render correctly if a video track is present', () => {
    const wrapper = shallow(<VideoTrackInfo track={{} as any} trackSid="testSid" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly if there is no video track data', () => {
    mockUseTrackData.mockImplementationOnce(() => null);
    const wrapper = shallow(<VideoTrackInfo track={{} as any} trackSid="testSid" />);
    expect(wrapper.find({ label: 'Codec' }).exists()).toBeFalsy();
  });
});

describe('the VideoTrackPublicationInfo component', () => {
  it('should render correctly', () => {
    const wrapper = shallow(
      <VideoTrackPublicationInfo publication={{ trackName: 'testName', trackSid: 'testSid' } as any} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should not render the VideoTrackInfo component if a video track is not present', () => {
    mockUseTrack.mockImplementationOnce(() => null);
    const wrapper = shallow(
      <VideoTrackPublicationInfo publication={{ trackName: 'testName', trackSid: 'testSid' } as any} />
    );
    expect(wrapper.find(VideoTrackInfo).exists()).toBeFalsy();
  });
});
