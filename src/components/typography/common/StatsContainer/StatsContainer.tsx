import React from 'react';
import styled from 'styled-components';
import { theme } from '../../../theme';

export default React.memo(styled.div`
  &:not(:last-child) {
    border-bottom: 1px solid ${theme.borderColor};
    margin-bottom: 3px;
  }
  padding-bottom: 3px;

  &:hover {
    background: rgba(50, 50, 50, 0.9);
  }
`);
