import { renderHook, act } from '@testing-library/react-hooks';
import usePublications from './usePublications';
import EventEmitter from 'events';
import { UPDATE_INTERVAL } from '../../constants';

jest.useFakeTimers();

describe('the usePublications hook', () => {
  let mockParticipant: any;

  beforeEach(() => {
    mockParticipant = new EventEmitter();
    mockParticipant.tracks = new Map([
      [0, { trackSid: 'track1' }],
      [1, { trackSid: 'track2' }],
    ]);
  });

  it('should return an array of mockParticipant.tracks by default', () => {
    const { result } = renderHook(() => usePublications(mockParticipant));
    expect(result.current).toEqual([{ trackSid: 'track1' }, { trackSid: 'track2' }]);
  });

  it('should respond to "trackPublished" events', async () => {
    const { result } = renderHook(() => usePublications(mockParticipant));
    act(() => {
      mockParticipant.emit('trackPublished', { trackSid: 'newMockTrack' });
    });
    expect(result.current).toEqual([{ trackSid: 'track1' }, { trackSid: 'track2' }, { trackSid: 'newMockTrack' }]);
  });

  it('should respond to "trackUnpublished" events', async () => {
    const { result } = renderHook(() => usePublications(mockParticipant));
    act(() => {
      mockParticipant.emit('trackUnpublished', mockParticipant.tracks.get(0));
    });
    expect(result.current).toEqual([{ trackSid: 'track2' }]);
  });

  it('should return a new set of tracks if the participant changes', () => {
    const { result, rerender } = renderHook(({ participant }) => usePublications(participant), {
      initialProps: { participant: mockParticipant },
    });
    expect(result.current).toEqual([{ trackSid: 'track1' }, { trackSid: 'track2' }]);
    mockParticipant = new EventEmitter();
    mockParticipant.tracks = new Map([
      [0, { trackSid: 'track3' }],
      [1, { trackSid: 'track4' }],
    ]);
    rerender({ participant: mockParticipant });
    expect(result.current).toEqual([{ trackSid: 'track3' }, { trackSid: 'track4' }]);
  });

  it('should clean up listeners on unmount', () => {
    const { unmount } = renderHook(() => usePublications(mockParticipant));
    unmount();
    expect(mockParticipant.listenerCount('trackPublished')).toBe(0);
    expect(mockParticipant.listenerCount('trackUnpublished')).toBe(0);
  });

  describe('when isLocal is true', () => {
    it('should periodically update the conversations array when it changes', async () => {
      const { result } = renderHook(() => usePublications(mockParticipant, true));
      expect(result.current).toEqual([{ trackSid: 'track1' }, { trackSid: 'track2' }]);
      mockParticipant.tracks.set(2, { trackSid: 'track3' });
      act(() => {
        jest.runTimersToTime(UPDATE_INTERVAL);
      });
      expect(result.current).toEqual([{ trackSid: 'track1' }, { trackSid: 'track2' }, { trackSid: 'track3' }]);
    });

    it('should not periodically update the conversations array when it changes, but trackSids stay the same', async () => {
      const { result } = renderHook(() => usePublications(mockParticipant, true));
      expect(result.current).toEqual([{ trackSid: 'track1' }, { trackSid: 'track2' }]);
      mockParticipant.tracks = new Map([
        [0, { trackSid: 'track2' }],
        [1, { trackSid: 'track1' }],
      ]);
      act(() => {
        jest.runTimersToTime(UPDATE_INTERVAL);
      });
      expect(result.current).toEqual([{ trackSid: 'track1' }, { trackSid: 'track2' }]);
    });

    it('should clear the setInterval ID when the participant changes', async () => {
      jest.spyOn(window, 'clearInterval');
      const { rerender } = renderHook(({ participant, isLocal }) => usePublications(participant, isLocal), {
        initialProps: { participant: mockParticipant, isLocal: true },
      });
      mockParticipant = new EventEmitter();
      mockParticipant.tracks = new Map();
      rerender({ participant: mockParticipant, isLocal: true });
      expect(window.clearInterval).toHaveBeenCalledWith(expect.any(Number));
    });
  });
});
