import { fireEvent, render, screen } from '@testing-library/react';
import { CopyButton } from './CopyButton';
import useRoom from '../../../hooks/useRoom/useRoom';

Object.assign(navigator, { clipboard: { writeText: jest.fn().mockImplementation(() => Promise.resolve()) } });

const mockWriteText = navigator.clipboard.writeText as jest.Mock<any>;

jest.mock('../../../hooks/useRoom/useRoom');

const mockUseRoom = useRoom as jest.Mock<any>;

const mockRoom = {
  name: 'test123',
  sid: 'XXXXXXXXXXXXX1234',
  mediaRegion: 'testRegion',
  localParticipant: {
    audioTracks: { kind: 'audio', processor: null },
    videoTracks: { kind: 'video', processor: { kind: 'processor' } },
    tracks: {
      audio: { kind: 'audio', processor: null },
      video: { kind: 'video', processor: { kind: 'processor' } },
    },
  },
  _options: {
    name: 'test',
    tracks: {
      audio: { kind: 'audioOptions', processor: null },
      video: { kind: 'videoOptions', processor: { kind: 'Options' } },
    },
  },
};

describe('the CopyButton component', () => {
  beforeEach(() => {
    mockUseRoom.mockImplementation(() => mockRoom);
  });

  it('should display different text when the button is clicked', async () => {
    render(<CopyButton />);
    const tooltip = screen.getByText('Copy Room Information');

    fireEvent.click(tooltip.parentElement!);
    expect(await screen.findByText('Room information copied to clipboard')).toBeInTheDocument();

    fireEvent.mouseLeave(tooltip.parentElement!);
    expect(screen.getByText('Copy Room Information')).toBeInTheDocument();
  });

  it('should change the processor values to booleans for the room object when clicked', async () => {
    render(<CopyButton />);
    fireEvent.click(screen.getByText('Copy Room Information').parentElement!);
    await screen.findByText('Room information copied to clipboard');

    const expectedOptions = {
      name: 'test',
      tracks: {
        audio: { kind: 'audioOptions', processor: false },
        video: { kind: 'videoOptions', processor: true },
      },
    };
    expect(JSON.parse(mockWriteText.mock.calls[0][0])).toEqual({
      name: 'test123',
      sid: 'XXXXXXXXXXXXX1234',
      mediaRegion: 'testRegion',
      localParticipant: {
        audioTracks: { kind: 'audio', processor: false },
        videoTracks: { kind: 'video', processor: true },
        tracks: {
          audio: { kind: 'audio', processor: false },
          video: { kind: 'video', processor: true },
        },
      },
      _options: expectedOptions,
      connectionOptions: expectedOptions,
    });
  });

  it('should not copy anything when there is no room', () => {
    mockUseRoom.mockImplementation(() => undefined);
    render(<CopyButton />);
    fireEvent.click(screen.getByText('Copy Room Information').parentElement!);
    expect(mockWriteText).not.toHaveBeenCalled();
  });
});
