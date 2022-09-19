import styled from 'styled-components';

export const FooterContainer = styled.div`
  height: 84px;
  background: #fafafa;
  box-sizing: border-box;
  width: 100%;
  main {
    height: 100%;
    border-top: 1px solid #7b7b81;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 1280px;
    margin: 0 auto;
    box-sizing: border-box;
    @media (max-width: 1280px) {
      width: 1000px;
    }
    @media (max-width: 1000px) {
      width: 90%;
    }
    @media (max-width: 700px) {
      width: 100%;
      padding: 0 40px;
      flex-direction: column;
      justify-content: center;
    }
  }

  .left {
    display: flex;
    @media (max-width: 700px) {
      margin-bottom: 12px;
    }
    .href {
      font-size: 14px;
      font-family: Barlow-Medium, Barlow;
      font-weight: 500;
      color: #222233;
      margin-right: 24px;
      @media (max-width: 500px) {
        margin-right: 12px;
      }
      :last-child {
        margin-right: 0;
      }
      &:hover {
        font-weight: 600;
      }
    }
    @media (max-width: 500px) {
      font-size: 12px;
    }
  }
  .right {
    display: flex;
    align-items: center;
    font-size: 14px;
    font-family: Barlow-SemiBold, Barlow;
    font-weight: 600;
    color: #ffffff;
    svg {
      cursor: pointer;
    }
    span {
      margin: 0 16px;
    }
    a {
      font-size: 14px;
      font-family: Barlow-SemiBold, Barlow;
      font-weight: 600;
      color: #ffffff;
      display: flex;
      align-items: center;
      margin-left: 24px;

      @media (max-width: 500px) {
        font-size: 12px;
      }
      :first-child {
        margin-left: 0;
      }
    }
  }
`;
