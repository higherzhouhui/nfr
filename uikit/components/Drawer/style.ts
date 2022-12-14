import styled, {css} from 'styled-components';

import {DrawerContainerProps, DrawerContentContainerProps} from './types';

import {handleToPx} from '@/utils';

const getPlacement = ({placement}: DrawerContentContainerProps) => {
  if (placement === 'left') {
    return css`
      left: 0;
      top: 0;
    `;
  }
  if (placement === 'right') {
    return css`
      right: 0;
      top: 0;
    `;
  }
};

export const DrawerContainer = styled.div<DrawerContainerProps>`
  width: ${({visible}) => (visible ? '100%' : '0')};
  top: 0;
  right: 0;
  height: 100vh;
  overflow: hidden;
  z-index: ${({zIndex}) => (zIndex ? zIndex : '10')};
  position: fixed;
  ${getPlacement};
`;

export const DrawerMaskContainer = styled.div<DrawerContainerProps>`
  width: ${({visible}) => (visible ? '100%' : '0')};
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(17, 17, 17, 0.5);
`;

export const DrawerContentContainer = styled.div<DrawerContentContainerProps>`
  width: ${({width, visible}) => (width && visible ? handleToPx(width) : '0')};
  opacity: ${({visible}) => (visible ? 1 : 0)};
  position: absolute;
  height: 100%;
  transition: all 0.3s;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  ${getPlacement};
  overflow: hidden;
`;
