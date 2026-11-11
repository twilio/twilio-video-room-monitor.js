import { fireEvent, render, screen } from '@testing-library/react';
import { Participant } from './Participant';

jest.mock('../../../hooks/useParticipantIsReconnecting/useParticipantIsReconnecting', () => () => false);
jest.mock('../../../hooks/useParticipantNetworkQualityLevel/useParticipantNetworkQualityLevel', () => () => 4);
jest.mock('../../../hooks/usePublications/usePublications', () => () => [
  { trackName: 'camera-123456', kind: 'video', trackSid: 'testVideoSid' },
  { trackName: 'microphone-123456', kind: 'audio', trackSid: 'testAudioSid' },
]);
jest.mock('../VideoTrackPublicationInfo/VideoTrackPublicationInfo', () => ({
  VideoTrackPublicationInfo: ({ publication }: any) => <div>video publication {publication.trackSid}</div>,
}));
jest.mock('../AudioTrackPublicationInfo/AudioTrackPublicationInfo', () => ({
  AudioTrackPublicationInfo: ({ publication }: any) => <div>audio publication {publication.trackSid}</div>,
}));
jest.mock('../DataTrackPublicationInfo/DataTrackPublicationInfo', () => ({
  DataTrackPublicationInfo: ({ publication }: any) => <div>data publication {publication.trackSid}</div>,
}));

describe('the Participant component', () => {
  it('should render the participant information and its publications grouped by kind', () => {
    render(<Participant participant={{ identity: 'mockIdentity', sid: 'testSid' } as any} />);

    fireEvent.click(screen.getByText('mockIdentity'));
    expect(screen.getByText('SID: testSid')).toBeInTheDocument();
    expect(screen.getByText('isReconnecting: false')).toBeInTheDocument();
    expect(screen.getByText('networkQualityLevel: 4')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Data Tracks (0)'));
    expect(screen.queryByText(/data publication/)).not.toBeInTheDocument();

    fireEvent.click(screen.getByText('Audio Tracks (1)'));
    expect(screen.getByText('audio publication testAudioSid')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Video Tracks (1)'));
    expect(screen.getByText('video publication testVideoSid')).toBeInTheDocument();
  });
});
