import { fireEvent, render, screen } from '@testing-library/react';
import ArrayData from './ArrayData';
import { Arr } from '../../../../types';

const testArr: Arr = ['value1', 'value2', { key: 'value3' }];

describe('the ArrayData component', () => {
  describe('when the array does not contain anything', () => {
    it('should display the label with an undefined value when the array is undefined', () => {
      render(<ArrayData label="mockTest" arr={undefined} />);
      expect(screen.getByText('mockTest: undefined')).toBeInTheDocument();
    });

    it('should display the label with a null value when the array is null', () => {
      render(<ArrayData label="mockTest" arr={null} />);
      expect(screen.getByText('mockTest: null')).toBeInTheDocument();
    });

    it('should display the label with the string undefined when the array has zero elements', () => {
      render(<ArrayData label="mockTest" arr={[]} />);
      expect(screen.getByText('mockTest: undefined')).toBeInTheDocument();
    });
  });

  it('should display each element of an array of objects or primitives in an Accordion', () => {
    render(<ArrayData label="mockTest" arr={testArr} />);
    expect(screen.queryByText('undefined: value1')).not.toBeInTheDocument();

    fireEvent.click(screen.getByText('mockTest'));
    expect(screen.getByText('undefined: value1')).toBeInTheDocument();
    expect(screen.getByText('undefined: value2')).toBeInTheDocument();
    expect(screen.getByText('key: value3')).toBeInTheDocument();
  });
});
