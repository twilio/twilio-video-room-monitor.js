import React from 'react';
import AppContainer from './AppContainer';
import { shallow } from 'enzyme';
import { theme } from '../theme';
import useWindowDimensions from '../../hooks/useWindowDimensions/useWindowDimensions';

jest.mock('../../hooks/useWindowDimensions/useWindowDimensions');
const mockUseWindowDimensions = useWindowDimensions as jest.Mock<ReturnType<typeof useWindowDimensions>>;

describe('the AppContainer Component', () => {
  beforeEach(() => {
    mockUseWindowDimensions.mockImplementation(() => ({ width: 1000, height: 1000 }));
  });

  it('should not be scaled when the window width is larger than the app container width', () => {
    const wrapper = shallow(<AppContainer>{() => <p>mock child</p>}</AppContainer>);
    expect(wrapper.prop('style')).toEqual({});
  });

  it('should be scaled when the window width is larger than the app container width', () => {
    mockUseWindowDimensions.mockImplementationOnce(() => ({ width: theme.monitorWidth / 2, height: 500 }));
    const wrapper = shallow(<AppContainer>{() => <p>mock child</p>}</AppContainer>);
    expect(wrapper.prop('style')).toEqual({ height: '1000px', transform: 'scale(0.5)' });
  });
});
