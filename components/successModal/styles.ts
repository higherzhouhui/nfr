import styled from 'styled-components';

export const SuccessContainer = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 16px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  flex-direction: column;
  background: #fff;
  position: relative;
  h1 {
    margin: 140px 0 4px 0;
    text-align: center;
    font-size: 24px;
    font-family: Barlow-SemiBold, Barlow;
    font-weight: 600;
    color: #1f263b;
    line-height: 36px;
  }
  h3 {
    text-align: center;
    font-family: Barlow-Medium, Barlow;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    color: rgba(34, 34, 51, 0.7);
    display: flex;
    letter-spacing: 0.02em;
    z-index: 100;
    a {
      margin-left: 4px;
      color: #2590ff;
      font-weight: 500;
      font-size: 16px;
      line-height: 24px;
      cursor: pointer;
    }
  }
  .svgWrapper {
    position: absolute;
    width: 120px;
    height: 120px;
    top: 0;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 99;
  }
  .svgbgWrapper {
    z-index: 88;
    position: absolute;
    width: 430px;
    height: 250px;
    top: 0;
    left: 50%;
    transform: translate(-50%, 0);
  }
  .description {
    width: 50%;
    font-size: 0.9rem;
    font-family: Poppins-Regular, Poppins;
    font-weight: 400;
    color: #ffffff;
    line-height: 1.5rem;
    opacity: 0.6;
    text-align: center;
    margin-bottom: 1.8rem;
  }
  .bg {
    width: 90%;
    height: 100%;
    position: relative;
    position: absolute;
    bottom: -20px;
    z-index: -10;
  }
`;
