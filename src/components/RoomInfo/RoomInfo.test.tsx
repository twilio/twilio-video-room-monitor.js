import React from 'react';
import { render } from '@testing-library/react';
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

const mockUseRoomState = useRoomState as jest.Mock<any>;
mockUseRoomState.mockImplementation(() => 'connected');

describe('The RoomInfo component', () => {
  it('should render information about the room if connected to a Twilio Video room', () => {
    const { container } = render(<RoomInfo />);
    expect(container).toMatchSnapshot();
  });

  it('should display warning when not connected to a Twilio Video room', () => {
    mockUseRoomState.mockImplementationOnce(() => 'disconnected');
    const { getByText } = render(<RoomInfo />);
    expect(getByText('Not connected to a Twilio Video room.')).toBeTruthy();
  });
});
