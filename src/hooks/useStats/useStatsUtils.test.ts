import * as statsHooks from './useStatsUtils';
import useStats from './useStats';

jest.mock('./useStats');

const mockUseStats = useStats as jest.Mock<any>;

mockUseStats.mockImplementation(() => ({ stats: false, previousStats: false }));

describe('the getAllStats function', () => {
  it('should return an object with stats arrays from local and remote audio and video tracks', () => {
    const data = [
      {
        localAudioTrackStats: ['mockLocalAudioTrack1', 'mockLocalAudioTrack2'],
        localVideoTrackStats: ['mockLocalVideoTrack1', 'mockLocalVideoTrack2'],
        remoteAudioTrackStats: ['mockRemoteAudioTrack1', 'mockRemoteAudioTrack2'],
        remoteVideoTrackStats: ['mockLocalVideoTrack1', 'mockLocalVideoTrack2'],
      },
      {
        localAudioTrackStats: ['mockLocalAudioTrack3', 'mockLocalAudioTrack4'],
        localVideoTrackStats: ['mockLocalVideoTrack3', 'mockLocalVideoTrack4'],
        remoteAudioTrackStats: ['mockRemoteAudioTrack3', 'mockRemoteAudioTrack4'],
        remoteVideoTrackStats: ['mockLocalVideoTrack3', 'mockLocalVideoTrack4'],
      },
    ];
    const result = {
      localAudioTrackStats: [
        'mockLocalAudioTrack1',
        'mockLocalAudioTrack2',
        'mockLocalAudioTrack3',
        'mockLocalAudioTrack4',
      ],
      localVideoTrackStats: [
        'mockLocalVideoTrack1',
        'mockLocalVideoTrack2',
        'mockLocalVideoTrack3',
        'mockLocalVideoTrack4',
      ],
      peerConnectionId: '',
      remoteAudioTrackStats: [
        'mockRemoteAudioTrack1',
        'mockRemoteAudioTrack2',
        'mockRemoteAudioTrack3',
        'mockRemoteAudioTrack4',
      ],
      remoteVideoTrackStats: [
        'mockLocalVideoTrack1',
        'mockLocalVideoTrack2',
        'mockLocalVideoTrack3',
        'mockLocalVideoTrack4',
      ],
    };
    expect(statsHooks.getAllStats(data as any)).toEqual(result);
  });
});

describe('the getAllTracks function', () => {
  it('should return an array with stats from local and remote audio and video tracks', () => {
    const data = [
      {
        localAudioTrackStats: ['mockLocalAudioTrack1', 'mockLocalAudioTrack2'],
        localVideoTrackStats: ['mockLocalVideoTrack1', 'mockLocalVideoTrack2'],
        remoteAudioTrackStats: ['mockRemoteAudioTrack1', 'mockRemoteAudioTrack2'],
        remoteVideoTrackStats: ['mockLocalVideoTrack1', 'mockLocalVideoTrack2'],
      },
    ];
    const result = [
      'mockLocalAudioTrack1',
      'mockLocalAudioTrack2',
      'mockLocalVideoTrack1',
      'mockLocalVideoTrack2',
      'mockRemoteAudioTrack1',
      'mockRemoteAudioTrack2',
      'mockLocalVideoTrack1',
      'mockLocalVideoTrack2',
    ];
    expect(statsHooks.getAllTracks(data as any)).toEqual(result);
  });
});

describe('the getTrackData function', () => {
  it('should return an array with all tracks for a specific trackSid', () => {
    const data = [
      {
        localAudioTrackStats: [{ trackSid: 'mockTrackSid' }, { trackSid: 'mockTrackSid' }],
        localVideoTrackStats: ['mockLocalVideoTrack1', 'mockLocalVideoTrack2'],
        remoteAudioTrackStats: ['mockRemoteAudioTrack1', 'mockRemoteAudioTrack2'],
        remoteVideoTrackStats: ['mockLocalVideoTrack1', 'mockLocalVideoTrack2'],
      },
    ];
    expect(statsHooks.getTrackData('mockTrackSid', data as any)).toEqual([
      { trackSid: 'mockTrackSid' },
      { trackSid: 'mockTrackSid' },
    ]);
  });
});

describe('the useTrackBandwidth function', () => {
  it('should return null if there are no stats or previous stats', () => {
    expect(statsHooks.useTrackBandwidth('mockTrackSid')).toEqual(null);
  });

  it('should return null if there are no tracks for a specific trackSid', () => {
    mockUseStats.mockImplementationOnce(() => ({
      stats: [
        {
          localAudioTrackStats: ['mockLocalAudioTrack1', 'mockLocalAudioTrack2'],
          localVideoTrackStats: ['mockLocalVideoTrack1', 'mockLocalVideoTrack2'],
          remoteAudioTrackStats: ['mockRemoteAudioTrack1', 'mockRemoteAudioTrack2'],
          remoteVideoTrackStats: ['mockLocalVideoTrack1', 'mockLocalVideoTrack2'],
        },
      ],
      previousStats: [
        {
          localAudioTrackStats: ['mockLocalAudioTrack1', 'mockLocalAudioTrack2'],
          localVideoTrackStats: ['mockLocalVideoTrack1', 'mockLocalVideoTrack2'],
          remoteAudioTrackStats: ['mockRemoteAudioTrack1', 'mockRemoteAudioTrack2'],
          remoteVideoTrackStats: ['mockLocalVideoTrack1', 'mockLocalVideoTrack2'],
        },
      ],
    }));
    expect(statsHooks.useTrackBandwidth('mockTrackSid')).toEqual(null);
  });

  it('should return the bandwidth for a specific track', () => {
    mockUseStats.mockImplementationOnce(() => ({
      stats: [
        {
          localAudioTrackStats: ['mockLocalAudioTrack1', 'mockLocalAudioTrack2'],
          localVideoTrackStats: [
            { trackSid: 'mockTrackSid', bytesSent: 10093654, timestamp: 1621447129665 },
            'mockLocalVideoTrack2',
          ],
          remoteAudioTrackStats: ['mockRemoteAudioTrack1', 'mockRemoteAudioTrack2'],
          remoteVideoTrackStats: ['mockLocalVideoTrack1', 'mockLocalVideoTrack2'],
        },
      ],
      previousStats: [
        {
          localAudioTrackStats: ['mockLocalAudioTrack1', 'mockLocalAudioTrack2'],
          localVideoTrackStats: [
            { trackSid: 'mockTrackSid', bytesSent: 9534648, timestamp: 1621447094450 },
            'mockLocalVideoTrack2',
          ],
          remoteAudioTrackStats: ['mockRemoteAudioTrack1', 'mockRemoteAudioTrack2'],
          remoteVideoTrackStats: ['mockLocalVideoTrack1', 'mockLocalVideoTrack2'],
        },
      ],
    }));
    expect(statsHooks.useTrackBandwidth('mockTrackSid')).toEqual(15.9);
  });
});

describe('the useTrackData function', () => {
  it('should return null if there are no stats or previous stats', () => {
    expect(statsHooks.useTrackData('mockTrackSid')).toEqual(null);
  });

  it('should return the first track from an array containing tracks with a specific trackSid', () => {
    mockUseStats.mockImplementationOnce(() => ({
      stats: [
        {
          localAudioTrackStats: [
            { trackSid: 'mockTrackSid', name: 'mockTrack1' },
            { trackSid: 'mockTrackSid', name: 'mockTrack2' },
          ],
          localVideoTrackStats: ['mockLocalVideoTrack1', 'mockLocalVideoTrack2'],
          remoteAudioTrackStats: ['mockRemoteAudioTrack1', 'mockRemoteAudioTrack2'],
          remoteVideoTrackStats: ['mockLocalVideoTrack1', 'mockLocalVideoTrack2'],
        },
      ],
      previousStats: [
        {
          localAudioTrackStats: [{ trackSid: 'mockTrackSid' }, { trackSid: 'mockTrackSid' }],
          localVideoTrackStats: ['mockLocalVideoTrack1', 'mockLocalVideoTrack2'],
          remoteAudioTrackStats: ['mockRemoteAudioTrack1', 'mockRemoteAudioTrack2'],
          remoteVideoTrackStats: ['mockLocalVideoTrack1', 'mockLocalVideoTrack2'],
        },
      ],
    }));
    expect(statsHooks.useTrackData('mockTrackSid')).toEqual({ trackSid: 'mockTrackSid', name: 'mockTrack1' });
  });
});
