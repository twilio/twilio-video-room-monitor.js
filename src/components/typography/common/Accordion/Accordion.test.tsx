import { fireEvent, render, screen } from '@testing-library/react';
import { Accordion } from './Accordion';

describe('the Accordion component', () => {
  describe('with children', () => {
    it('should have a clickable label', () => {
      render(
        <Accordion label="test">
          <span>test span</span>
        </Accordion>
      );

      expect(screen.getByText('test').parentElement).toHaveStyle({ cursor: 'pointer' });
    });

    it('should toggle the display of children when clicked', () => {
      render(
        <Accordion label="test">
          <span>test span</span>
        </Accordion>
      );

      expect(screen.queryByText('test span')).not.toBeInTheDocument();
      fireEvent.click(screen.getByText('test'));
      expect(screen.getByText('test span')).toBeInTheDocument();
      fireEvent.click(screen.getByText('test'));
      expect(screen.queryByText('test span')).not.toBeInTheDocument();
    });
  });

  describe('without children', () => {
    it('should not have a clickable label', () => {
      render(<Accordion label="test" />);
      expect(screen.getByText('test').parentElement).not.toHaveStyle({ cursor: 'pointer' });
    });
  });
});
