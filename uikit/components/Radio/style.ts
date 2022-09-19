import styled from 'styled-components';
import {space} from 'styled-system';

import {RadioProps, RadioContainerProps, scales} from './types';

import {handleToPx} from '@/utils';

const getScale = ({scale}: RadioProps) => {
  switch (scale) {
    case scales.SM:
      return '16px';
    case scales.MD:
    default:
      return '32px';
  }
};

export const RadioContainer = styled.div<RadioContainerProps>`
  display: flex;
  align-items: center;
  margin-right: ${({mr}) => (mr ? handleToPx(mr) : 0)};
`;

export const RadioGroupContainer = styled.div<RadioContainerProps>`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-top: 18px;
`;

export const RadioText = styled.span`
  font-size: 16px;
  color: #222233;
  margin-left: 8px;
`;
export const RadioBox = styled.input.attrs({type: 'radio'})<RadioProps>`
  /* appearance: none;
  overflow: hidden;
  cursor: pointer;
  position: relative;
  display: inline-block;
  height: ${getScale};
  width: ${getScale};
  vertical-align: middle;
  transition: background-color 0.2s ease-in-out;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 50%; */
  /* background-color: ${({theme}) => theme.colors.input};
  box-shadow: ${({theme}) => theme.shadows.inset}; */

  /* &:after {
    content: '';
    position: absolute;
    border-bottom: 2px solid;
    border-left: 2px solid;
    border-color: transparent;
    top: 21%;
    left: 0;
    right: 0;
    width: 50%;
    height: 25%;
    margin: auto;
    transform: rotate(-50deg);
    transition: border-color 0.2s ease-in-out;
  } */

  &:hover:not(:disabled):not(:checked) {
    /* box-shadow: ${({theme}) => theme.shadows.focus}; */
  }

  &:focus {
    outline: none;
    /* box-shadow: ${({theme}) => theme.shadows.focus}; */
  }

  &:checked {
    /* background-color: ${({theme}) => theme.colors.success}; */
    background-color: #e82648;
    border-color: #e82648;
    &:after {
      border-color: white;
      /* background-color: #53A9FF; */
      /* background-color: ${({theme}) => theme.radio.handleBackground}; */
    }
  }

  &:disabled {
    cursor: default;
    opacity: 0.6;
  }
  ${space}
`;
