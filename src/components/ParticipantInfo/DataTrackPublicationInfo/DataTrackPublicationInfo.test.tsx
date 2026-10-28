import { render, screen } from '@testing-library/react';
import { DataTrackPublicationInfo, DataTrackInfo } from './DataTrackPublicationInfo';
import useTrack from '../../../hooks/useTrack/useTrack';

jest.mock('../../../hooks/useIsTrackEnabled/useIsTrackEnabled', () => () => true);
jest.mock('../../../hooks/useIsTrackSwitchedOff/useIsTrackSwitchedOff', () => () => true);
jest.mock('../../../hooks/useTrack/useTrack');
jest.mock('../../typography/trackInformation/DataTrack/DataTrack', () => () => <div>data track</div>);

const mockUseTrack = useTrack as jest.Mock<any>;

mockUseTrack.mockImplementation(() => ({}));

describe('the DataTrackInfo component', () => {
  describe('for LocalDataTrack objects', () => {
    it('should only render the DataTrack component', () => {
      const { container } = render(<DataTrackInfo track={{} as any} />);
      expect(screen.getByText('data track')).toBeInTheDocument();
      expect(container).toHaveTextContent(/^data track$/);
    });
  });

  describe('for RemoteDataTrack objects', () => {
    it('should render the remote track properties and the DataTrack component', () => {
      render(<DataTrackInfo track={{ isEnabled: true, isSwitchedOff: false, priority: 'high' } as any} />);
      ['isEnabled: true', 'isSwitchedOff: true', 'Priority: high', 'data track'].forEach((text) =>
        expect(screen.getByText(text)).toBeInTheDocument()
      );
    });
  });
});

describe('the DataTrackPublicationInfo component', () => {
  it('should render correctly', () => {
    render(<DataTrackPublicationInfo publication={{ kind: 'data', trackName: 'testName' } as any} />);
    ['Kind: data', 'isSubscribed: true', 'data track'].forEach((text) =>
      expect(screen.getByText(text)).toBeInTheDocument()
    );
  });

  it('should not render the DataTrackInfo component if a data track is not present', () => {
    mockUseTrack.mockImplementationOnce(() => null);
    render(<DataTrackPublicationInfo publication={{ kind: 'data', trackName: 'testName' } as any} />);
    expect(screen.getByText('isSubscribed: false')).toBeInTheDocument();
    expect(screen.queryByText('data track')).not.toBeInTheDocument();
  });
});
