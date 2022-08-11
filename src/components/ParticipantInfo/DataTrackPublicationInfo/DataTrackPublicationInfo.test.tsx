import React from 'react';
import { shallow } from 'enzyme';
import { DataTrackPublicationInfo, DataTrackInfo } from './DataTrackPublicationInfo';
import useTrack from '../../../hooks/useTrack/useTrack';

jest.mock('../../../hooks/useIsTrackSwitchedOff/useIsTrackSwitchedOff', () => () => true);
jest.mock('../../../hooks/useTrack/useTrack');

const mockUseTrack = useTrack as jest.Mock<any>;

mockUseTrack.mockImplementation(() => 'testTrack');

describe('the DataTrackInfo component', () => {
  it('should render correctly when a data track is present', () => {
    const wrapper = shallow(<DataTrackInfo track={{ isSwitchedOff: false, priority: 'high' } as any} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly when isSwitchedOff and priority are undefined (for local data track)', () => {
    const wrapper = shallow(<DataTrackInfo track={{} as any} />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('the DataTrackPublicationInfo component', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<DataTrackPublicationInfo publication={{ trackName: 'testName' } as any} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should not render the DataTrackInfo component when a data track is not present', () => {
    mockUseTrack.mockImplementationOnce(() => null);
    const wrapper = shallow(<DataTrackPublicationInfo publication={{ trackName: 'testName' } as any} />);
    expect(wrapper.find(DataTrackInfo).exists()).toBe(false);
  });
});
