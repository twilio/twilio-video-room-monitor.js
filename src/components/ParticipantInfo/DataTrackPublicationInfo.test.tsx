import React from 'react';
import { shallow } from 'enzyme';
import { DataTrackPublicationInfo, DataTrackInfo } from './DataTrackPublicationInfo';
import useTrack from '../../hooks/useTrack/useTrack';

jest.mock('../../hooks/useIsTrackEnabled/useIsTrackEnabled', () => () => true);
jest.mock('../../hooks/useIsTrackSwitchedOff/useIsTrackSwitchedOff', () => () => true);
jest.mock('../../hooks/useTrack/useTrack');

const mockUseTrack = useTrack as jest.Mock<any>;

mockUseTrack.mockImplementation(() => 'testTrack');

describe('the DataTrackInfo component', () => {
  describe('for LocalDataTrack objects', () => {
    it('should render correctly if a data track is present', () => {
      const wrapper = shallow(<DataTrackInfo track={{} as any} />);
      expect(wrapper).toMatchSnapshot();
    });
    it('should render correctly if there is no data track data', () => {
      const wrapper = shallow(<DataTrackInfo track={{} as any} />);
      expect(wrapper.find({ isEnabled: true }).exists()).toBeFalsy();
    });
  });
  describe('for RemoteDataTrack objects', () => {
    it('should render correctly if a data track is present', () => {
      const wrapper = shallow(<DataTrackInfo track={{ isEnabled: true, isSwitchedOff: false } as any} />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});

describe('the DataTrackPublicationInfo component', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<DataTrackPublicationInfo publication={{ trackName: 'testName' } as any} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should not render the DataTrackInfo component if an data track is not present', () => {
    mockUseTrack.mockImplementationOnce(() => null);
    const wrapper = shallow(<DataTrackPublicationInfo publication={{ trackName: 'testName' } as any} />);
    expect(wrapper.find(DataTrackInfo).exists()).toBeFalsy();
  });
});
