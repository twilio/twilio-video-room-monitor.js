import * as statsHooks from './useStatsUtils';
import useStats from './useStats';

jest.mock('./useStats');

const mockUseStats = useStats as jest.Mock<any>;

mockUseStats.mockImplementation(() => ({ stats: false, previousStats: false }));

describe('the round function', () => {
  it('should round a number to one decimal place', () => {
    expect(statsHooks.round(1.234)).toBe(1.2);
    expect(statsHooks.round(200)).toBe(200);
    expect(statsHooks.round(39.99)).toBe(40);
    expect(statsHooks.round(5001.04)).toBe(5001);
    expect(statsHooks.round(28751.45)).toBe(28751.5);
  });
});

describe('the getAllStats function', () => {
  it('should return a empty stats object when it receives an empty array', () => {
    const result = {
      localAudioTrackStats: [],
      localVideoTrackStats: [],
      peerConnectionId: '',
      remoteAudioTrackStats: [],
      remoteVideoTrackStats: [],
    };

    expect(statsHooks.getAllStats([])).toEqual(result);
  });

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
        localVideoTrackStats: [{ trackSid: 'mockTrackSid2' }, { trackSid: 'mockTrackSid2' }],
        remoteAudioTrackStats: [{ trackSid: 'mockTrackSid3' }, { trackSid: 'mockTrackSid3' }],
        remoteVideoTrackStats: [{ trackSid: 'mockTrackSid4' }, { trackSid: 'mockTrackSid4' }],
      },
    ];
    expect(statsHooks.getTrackData('mockTrackSid', data as any)).toEqual([
      { trackSid: 'mockTrackSid' },
      { trackSid: 'mockTrackSid' },
    ]);
  });
});

describe('the useTrackBandwidth function', () => {
  it('should return null if there are no previous stats', () => {
    mockUseStats.mockImplementationOnce(() => ({
      stats: [
        {
          localAudioTrackStats: [],
          localVideoTrackStats: [],
          remoteAudioTrackStats: [],
          remoteVideoTrackStats: [],
        },
      ],
      previousStats: false,
    }));
    expect(statsHooks.useTrackBandwidth('mockTrackSid')).toEqual(null);
  });

  it('should return null if there are no stats', () => {
    mockUseStats.mockImplementationOnce(() => ({
      stats: false,
      previousStats: [
        {
          localAudioTrackStats: [],
          localVideoTrackStats: [],
          remoteAudioTrackStats: [],
          remoteVideoTrackStats: [],
        },
      ],
    }));
    expect(statsHooks.useTrackBandwidth('mockTrackSid')).toEqual(null);
  });

  it('should return null if there are no tracks for a specific trackSid', () => {
    mockUseStats.mockImplementationOnce(() => ({
      stats: [
        {
          localAudioTrackStats: [{ trackSid: 'mockTrackSid2' }, { trackSid: 'mockTrackSid2' }],
          localVideoTrackStats: [],
          remoteAudioTrackStats: [],
          remoteVideoTrackStats: [],
        },
      ],
      previousStats: [
        {
          localAudioTrackStats: [],
          localVideoTrackStats: [],
          remoteAudioTrackStats: [],
          remoteVideoTrackStats: [],
        },
      ],
    }));
    expect(statsHooks.useTrackBandwidth('mockTrackSid')).toEqual(null);
  });

  it('should return the bandwidth for a specific track', () => {
    mockUseStats.mockImplementationOnce(() => ({
      stats: [
        {
          localAudioTrackStats: [],
          localVideoTrackStats: [{ trackSid: 'mockTrackSid', bytesSent: 10093654, timestamp: 1621447129665 }],
          remoteAudioTrackStats: [],
          remoteVideoTrackStats: [],
        },
      ],
      previousStats: [
        {
          localAudioTrackStats: [],
          localVideoTrackStats: [{ trackSid: 'mockTrackSid', bytesSent: 9534648, timestamp: 1621447094450 }],
          remoteAudioTrackStats: [],
          remoteVideoTrackStats: [],
        },
      ],
    }));
    expect(statsHooks.useTrackBandwidth('mockTrackSid')).toEqual(127.2);
  });
});

describe('the useTrackData function', () => {
  it('should return null if there are no stats or previous stats', () => {
    mockUseStats.mockImplementation(() => ({ stats: false, previousStats: false }));
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
          localVideoTrackStats: [],
          remoteAudioTrackStats: [],
          remoteVideoTrackStats: [],
        },
      ],
      previousStats: [
        {
          localAudioTrackStats: [],
          localVideoTrackStats: [],
          remoteAudioTrackStats: [],
          remoteVideoTrackStats: [],
        },
      ],
    }));
    expect(statsHooks.useTrackData('mockTrackSid')).toEqual({ trackSid: 'mockTrackSid', name: 'mockTrack1' });
  });
});

describe('the getTotalBandwidth function', () => {
  const stats = [
    {
      localAudioTrackStats: [{ bytesSent: 40000, timestamp: 2000, ssrc: 1 }],
      localVideoTrackStats: [{ bytesSent: 40000, timestamp: 2000, ssrc: 2 }],
      remoteAudioTrackStats: [{ bytesReceived: 20000, timestamp: 2000, ssrc: 3 }],
      remoteVideoTrackStats: [{ bytesReceived: 20000, timestamp: 2000, ssrc: 4 }],
    },
  ];

  const previousStats = [
    {
      localAudioTrackStats: [{ bytesSent: 1000, timestamp: 1000, ssrc: 1 }],
      localVideoTrackStats: [{ bytesSent: 1000, timestamp: 1000, ssrc: 2 }],
      remoteAudioTrackStats: [{ bytesReceived: 1000, timestamp: 1000, ssrc: 3 }],
      remoteVideoTrackStats: [{ bytesReceived: 1000, timestamp: 1000, ssrc: 4 }],
    },
  ];

  describe('when "kind" is "bytesReceived"', () => {
    it('should correctly return bandwidth', () => {
      expect(statsHooks.getTotalBandwidth('bytesReceived', stats as any, previousStats as any)).toEqual(304);
    });

    it('should correctly return bandwidth when bytesReceived is null', () => {
      const modifiedStats = [
        {
          localAudioTrackStats: [{ bytesSent: null, timestamp: 2000, ssrc: 1 }],
          localVideoTrackStats: [{ bytesSent: null, timestamp: 2000, ssrc: 2 }],
          remoteAudioTrackStats: [{ bytesReceived: null, timestamp: 2000, ssrc: 3 }],
          remoteVideoTrackStats: [{ bytesReceived: null, timestamp: 2000, ssrc: 4 }],
        },
      ];

      const modifiedPreviousStats = [
        {
          localAudioTrackStats: [{ bytesSent: null, timestamp: 1000, ssrc: 1 }],
          localVideoTrackStats: [{ bytesSent: null, timestamp: 1000, ssrc: 2 }],
          remoteAudioTrackStats: [{ bytesReceived: null, timestamp: 1000, ssrc: 3 }],
          remoteVideoTrackStats: [{ bytesReceived: null, timestamp: 1000, ssrc: 4 }],
        },
      ];

      expect(statsHooks.getTotalBandwidth('bytesReceived', modifiedStats as any, modifiedPreviousStats as any)).toEqual(
        0
      );
    });

    it("should correctly return bandwidth when previous track information doesn't exist", () => {
      const modifiedPreviousStats = [
        {
          localAudioTrackStats: [{ bytesSent: 1000, timestamp: 1000, ssrc: 5 }],
          localVideoTrackStats: [{ bytesSent: 1000, timestamp: 1000, ssrc: 6 }],
          remoteAudioTrackStats: [{ bytesReceived: 1000, timestamp: 1000, ssrc: 7 }],
          remoteVideoTrackStats: [{ bytesReceived: 1000, timestamp: 1000, ssrc: 8 }],
        },
      ];

      expect(statsHooks.getTotalBandwidth('bytesReceived', stats as any, modifiedPreviousStats as any)).toEqual(0);
    });

    it('should correctly return bandwidth when bytesReceived decreases over time', () => {
      const modifiedPreviousStats = [
        {
          localAudioTrackStats: [{ bytesSent: 1000, timestamp: 1000, ssrc: 1 }],
          localVideoTrackStats: [{ bytesSent: 1000, timestamp: 1000, ssrc: 2 }],
          remoteAudioTrackStats: [{ bytesReceived: 1000, timestamp: 1000, ssrc: 3 }],
          remoteVideoTrackStats: [{ bytesReceived: 21000, timestamp: 1000, ssrc: 4 }],
        },
      ];

      expect(statsHooks.getTotalBandwidth('bytesReceived', stats as any, modifiedPreviousStats as any)).toEqual(152);
    });
  });

  describe('when "kind" is "bytesSent"', () => {
    it('should correctly return bandwidth', () => {
      expect(statsHooks.getTotalBandwidth('bytesSent', stats as any, previousStats as any)).toEqual(624);
    });
  });

  it('should return null when "stats" is undefined', () => {
    expect(statsHooks.getTotalBandwidth('bytesSent', undefined, previousStats as any)).toEqual(null);
  });

  it('should return null when "stats" and "previousStats" are undefined', () => {
    expect(statsHooks.getTotalBandwidth('bytesSent', undefined, undefined)).toEqual(null);
  });
});
