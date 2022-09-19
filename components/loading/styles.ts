import styled from 'styled-components';

import {ILoadingProps} from './index';

export const LoadingWrapper = styled.div<ILoadingProps>`
  width: ${({size}) =>
    size === 'bigest'
      ? '80px'
      : size === 'large'
      ? '40px'
      : size === 'mini'
      ? '20px'
      : '30px'};
  height: ${({size}) =>
    size === 'bigest'
      ? '80px'
      : size === 'large'
      ? '40px'
      : size === 'mini'
      ? '20px'
      : '30px'};
  position: relative;
  border: 2px solid #b0a5a5;
  border-top-color: rgba(158, 158, 158, 0.2);
  border-right-color: rgba(158, 158, 158, 0.2);
  border-bottom-color: rgba(158, 158, 158, 0.2);
  border-radius: 100%;

  animation: circle infinite 0.8s linear;
  @keyframes circle {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const FullPageLoadingWrapper = styled.div<ILoadingProps>`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9;
`;
