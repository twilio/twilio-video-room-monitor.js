import React from 'react';
import { shallow } from 'enzyme';
import RoomInfo from './RoomInfo';
import useRoomState from '../../hooks/useRoomState/useRoomState';

jest.mock('../../hooks/useDominantSpeaker/useDominantSpeaker', () => () => ({
  dominantSpeaker: { identity: 'testIdentity' },
}));
jest.mock('../../hooks/useIsRecording/useIsRecording', () => () => 'false');
jest.mock('../../hooks/useRoom/useRoom', () => () => ({
  name: 'test123',
  sid: 'XXXXXXXXXXXXX1234',
  mediaRegion: 'testRegion',
}));
jest.mock('../../hooks/useRoomState/useRoomState');
jest.mock('../../hooks/useStats/useStats', () => ({
  useStats: () => ({
    currentReceivedBitrate: 1234.56,
    currentSentBitrate: 6543.21,
  }),
}));

const mockUseRoomState = useRoomState as jest.Mock<any>;
mockUseRoomState.mockImplementation(() => 'connected');

describe('The RoomInfo component', () => {
  it('should render information about the room if connected to a Twilio Video room', () => {
    const wrapper = shallow(<RoomInfo />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should display warning when not connected to a Twilio Video room', () => {
    mockUseRoomState.mockImplementationOnce(() => 'disconnected');
    const wrapper = shallow(<RoomInfo />);
    expect(wrapper.contains(<span>Not connected to a Twilio Video room.</span>)).toBe(true);
  });
});
