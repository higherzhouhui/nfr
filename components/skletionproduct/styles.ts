import styled from 'styled-components';

export const SkeletonProductComp = styled.div`
  background: #ffffff;
  border-radius: 8px 8px;
  box-sizing: border-box;
  cursor: pointer;
  &:hover {
    box-shadow: rgb(147 170 192 / 25%) 0px 12px 32px 1px;
    transform: scale(1.002);
  }
  @media (min-width: 1930px) {
    width: 252px;
  }
  .img-studio {
    &:hover .mask {
      visibility: visible;
    }
  }
  .img-box {
    width: 100%;
    position: relative;
    background-color: #f0f0f0;
    border-radius: 8px 8px 0 0;
    overflow: hidden;
    padding: 100% 0 0;
    img {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }
    span {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }
  }
  .title-box {
    font-size: 20px;
    font-family: Barlow-Medium, Barlow;
    font-weight: 500;
    color: #222233;
    line-height: 30px;
    text-align: center;
    margin-top: 24px;
    margin-bottom: 8px;
    @media (max-width: 800px) {
      font-size: 16px;
      margin-top: 16px;
      margin-bottom: 0;
    }
    .title-skeleton {
      width: 100%;
      height: 30px;
    }
  }
`;
