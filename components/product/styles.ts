import styled, {css} from 'styled-components';

interface ProductInterface {
  isSelect?: boolean;
  checked?: boolean;
}

const getProductCss = ({isSelect, checked}: ProductInterface) => {
  if (isSelect) {
    return css`
      transform: scale(1);
      &:hover {
        border: 2px solid #2590ff;
        box-sizing: border-box;
      }
    `;
  }
  return css`
    &:hover {
      box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.06);
      transform: scale(1.002);
    }
  `;
};

export const ProductWrapper = styled.div<ProductInterface>`
  background: #ffffff;
  border-radius: 8px;
  box-sizing: border-box;
  cursor: pointer;
  position: relative;
  border: ${({checked}) => (checked ? '2px solid #2590ff' : '0')};
  ${getProductCss}
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
    .img-content-box {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      .por-top-box {
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        height: 0;
        padding-bottom: 16%;
        svg {
          width: 100%;
          height: 100%;
          position: absolute;
        }
      }
    }
    .plusWrapper {
      position: absolute;
      width: 100%;
      height: 100%;
      background: #fff;
      z-index: 99;
      top: 0;
      left: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      p {
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        color: #1f263b;
        margin-top: 8px;
      }
    }
    .mask {
      position: absolute;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9;
      top: 0;
      left: 0;
      visibility: hidden;
    }
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
  .des-box {
    h3 {
      font-size: 16px;
      font-family: Barlow-Medium, Barlow;
      font-weight: 500;
      color: #1f263b;
      line-height: 24px;
    }
    .des-operator-box {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      overflow: hidden;
      p {
        width: 140px;
        font-size: 12px;
        font-family: Barlow-Medium, Barlow;
        font-weight: 500;
        color: #1f263b;
        line-height: 18px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        @media (max-width: 700px) {
          width: 100px;
        }
        @media (max-width: 370px) {
          width: 200px;
        }
      }
      input {
        border-radius: 20px;
      }
    }
    .campaign {
      padding: 12px 16px;

      h2 {
        color: #1f263b;
        font-family: Barlow-Medium, Barlow;
        font-weight: 600;
        font-size: 1.1rem;
        line-height: 30px;
        margin-bottom: 8px;
        margin: 0;
      }
      h4 {
        font-size: 12px;
        line-height: 18px;
        font-weight: 500;
        color: rgba(34, 34, 51, 0.3);
      }
    }
    .nfr {
      padding: 12px 16px;

      h4 {
        color: rgba(34, 34, 51, 0.8);
        font-size: 12px;
        line-height: 18px;
        font-weight: 500;
        margin-bottom: 4px;
      }
      .price {
        font-family: Barlow-Medium, Barlow;
        color: #2590ff;
        font-weight: 600;
        font-size: 20px;
        line-height: 30px;
      }
    }
    .select {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 16px;
      h2 {
        color: #1f263b;
        font-family: Barlow-Medium, Barlow;
        font-weight: 600;
        font-size: 1.1rem;
        line-height: 30px;
        margin: 0;
        width: 70%;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-all;
      }
      .svgWrapper {
        width: 26px;
        height: 26px;
        border-radius: 50%;
        background: #2590ff;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    .addTocampaign {
      padding: 12px 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      h4 {
        color: rgba(34, 34, 51, 0.8);
        font-size: 12px;
        line-height: 18px;
        font-weight: 500;
        margin-bottom: 4px;
      }
      .price {
        font-family: Barlow-Medium, Barlow;
        color: #2590ff;
        font-weight: 600;
        font-size: 20px;
        line-height: 30px;
      }
      .svgWrapper {
        width: 26px;
        height: 26px;
        border-radius: 50%;
        background: #2590ff;
        display: flex;
        align-items: center;
        justify-content: center;
      }
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
  .watermark {
    position: absolute;
    top: -3px;
    left: 16px;
    width: calc(100% - 32px);
    height: 70px;
  }
`;
