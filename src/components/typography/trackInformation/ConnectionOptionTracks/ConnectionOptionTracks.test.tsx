import { fireEvent, render, screen } from '@testing-library/react';
import ConnectionOptionTracks from './ConnectionOptionTracks';
import { LocalVideoTrack, LocalAudioTrack, LocalDataTrack } from 'twilio-video';

class MockMediaStreamTrack {
  id = 'mockIdProp';
}

jest.mock('twilio-video', () => ({
  LocalVideoTrack: class MockLocalVideoTrack {
    kind = 'video';
    name = 'mockNameLocalVideo';
    id = 'mockIdLocalVideo';
    mediaStreamTrack = new MockMediaStreamTrack();
  },
  LocalAudioTrack: class MockLocalAudioTrack {
    kind = 'audio';
    name = 'mockNameLocalAudio';
    id = 'mockIdLocalAudio';
    mediaStreamTrack = new MockMediaStreamTrack();
  },
  LocalDataTrack: class MockLocalDataTrack {
    kind = 'data';
    id = 'mockIdLocal';
  },
}));

jest.mock('../MediaStreamTrackInfo/MediaStreamTrackInfo', () => ({ track }: any) => (
  <div>media stream track {track.id}</div>
));
jest.mock('../DataTrack/DataTrack', () => ({ track }: any) => <div>data track {track.id}</div>);

Object.defineProperty(window, 'MediaStreamTrack', {
  value: MockMediaStreamTrack,
});

const renderAndExpand = (tracks: any[]) => {
  render(<ConnectionOptionTracks tracks={tracks} />);
  fireEvent.click(screen.getByText('Tracks'));
};

describe('the ConnectionOptionTracks component', () => {
  describe('when there is no track', () => {
    it('should display the label with an undefined value when the tracks are undefined', () => {
      render(<ConnectionOptionTracks tracks={undefined as any} />);
      expect(screen.getByText('Tracks: undefined')).toBeInTheDocument();
    });

    it('should display the label with a null value when the tracks are null', () => {
      render(<ConnectionOptionTracks tracks={null} />);
      expect(screen.getByText('Tracks: null')).toBeInTheDocument();
    });
  });

  describe('when there are tracks in the array', () => {
    it('should display MediaStreamTrack information for MediaStreamTrack objects', () => {
      renderAndExpand([new MockMediaStreamTrack()]);
      expect(screen.getByText('media stream track mockIdProp')).toBeInTheDocument();
    });

    it('should display the properties of LocalAudioTrack objects', () => {
      // @ts-ignore
      renderAndExpand([new LocalAudioTrack()]);
      expect(screen.getByText('Kind: audio')).toBeInTheDocument();
      expect(screen.getByText('Name: mockNameLocalAudio')).toBeInTheDocument();
      expect(screen.getByText('ID: mockIdLocalAudio')).toBeInTheDocument();
      expect(screen.getByText('media stream track mockIdProp')).toBeInTheDocument();
    });

    it('should display the properties of LocalVideoTrack objects', () => {
      // @ts-ignore
      renderAndExpand([new LocalVideoTrack()]);
      expect(screen.getByText('Kind: video')).toBeInTheDocument();
      expect(screen.getByText('Name: mockNameLocalVideo')).toBeInTheDocument();
      expect(screen.getByText('ID: mockIdLocalVideo')).toBeInTheDocument();
      expect(screen.getByText('media stream track mockIdProp')).toBeInTheDocument();
    });

    it('should display DataTrack information for LocalDataTrack objects', () => {
      // @ts-ignore
      renderAndExpand([new LocalDataTrack()]);
      expect(screen.getByText('data track mockIdLocal')).toBeInTheDocument();
    });
  });
});
