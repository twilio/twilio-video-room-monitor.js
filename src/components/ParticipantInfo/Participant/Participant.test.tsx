import React from 'react';
import { shallow } from 'enzyme';
import { Participant } from './Participant';

jest.mock('../../../hooks/useParticipantIsReconnecting/useParticipantIsReconnecting', () => () => false);
jest.mock('../../../hooks/useParticipantNetworkQualityLevel/useParticipantNetworkQualityLevel', () => () => 4);
jest.mock('../../../hooks/usePublications/usePublications', () => () => [
  { trackName: 'camera-123456', kind: 'video', trackSid: 'testVideoSid' },
  { trackName: 'microphone-123456', kind: 'audio', trackSid: 'testAudioSid' },
]);

describe('the Participant component', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<Participant participant={{ identity: 'mockIdentity', sid: 'testSid' } as any} />);
    expect(wrapper).toMatchSnapshot();
  });
});
