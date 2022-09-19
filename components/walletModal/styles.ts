import styled from 'styled-components';

export const WalletContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 80px 40px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  height: 100%;
  h3 {
    font-size: 16px;
    font-family: Barlow-Medium, Barlow;
    font-weight: 500;
    line-height: 24px;
    text-align: center;
    color: #222233;
    margin-top: 16px;
  }
  .loading {
    position: absolute;
    width: 100%;
    height: 46px;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .flexWrapper {
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  .wallet-item-box {
    width: 100%;
    height: 48px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 0 12px;
    background: #fff;
    border-radius: 0px 0px 8px 8px;
    border: 1px solid #f5f7fa;
    cursor: pointer;
    &.active {
      border-radius: 8px 8px 0px 0px;
      position: relative;
      &:hover {
        background: rgba(37, 144, 255, 0.05);
        box-shadow: 0px 0px 4px 1px rgba(161, 161, 161, 0.25);
      }
    }
    svg {
      margin-right: 12px;
    }
    .left {
      font-size: 14px;
      font-family: Barlow-Medium, Barlow;
      font-weight: 500;
      color: #222233;
      display: flex;
      align-items: center;
    }
    .right {
      display: flex;
      align-items: center;
      span {
        font-size: 12px;
        font-weight: 500;
        color: #c2c2c2;
        margin-right: 8px;
      }
    }
  }
`;
