import { act, renderHook } from '@testing-library/react-hooks';
import useMediaStreamTrackProperties from './useMediaStreamTrackProperties';

describe('the useMediaStreamTrackProperties hook', () => {
  let mockTrack: any;
  const ended = new Event('ended');
  const mute = new Event('mute');
  const unmute = new Event('unmute');

  beforeEach(() => {
    mockTrack = new EventTarget();
    mockTrack.muted = 'mockMutedProp';
    mockTrack.readyState = 'mockReadyStateProp';
    mockTrack.id = 'mockIdProp';
    mockTrack.label = 'mockLabelProp';
    mockTrack.kind = 'mockKindProp';
  });

  it('should return the initial values of the track properties by default', () => {
    const { result } = renderHook(() => useMediaStreamTrackProperties(mockTrack));
    expect(result.current).toStrictEqual({
      id: 'mockIdProp',
      muted: 'mockMutedProp',
      kind: 'mockKindProp',
      label: 'mockLabelProp',
      readyState: 'mockReadyStateProp',
    });
  });

  describe('should respond to three events', () => {
    it('the "ended" event', async () => {
      const { result } = renderHook(() => useMediaStreamTrackProperties(mockTrack));
      act(() => {
        mockTrack.readyState = 'anotherMockReadyStateProp';
        mockTrack.dispatchEvent(ended);
      });
      expect(result.current).toStrictEqual({
        id: 'mockIdProp',
        muted: 'mockMutedProp',
        kind: 'mockKindProp',
        label: 'mockLabelProp',
        readyState: 'anotherMockReadyStateProp',
      });
    });

    it('the "mute" event', async () => {
      const { result } = renderHook(() => useMediaStreamTrackProperties(mockTrack));
      act(() => {
        mockTrack.muted = 'mockIsMutedProp';
        mockTrack.dispatchEvent(mute);
      });
      expect(result.current).toStrictEqual({
        id: 'mockIdProp',
        muted: 'mockIsMutedProp',
        kind: 'mockKindProp',
        label: 'mockLabelProp',
        readyState: 'mockReadyStateProp',
      });
    });

    it('the "unmute" event', async () => {
      const { result } = renderHook(() => useMediaStreamTrackProperties(mockTrack));
      act(() => {
        mockTrack.muted = 'mockIsNotMutedProp';
        mockTrack.dispatchEvent(unmute);
      });
      expect(result.current).toStrictEqual({
        id: 'mockIdProp',
        muted: 'mockIsNotMutedProp',
        kind: 'mockKindProp',
        label: 'mockLabelProp',
        readyState: 'mockReadyStateProp',
      });
    });
  });

  it('should clean up listeners on unmount', () => {
    const { unmount } = renderHook(() => useMediaStreamTrackProperties(mockTrack));
    const remover = jest.spyOn(mockTrack, 'removeEventListener');
    unmount();
    expect(remover).toHaveBeenCalledTimes(3);
    expect(remover).toHaveBeenNthCalledWith(1, 'mute', expect.any(Function));
    expect(remover).toHaveBeenNthCalledWith(2, 'unmute', expect.any(Function));
    expect(remover).toHaveBeenNthCalledWith(3, 'ended', expect.any(Function));
  });
});
