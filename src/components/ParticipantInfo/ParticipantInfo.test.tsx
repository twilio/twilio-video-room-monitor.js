import React from 'react';
import { shallow } from 'enzyme';
import ParticipantInfo from './ParticipantInfo';
import useRoom from '../../hooks/useRoom/useRoom';
import useRoomState from '../../hooks/useRoomState/useRoomState';

jest.mock('../../hooks/useParticipants/useParticipants', () => () => [
  {
    sid: 'testSid1',
    identity: 'test user1',
    isReconnecting: false,
    networkQualityLevel: 4,
  },
  {
    sid: 'testSid2',
    identity: 'test user2',
    isReconnecting: false,
    networkQualityLevel: 3,
  },
]);
jest.mock('../../hooks/useRoomState/useRoomState');
jest.mock('../../hooks/useRoom/useRoom');

const mockUseRoom = useRoom as jest.Mock<any>;
mockUseRoom.mockImplementation(() => ({ room: {} }));

const mockUseRoomState = useRoomState as jest.Mock<any>;
mockUseRoomState.mockImplementation(() => 'connected');

describe('the ParticipantInfo component', () => {
  it('should render correctly for each participant when a room exists', () => {
    const wrapper = shallow(<ParticipantInfo />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should not render anything when a room does not exist', () => {
    mockUseRoom.mockImplementationOnce(() => null);
    const wrapper = shallow(<ParticipantInfo />);
    expect(wrapper.getElement()).toBe(null);
  });

  it('should not render anything when a room is disconnected', () => {
    mockUseRoomState.mockImplementationOnce(() => 'disconnected');
    const wrapper = shallow(<ParticipantInfo />);
    expect(wrapper.getElement()).toBe(null);
  });
});
