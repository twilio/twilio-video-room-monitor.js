import { fireEvent, render, screen } from '@testing-library/react';
import AppContainer from './AppContainer';
import { theme } from '../theme';
import useWindowDimensions from '../../hooks/useWindowDimensions/useWindowDimensions';
import useRoom from '../../hooks/useRoom/useRoom';

jest.mock('../../hooks/useWindowDimensions/useWindowDimensions');
jest.mock('../../hooks/useRoom/useRoom');
const mockUseWindowDimensions = useWindowDimensions as jest.Mock<ReturnType<typeof useWindowDimensions>>;
const mockUseRoom = useRoom as jest.Mock;

describe('the AppContainer Component', () => {
  beforeEach(() => {
    mockUseWindowDimensions.mockImplementation(() => ({ width: 1000, height: 1000 }));
    mockUseRoom.mockImplementation(() => undefined);
  });

  it('should not be scaled when the window width is larger than the app container width', () => {
    const { container } = render(<AppContainer>{() => <p>mock child</p>}</AppContainer>);
    expect(container.firstChild).not.toHaveAttribute('style');
  });

  it('should be scaled when the window width is smaller than the app container width', () => {
    mockUseWindowDimensions.mockImplementation(() => ({ width: theme.monitorWidth / 2, height: 500 }));
    const { container } = render(<AppContainer>{() => <p>mock child</p>}</AppContainer>);
    expect(container.firstChild).toHaveStyle({ height: '1000px', transform: 'scale(0.5)' });
  });

  it('should display a message instead of the children when there is no room', () => {
    render(<AppContainer>{() => <p>mock child</p>}</AppContainer>);
    expect(screen.getByText('No Twilio Room detected.')).toBeInTheDocument();
    expect(screen.queryByText('mock child')).not.toBeInTheDocument();
  });

  it('should render the children for the active tab when there is a room', () => {
    mockUseRoom.mockImplementation(() => ({}));
    render(<AppContainer>{(activeTab) => <p>{`active tab: ${activeTab}`}</p>}</AppContainer>);
    expect(screen.getByText('active tab: info')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Stats'));
    expect(screen.getByText('active tab: stats')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Info'));
    expect(screen.getByText('active tab: info')).toBeInTheDocument();
  });
});
