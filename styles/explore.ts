import styled, {css} from 'styled-components';

interface BrowseContentInterface {
  module?: 'NFRS' | 'EXPLORE' | 'MY_ANFTS';
}
const getBrowseContentCSS = ({module}: BrowseContentInterface) => {
  if (module === 'NFRS') {
    return css`
      padding-top: 152px;
      padding-bottom: 80px;
      @media (max-width: 500px) {
        padding-top: 120px;
        padding-bottom: 60px;
      }
    `;
  }
  return css`
    padding-top: 80px;
    padding-bottom: 80px;
    @media (max-width: 500px) {
      padding-top: 60px;
      padding-bottom: 60px;
    }
  `;
};
export const BrowseContainer = styled.div<BrowseContentInterface>`
  width: 100%;
  box-sizing: border-box;
  ${getBrowseContentCSS}
`;

export const BrowseOverflowContentContainer = styled.div`
  width: 1320px;
  display: flex;
  margin: 0 auto;
  @media (max-width: 1320px) {
    width: 1000px;
  }
  @media (max-width: 1000px) {
    width: 700px;
  }
  @media (max-width: 800px) {
    padding: 24px 0;
    max-width: 90%;
    box-sizing: border-box;
  }
`;

export const BrowseDrawerContainer = styled.div`
  position: sticky;
  top: 150px;
  height: max-content;
  @media (max-height: 800px) {
    height: auto;
  }
  .option-box {
    h2 {
      font-size: 20px;
      font-family: Barlow-SemiBold, Barlow;
      font-weight: 600;
      color: #222233;
      text-transform: uppercase;
    }
    /* .option-list-box {
      margin-bottom: 24px;
      margin-top: 8px;
      .option-item-box {
        width: 270px;
        height: 48px;
        border-radius: 8px;
        opacity: 1;
        border: 1px solid #9999a2;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        margin-top: 8px;
        box-sizing: border-box;
        padding: 0 16px;
        input {
          border-radius: 20px;
          border-color: #9999a2;
        }
        span {
          font-size: 16px;
          font-family: Barlow-SemiBold, Barlow;
          font-weight: 400;
          color: #222233;
          margin-left: 8px;
        }
      }
    } */
  }
`;

export const StudioOperatorContainer = styled.div`
  width: 100%;
  height: 72px;
  background: #ffffff;
  position: fixed;
  right: 0;
  top: 80px;
  z-index: 2;
  @media (max-width: 500px) {
    top: 60px;
  }
  .studio-operator-content {
    width: 1320px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    margin: 0 auto;
    @media (max-width: 1320px) {
      width: 1000px;
    }
    @media (max-width: 1000px) {
      width: 800px;
    }
    @media (max-width: 800px) {
      width: 440px;
      justify-content: center;
    }
    @media (max-width: 500px) {
      width: 100%;
    }
    h4 {
      font-size: 16px;
      font-family: Barlow-Regular, Barlow;
      font-weight: 400;
      color: #1f263b;
      @media (max-width: 800px) {
        display: none;
      }
    }
    .btn-box {
      display: flex;
    }
  }
  @media (max-width: 1000px) {
    width: 100%;
    height: 60px;
  }
`;

export const BrowseContentContainer = styled.div`
  flex: 1;
  height: 100%;
  box-sizing: border-box;
  h2 {
    font-size: 26px;
    font-family: Barlow-SemiBold, Barlow;
    font-weight: 600;
    color: #222233;
    line-height: 38px;
    margin: 24px 0;
    @media (max-width: 800px) {
      font-size: 20px;
    }
  }
  .list-box {
    display: grid;
    grid-gap: 24px;
    grid-column: 4;
    grid-template-columns: 1fr 1fr 1fr;
    margin-top: 40px;
    @media (min-width: 1930px) {
      display: flex;
      flex-wrap: wrap;
    }
    @media (max-width: 1320px) {
      grid-template-columns: 1fr 1fr;
    }
    @media (max-width: 800px) {
      grid-template-columns: 1fr;
      grid-gap: 20px;
      margin-top: 20px;
    }
  }
  .nft-item-box {
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
  }
`;

export const ExploreTab = styled.div`
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  position: sticky;
  top: 80px;
  z-index: 9;
  border-bottom: 1px solid #d9d9d9;
  background: #f5f7fa;
  .tab {
    margin-right: 48px;
    font-family: Barlow-SemiBold, Barlow;
    font-weight: 600;
    font-size: 20px;
    line-height: 30px;
    color: #1f263b;
    opacity: 0.7;
    height: 100%;
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .active {
    opacity: 1;
    border-bottom: 1px solid #1f263b;
  }
`;
