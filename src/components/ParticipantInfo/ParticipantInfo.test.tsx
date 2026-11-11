import { render, screen } from '@testing-library/react';
import ParticipantInfo from './ParticipantInfo';
import useRoom from '../../hooks/useRoom/useRoom';
import useRoomState from '../../hooks/useRoomState/useRoomState';

jest.mock('../../hooks/useParticipants/useParticipants', () => () => [
  { sid: 'testSid1', identity: 'test user1' },
  { sid: 'testSid2', identity: 'test user2' },
]);
jest.mock('../../hooks/useRoomState/useRoomState');
jest.mock('../../hooks/useRoom/useRoom');
jest.mock('./Participant/Participant', () => ({
  Participant: ({ participant, isLocal }: any) => (
    <div>
      participant {participant.identity}
      {isLocal ? ' (local)' : ''}
    </div>
  ),
}));

const mockUseRoom = useRoom as jest.Mock<any>;
const mockUseRoomState = useRoomState as jest.Mock<any>;

describe('the ParticipantInfo component', () => {
  beforeEach(() => {
    mockUseRoom.mockImplementation(() => ({ localParticipant: { sid: 'localSid', identity: 'local user' } }));
    mockUseRoomState.mockImplementation(() => 'connected');
  });

  it('should render the local participant and each remote participant when a room exists', () => {
    render(<ParticipantInfo />);
    expect(screen.getByText('Participant Information (3):')).toBeInTheDocument();
    expect(screen.getByText('participant local user (local)')).toBeInTheDocument();
    expect(screen.getByText('participant test user1')).toBeInTheDocument();
    expect(screen.getByText('participant test user2')).toBeInTheDocument();
  });

  it('should not render anything when a room does not exist', () => {
    mockUseRoom.mockImplementation(() => null);
    const { container } = render(<ParticipantInfo />);
    expect(container).toBeEmptyDOMElement();
  });

  it('should not render anything when a room is disconnected', () => {
    mockUseRoomState.mockImplementation(() => 'disconnected');
    const { container } = render(<ParticipantInfo />);
    expect(container).toBeEmptyDOMElement();
  });
});
