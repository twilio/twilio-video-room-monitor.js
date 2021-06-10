import { act, renderHook } from '@testing-library/react-hooks';
import EventEmitter from 'events';
import useRoom from '../useRoom/useRoom';
import useParticipants from './useParticipants';

jest.mock('../useRoom/useRoom');
const mockUseRoom = useRoom as jest.Mock<any>;

describe('the useParticipants hook', () => {
  let mockRoom: any;

  beforeEach(() => {
    mockRoom = new EventEmitter();
    mockUseRoom.mockImplementation(() => mockRoom);
  });

  it('should return mockRoom.participants by default', () => {
    mockRoom.participants = new Map([['mockSid', 'mockParticipant']]);
    const { result } = renderHook(useParticipants);
    expect(result.current).toEqual(['mockParticipant']);
  });

  it('should respond to "participantConnected" events', async () => {
    mockRoom.participants = new Map([['mockSid', 'mockParticipant']]);
    const { result } = renderHook(useParticipants);
    act(() => {
      mockRoom.emit('participantConnected', 'mockParticipant2');
    });
    expect(result.current).toEqual(['mockParticipant', 'mockParticipant2']);
  });

  it('should respond to "participantDisconnected" events', async () => {
    mockRoom.participants = new Map([['mockSid', 'mockParticipant']]);
    const { result } = renderHook(useParticipants);
    act(() => {
      mockRoom.emit('participantDisconnected', 'mockParticipant');
    });
    expect(result.current).toEqual([]);
  });

  it('should clean up listeners on unmount', () => {
    mockRoom.participants = new Map();
    const { unmount } = renderHook(useParticipants);
    expect(mockRoom.listenerCount('participantConnected')).toEqual(1);
    expect(mockRoom.listenerCount('participantDisconnected')).toEqual(1);
    unmount();
    expect(mockRoom.listenerCount('participantConnected')).toEqual(0);
    expect(mockRoom.listenerCount('participantDisconnected')).toEqual(0);
  });

  it('should not attach listeners when there is no room', () => {
    mockUseRoom.mockImplementationOnce(() => undefined);
    renderHook(useParticipants);
    expect(mockRoom.listenerCount('participantConnected')).toEqual(0);
    expect(mockRoom.listenerCount('participantDisconnected')).toEqual(0);
  });
});
