import styled from 'styled-components';

export const CollectionContainer = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 40px;
  .close {
    float: right;
    width: 22px;
    height: 22px;
    cursor: pointer;
  }
  h1 {
    height: 42px;
    font-size: 1.5rem;
    font-family: Poppins-Bold, Poppins;
    font-weight: bold;
    color: #ffffff;
    line-height: 42px;
    margin: 64px 0 24px 0;
    text-transform: uppercase;
  }
  .radio {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;
    width: 100%;
    .text {
      height: 30px;
      font-size: 1.1rem;
      font-family: Poppins-Regular, Poppins;
      font-weight: 400;
      color: #ffffff;
      line-height: 30px;
      opacity: 0.5;
    }
    .circle {
      width: 24px;
      height: 24px;
      opacity: 1;
      border: 1px solid rgba(255, 255, 255, 0.5);
      border-radius: 50%;
      overflow: hidden;
      cursor: pointer;
    }
    svg {
      cursor: pointer;
    }
  }
`;
