import { render, screen } from '@testing-library/react';
import DataTrack from './DataTrack';
import { LocalDataTrack, RemoteDataTrack } from 'twilio-video';

jest.mock('twilio-video', () => ({
  LocalDataTrack: class MockLocalDataTrack {
    kind = 'mockKindLocal';
    name = 'mockName';
    id = 'mockIdLocal';
    maxPacketLifeTime = 'mockMaxPacketLifeTime';
    maxRetransmits = 'mockMaxRetransmits';
    ordered = 'mockOrdered';
    reliable = 'mockReliable';
  },
  RemoteDataTrack: class MockRemoteDataTrack {
    kind = 'mockKindRemote';
    name = 'mockName';
    sid = 'mockSidRemote';
    maxPacketLifeTime = 'mockMaxPacketLifeTime';
    maxRetransmits = 'mockMaxRetransmits';
    ordered = 'mockOrdered';
    reliable = 'mockReliable';
    priority = 'mockPriority';
    isEnabled = 'mockIsEnabled';
    isSubscribed = 'mockIsSubscribed';
    isSwitchedOff = 'mockIsSwitchedOff';
  },
}));

describe('the DataTrack component', () => {
  it('should have the ID property display when there is a LocalDataTrack', () => {
    render(<DataTrack track={new LocalDataTrack()} />);
    expect(screen.getByText('ID: mockIdLocal')).toBeInTheDocument();
    expect(screen.queryByText(/^SID:/)).not.toBeInTheDocument();
  });
  it('should have the SID property display when there is a RemoteDataTrack', () => {
    render(<DataTrack track={new RemoteDataTrack()} />);
    expect(screen.getByText('SID: mockSidRemote')).toBeInTheDocument();
    expect(screen.queryByText(/^ID:/)).not.toBeInTheDocument();
  });
});
