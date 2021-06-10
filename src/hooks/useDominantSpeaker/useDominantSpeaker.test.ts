import { act, renderHook } from '@testing-library/react-hooks';
import EventEmitter from 'events';
import useRoom from '../useRoom/useRoom';
import useDominantSpeaker from './useDominantSpeaker';

jest.mock('../useRoom/useRoom');
const mockUseRoom = useRoom as jest.Mock<any>;

describe('the useDominantSpeaker hook', () => {
  let mockRoom: any;

  beforeEach(() => {
    mockRoom = new EventEmitter();
    mockUseRoom.mockImplementation(() => mockRoom);
  });

  it('should return mockRoom.dominantSpeaker by default', () => {
    mockRoom.dominantSpeaker = 'test-participant';
    const { result } = renderHook(useDominantSpeaker);
    expect(result.current).toBe('test-participant');
  });

  it('should respond to "dominantSpeakerChanged" events', async () => {
    mockRoom.dominantSpeaker = 'test-participant';
    const { result } = renderHook(useDominantSpeaker);
    act(() => {
      mockRoom.emit('dominantSpeakerChanged', 'test-participant2');
    });
    expect(result.current).toBe('test-participant2');
  });

  it('should clean up listeners on unmount', () => {
    const { unmount } = renderHook(useDominantSpeaker);
    expect(mockRoom.listenerCount('dominantSpeakerChanged')).toBe(1);
    unmount();
    expect(mockRoom.listenerCount('dominantSpeakerChanged')).toBe(0);
  });

  it('should not attach listeners when there is no room', () => {
    mockUseRoom.mockImplementationOnce(() => undefined);
    renderHook(useDominantSpeaker);
    expect(mockRoom.listenerCount('dominantSpeakerChanged')).toBe(0);
  });
});
