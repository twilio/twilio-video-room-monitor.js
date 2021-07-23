import React from 'react';
import DataTrack from './DataTrack';
import { shallow } from 'enzyme';
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
    const wrapper = shallow(<DataTrack track={new LocalDataTrack()} />);
    expect(wrapper.find({ label: 'ID', value: 'mockIdLocal' }).exists()).toBe(true);
  });
  it('should have the SID property display when there is a RemoteDataTrack', () => {
    const wrapper = shallow(<DataTrack track={new RemoteDataTrack()} />);
    expect(wrapper.find({ label: 'SID', value: 'mockSidRemote' }).exists()).toBe(true);
  });
});
