import styled from 'styled-components';

export const MenuDrawerWrapper = styled.div`
  width: 280px;
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
  margin-right: 40px;
  @media (max-width: 1000px) {
    width: 0;
    margin: 0;
  }
  .switch-box {
    display: none;
    position: fixed;
    left: 10px;
    top: 90px;
    width: 42px;
    height: 42px;
    border-radius: 42px;
    border: 1px solid #e9e9eb;
    justify-content: center;
    align-items: center;
    z-index: 2;
    background-color: white;
    svg {
      transform: rotate(90deg);
    }
    @media (max-width: 1000px) {
      display: flex;
    }
  }
  .option-box {
    @media (max-width: 1000px) {
      display: none;
    }
    h2 {
      font-size: 20px;
      font-family: Barlow-SemiBold, Barlow;
      font-weight: 600;
      color: #222233;
      text-transform: uppercase;
    }
    .option-list-box {
      margin-bottom: 24px;
      margin-top: 8px;
      .option-item-box {
        width: 270px;
        height: 48px;
        border-radius: 8px;
        opacity: 1;
        border: 1px solid #e9e9eb;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        margin-top: 8px;
        box-sizing: border-box;
        padding: 0 16px;
        input {
          border-radius: 20px;
          border-color: #e9e9eb;
        }
        span {
          font-size: 16px;
          font-family: Barlow-Regular, Barlow;
          font-weight: 400;
          color: #222233;
          margin-left: 8px;
        }
      }
    }
  }
`;

export const MenuDrawerContent = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  box-sizing: border-box;
  overflow-y: auto;
  .drawer-header-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 60px;
    box-sizing: border-box;
    padding: 0 20px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    left: 0;
    top: 0;
    background-color: white;
    z-index: 2;
    svg {
      cursor: pointer;
    }
  }
  .option-box {
    max-width: 340px;
    box-sizing: border-box;
    padding: 0 20px;
    h2 {
      font-size: 20px;
      font-family: Barlow-SemiBold, Barlow;
      font-weight: 600;
      color: #222233;
      text-transform: uppercase;
    }
    .option-list-box {
      margin-bottom: 24px;
      margin-top: 8px;
      .option-item-box {
        width: 100%;
        height: 48px;
        border-radius: 8px;
        opacity: 1;
        border: 1px solid #e9e9eb;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        margin-top: 8px;
        box-sizing: border-box;
        padding: 0 16px;
        input {
          border-radius: 20px;
          border-color: #e9e9eb;
        }
        span {
          font-size: 16px;
          font-family: Barlow-Regular, Barlow;
          font-weight: 400;
          color: #222233;
          margin-left: 8px;
        }
      }
    }
  }
`;
