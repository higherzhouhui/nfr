import styled from 'styled-components';

export const PromptComp = styled.div`
  position: relative;
  cursor: pointer;
  .textWrapper {
    position: absolute;
    height: 28px;
    transform: translate(-50%, -58px);
    left: 50%;
    display: none;
    cursor: text;
    width: max-content;
    padding: 0 8px;
    background: #0d0b21;
    box-sizing: border-box;
    border-radius: 4px;
  }
  &:hover .textWrapper {
    display: block;
  }
  .content {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0.9;
    box-sizing: border-box;
  }
  .text {
    height: 18px;
    font-size: 12px;
    font-family: 'Barlow-SemiBold';
    color: #ffffff;
    line-height: 18px;
  }
  .jiantou {
    position: absolute;
    left: 50%;
    top: 28px;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border: 6px solid transparent;
    border-top-color: #0d0b21;
  }
`;
