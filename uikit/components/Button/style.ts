import styled, {css} from 'styled-components';
import {
  height,
  width,
  color,
  fontSize,
  fontWeight,
  backgroundColor,
  border,
  borderRadius,
  backgroundImage,
  space,
} from 'styled-system';

import {BaseButtonProps, variants} from './types';

const getVariants = ({variant}: BaseButtonProps) => {
  if (variant === variants.Default) {
    return css`
      color: #2590ff;
      border: 1px solid #2590ff;
      &:hover {
        background: #2590ff;
        color: #ffffff;
        transition: all 0.5s;
      }
    `;
  }

  if (variant === variants.PRIMARY) {
    return css`
      background: #2590ff;
      border: 0;
      color: white;
      &:hover {
        background: #0666c9;
      }
    `;
  }

  if (variant === variants.TEXT) {
    return css`
      border: 0;
      color: #989898;
    `;
  }

  if (variant === variants.TERTIARY) {
    return css`
      border: 1px solid #53a9ff;
      color: #53a9ff;
      &:hover {
        box-shadow: 0 0 5px #53a9ff;
      }
    `;
  }
  if (variant === variants.DANGER) {
    return css`
      color: #fff;
      background: #ff4848;
      border: none;
      &:hover {
        background: red;
      }
    `;
  }
  if (variant === variants.SUBTLE) {
    return css`
      background: #2590ff;
      color: #ffffff;
      border: 1px solid #2590ff;
      &:hover {
        background: #077cf5;
        transition: all 0.5s;
      }
    `;
  }
  if (variant === variants.DELETE) {
    return css`
      &:hover {
        font-family: Poppins-Bold, Poppins;
        background: #ff6666;
        color: #fff;
      }
    `;
  }
};

export const ButtonContainer = styled.button<BaseButtonProps>`
  background-color: rgba(0, 0, 0, 0);
  border-radius: 8px;
  border: 1px solid #eef0f2;
  font-size: 14px;
  font-family: Barlow-Medium, Barlow;
  color: #ffffff;
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  ${getVariants}
  ${width};
  ${height};
  ${borderRadius};
  ${border};
  ${backgroundColor};
  ${backgroundImage};
  ${color};
  ${space};
  ${fontSize}
  ${fontWeight}
  .prev-icon {
    margin-right: 8px;
    display: flex;
    align-items: center;
  }
  .next-icon {
    margin-left: 8px;
    display: flex;
    align-items: center;
  }
  .button-loading {
    position: absolute;
    width: 100%;
    height: 100%;
    ${borderRadius};
    background: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    cursor: no-drop;
  }
  :disabled {
    background-color: rgba(232, 232, 234, 1) !important;
    color: #373131 !important;
    cursor: default;
    border: none;
  }
`;

export const IconButtonContainer = styled.button<BaseButtonProps>`
  background-color: rgba(0, 0, 0, 0);
  border-radius: 8px;
  border: 1px solid #eef0f2;
  font-size: 14px;
  font-family: Poppins-Medium, Poppins;
  color: #333333;
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  ${getVariants}
  ${width};
  ${height};
  ${borderRadius};
  ${border};
  ${backgroundColor};
  ${backgroundImage};
  ${color};
  ${space};
  ${fontSize}
  ${fontWeight}
`;
