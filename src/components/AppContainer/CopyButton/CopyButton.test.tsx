import React from 'react';
import { shallow } from 'enzyme';
import { CopyButton, Tooltip, CopyButtonContainer } from './CopyButton';
import useRoom from '../../../hooks/useRoom/useRoom';

Object.assign(navigator, { clipboard: { writeText: jest.fn().mockImplementation(() => Promise.resolve()) } });

const mockWriteText = navigator.clipboard.writeText as jest.Mock<any>;

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
  it('should display different text when the button is clicked', (done) => {
    const wrapper = shallow(<CopyButton />);

    expect(wrapper.find(Tooltip).text()).toBe('Copy Room Information');
    wrapper.find(CopyButtonContainer).simulate('click');

    setImmediate(() => {
      expect(wrapper.find(Tooltip).text()).toBe('Room information copied to clipboard');
      wrapper.find(CopyButtonContainer).simulate('mouseleave');
      expect(wrapper.find(Tooltip).contains('Copy Room Information')).toBe(true);
      done();
    });
  });

  it('should change the processor values to booleans when the button is clicked', () => {
    const wrapper = shallow(<CopyButton />);
    wrapper.find(CopyButtonContainer).simulate('click');
    expect(mockWriteText.mock.calls[0][0]).toMatchInlineSnapshot(`
      "{
        \\"name\\": \\"test123\\",
        \\"sid\\": \\"XXXXXXXXXXXXX1234\\",
        \\"mediaRegion\\": \\"testRegion\\",
        \\"localParticipant\\": {
          \\"audioTracks\\": {
            \\"kind\\": \\"audio\\",
            \\"processor\\": false
          },
          \\"videoTracks\\": {
            \\"kind\\": \\"video\\",
            \\"processor\\": true
          },
          \\"tracks\\": {
            \\"audio\\": {
              \\"kind\\": \\"audio\\",
              \\"processor\\": false
            },
            \\"video\\": {
              \\"kind\\": \\"video\\",
              \\"processor\\": true
            }
          }
        },
        \\"_options\\": {
          \\"name\\": \\"test\\"
        },
        \\"connectionOptions\\": {
          \\"name\\": \\"test\\"
        }
      }"
    `);
  });
});
