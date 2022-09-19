import styled from 'styled-components';

import {handleToPx} from '@/utils';

export const BackGroundComp = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  position: relative;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  .leftTop {
    position: absolute;
    left: 0;
    top: 0;
    width: 409px;
    height: 450px;
    filter: blur(250px);
    display: inline-block;
    background: #2590ff;
    @media (max-width: 1000px) {
      width: 300px;
      height: 330px;
      filter: blur(200px);
    }
    @media (max-width: 500px) {
      width: 180px;
      height: 250px;
      filter: blur(120px);
    }
  }
  .rightBottom {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 409px;
    height: 380px;
    filter: blur(250px);
    display: inline-block;
    background: #2590ff;
    @media (max-width: 1000px) {
      width: 300px;
      height: 250px;
      filter: blur(200px);
    }
    @media (max-width: 500px) {
      width: 180px;
      height: 150px;
      filter: blur(120px);
    }
  }
`;
export const BubbleComp = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  .content {
    width: 100%;
    height: 100%;
    position: relative;
    div:first-child {
      @media (max-width: 1000px) {
        width: 120px;
        height: 120px;
      }
      @media (max-width: 500px) {
        width: 100px;
        height: 100px;
      }
    }
    div:nth-child(4) {
      @media (max-width: 1000px) {
        width: 60px;
        height: 60px;
      }
      @media (max-width: 500px) {
        width: 40px;
        height: 40px;
      }
    }
    div:nth-child(5) {
      @media (max-width: 1000px) {
        width: 100px;
        height: 100px;
      }
      @media (max-width: 500px) {
        width: 80px;
        height: 80px;
      }
    }
  }
`;

export interface BubleStyle {
  width: number | string;
  left?: number | string;
  top?: number | string;
  background: string;
  bottom?: number | string;
  right?: number | string;
}

export const Bubbles = styled.div<BubleStyle>`
  width: ${(props) => handleToPx(props.width)};
  height: ${(props) => handleToPx(props.width)};
  left: ${(props) => handleToPx(props.left)};
  top: ${(props) => handleToPx(props.top)};
  bottom: ${(props) => handleToPx(props.bottom)};
  right: ${(props) => handleToPx(props.right)};
  background: ${(props) => props.background};
  position: absolute;
  overflow: hidden;
  border-radius: 50%;
`;
