import { fireEvent, render, screen } from '@testing-library/react';
import NestedObject from './NestedObject';

const testObject = { outerObject: { innerObject: 'testVal' }, primitiveValue: 'foo' };

describe('the NestedObject component', () => {
  describe('when there is no object', () => {
    it('should display the label with an undefined value when the object is undefined', () => {
      render(<NestedObject label="mockTest" obj={undefined} />);
      expect(screen.getByText('mockTest: undefined')).toBeInTheDocument();
    });

    it('should display the label with a null value when the object is null', () => {
      render(<NestedObject label="mockTest" obj={null} />);
      expect(screen.getByText('mockTest: null')).toBeInTheDocument();
    });

    it('should display the label and value for a primitive value', () => {
      render(<NestedObject label="mockTest" obj={6} />);
      expect(screen.getByText('mockTest: 6')).toBeInTheDocument();
    });
  });

  describe('when there is an object', () => {
    it('should display the object in nested Accordions when there is a label', () => {
      render(<NestedObject label="mockTest" obj={testObject} />);
      expect(screen.queryByText('primitiveValue: foo')).not.toBeInTheDocument();

      fireEvent.click(screen.getByText('mockTest'));
      expect(screen.getByText('primitiveValue: foo')).toBeInTheDocument();
      expect(screen.queryByText('innerObject: testVal')).not.toBeInTheDocument();

      fireEvent.click(screen.getByText('outerObject'));
      expect(screen.getByText('innerObject: testVal')).toBeInTheDocument();
    });

    it('should display the object without an Accordion when there is no label', () => {
      render(<NestedObject obj={testObject} />);
      expect(screen.getByText('primitiveValue: foo')).toBeInTheDocument();
      expect(screen.getByText('outerObject')).toBeInTheDocument();
      expect(screen.queryByText('innerObject: testVal')).not.toBeInTheDocument();
    });
  });
});
