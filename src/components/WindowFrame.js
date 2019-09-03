import React, { Fragment } from 'react';
import styled from 'styled-components';

const pseudoStyles = `
  content: '';
  position: fixed;
  -webkit-transition: all 0.2s linear;
  transition: all 0.2s linear;
`;

const WindowFrameX = styled.span`
  &:before {
    top: 0;
    left: 0;
    width: 100%;
    height: 8px;
    z-index: 2;
    background-color: ${props =>
      props.background ? props.background : props.theme.colors.backgroundDark};
    ${pseudoStyles}
  }
  &:after {
    bottom: 0;
    left: 0;
    width: 100%;
    height: 8px;
    z-index: 2;
    background-color: ${props =>
      props.background ? props.background : props.theme.colors.backgroundDark};
    ${pseudoStyles}
  }
`;
const WindowFrameY = styled.span`
  &:before {
    top: 0;
    left: 0;
    height: 100%;
    width: 8px;
    z-index: 2;
    background-color: ${props =>
      props.background ? props.background : props.theme.colors.backgroundDark};
    ${pseudoStyles}
  }
  &:after {
    top: 0;
    right: 0;
    height: 100%;
    width: 8px;
    z-index: 2;
    background-color: ${props =>
      props.background ? props.background : props.theme.colors.backgroundDark};
    ${pseudoStyles}
  }
`;

const WindowFrame = props => (
  <Fragment>
    <WindowFrameX background={props.actionColor} />
    <WindowFrameY background={props.actionColor} />
  </Fragment>
);

export default WindowFrame;
