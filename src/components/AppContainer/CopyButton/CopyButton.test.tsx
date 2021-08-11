import React from 'react';
import { shallow, mount } from 'enzyme';
import { CopyButton, Tooltip, CopyButtonContainer } from './CopyButton';
import useRoom from '../../../hooks/useRoom/useRoom';

Object.assign(navigator, { clipboard: { writeText: jest.fn().mockImplementation(() => Promise.resolve()) } });

jest.mock('../../../hooks/useRoom/useRoom');

const mockUseRoom = useRoom as jest.Mock<any>;

mockUseRoom.mockImplementation(() => ({
  name: 'test123',
  sid: 'XXXXXXXXXXXXX1234',
  mediaRegion: 'testRegion',
  localParticipant: {
    audioTracks: { kind: 'audio', processor: null },
    videoTracks: { kind: 'video', processor: { kind: 'processor' } },
    tracks: {
      audio: { kind: 'audio', processor: null },
      video: { kind: 'video', processor: { kind: 'processor' } },
    },
  },
  _options: {
    name: 'test',
  },
}));

describe('the CopyButton component', () => {
  it('should display different text when the button is clicked', () => {
    const wrapper = shallow(<CopyButton />);
    expect(wrapper.find(Tooltip).contains('Copy Room Information')).toBe(true);
    wrapper.find(CopyButtonContainer).simulate('click');
    expect(wrapper.find(Tooltip).contains('Room Information copied to clipboard')).toBe(true);
  });

  it('should change the processor values to booleans when the button is clicked', () => {
    const wrapper = shallow(<CopyButton />);
    // jest.spyOn()
    wrapper.find(CopyButtonContainer).simulate('click');
  });
});
