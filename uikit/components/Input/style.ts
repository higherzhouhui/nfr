import styled, {css} from 'styled-components';
import {
  height,
  width,
  color,
  backgroundColor,
  border,
  borderRadius,
  backgroundImage,
  space,
  WidthProps,
} from 'styled-system';

import {BaseTextAreaProps, BaseInputProps} from './types';

import {handleToPx} from '@/utils';
const color_placeholder: string = '#999';
const color_active: string = 'white';
const color_text = '#1F263B;';
const disabled = 'rgba(232, 232, 234, 1)';
export const BasicStyle = css`
  color: ${color_text};
  box-sizing: border-box;
  &::-webkit-input-placeholder {
    font-size: 16px;
    color: #989898;
  }
  &:-moz-placeholder {
    font-size: 16px;
    color: #989898;
  }
  &::-moz-placeholder {
    font-size: 16px;
    color: #989898;
  }
  &:-ms-input-placeholder {
    font-size: 16px;
    color: #989898;
  }
  &:hover,
  &:focus {
    background: ${color_active};
    &::-webkit-input-placeholder {
      color: ${color_placeholder};
    }
    &:-moz-placeholder {
      color: ${color_placeholder};
    }
    &::-moz-placeholder {
      color: ${color_placeholder};
    }
    &:-ms-input-placeholder {
      color: ${color_placeholder};
    }
  }
  &:disabled {
    background: ${disabled};
  }
`;

const wrong = css`
  border: '2px solid red';
  color: red;
`;

export const InputOutContainer = styled.div`
  position: relative;
`;

export const LeftIcon = styled.div<WidthProps>`
  width: ${(props) => handleToPx(props.width) || '55px'};
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 12px;
  border: 1px solid #b7b7c1;
  background: #fff !important;
  box-sizing: border-box;
`;

export const RightIcon = styled.div`
  width: 28px;
  height: 100%;
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  align-items: center;
`;

export const InputContainer = styled.input<BaseInputProps>`
  padding-left: 12px;
  ${BasicStyle};
  background-color: ${(props) => (props.backgroundColor as any) || '#FFF'};
  width: ${(props) => handleToPx(props.width) || '100%'};
  height: ${(props) => handleToPx(props.height) || '40px'};
  max-width: ${(props) => handleToPx(props.maxWidth) || '100%'};
  min-width: ${(props) => handleToPx(props.minWidth) || '100%'};
  color: ${(props) => props.color || '#333333'};
  border: ${(props) => props.border || '1px solid #b7b7c1'};
  font-size: ${(props) => (props.fontSize as any) || '16px'};
  border-radius: ${(props) => handleToPx(props.borderRadius) || '4px'};
  ${(props) => props.wrong && wrong}
  outline: none;
  ${width};
  ${height};
  ${borderRadius};
  ${border};
  ${backgroundColor};
  ${backgroundImage};
  ${color};
  ${space};
  &:focus {
    box-shadow: 0 0 10px #e4e4e4;
  }
`;

export const TextAreaContainer = styled.textarea<BaseTextAreaProps>`
  padding: 8px 12px;
  ${BasicStyle};
  background-color: ${(props) => (props.backgroundColor as any) || '#FFF'};
  width: ${(props) => handleToPx(props.width) || '100%'};
  max-width: ${(props) => handleToPx(props.maxWidth) || '100%'};
  min-width: ${(props) => handleToPx(props.minWidth) || '100%'};
  color: ${(props) => props.color || '#333333'};
  border: ${(props) => props.border || '1px solid #b7b7c1'};
  font-size: ${(props) => (props.fontSize as any) || '16px'};
  border-radius: ${(props) => handleToPx(props.borderRadius) || '4px'};
  ${(props) => props.wrong && wrong}
  outline: none;
  ${width};
  ${height};
  ${borderRadius};
  ${border};
  ${backgroundColor};
  ${backgroundImage};
  ${color};
  ${space};
  &:focus {
    box-shadow: 0 0 10px #e4e4e4;
  }
`;
