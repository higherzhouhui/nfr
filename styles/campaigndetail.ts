import styled from 'styled-components';
export const CampaignDetailContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #f5f5f5;
  box-sizing: border-box;
  padding: 120px 190px 20px 190px;
  margin: 0 auto;
  @media (max-width: 1440px) {
    padding: 120px 100px 20px 100px;
  }
  .topContainer {
    display: flex;
  }
  aside {
    width: 40%;
    height: auto;
    margin-right: 24px;
    min-width: 250px;
    max-width: 450px;
    box-sizing: border-box;
    .imageWrapper {
      box-sizing: border-box;
      border-radius: 8px;
      position: relative;
      width: 100%;
      padding-bottom: 100%;
      overflow: hidden;
      .skeleton {
        position: absolute;
        width: 100%;
        height: 100%;
      }
      .watermark {
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        height: 0;
        padding-bottom: 16%;
        z-index: 9;
        svg {
          width: 100%;
          height: 100%;
          position: absolute;
        }
      }
    }
  }
  section {
    flex: 1;
    border-radius: 8px;
    border: 1px solid red;
    padding: 16px 48px 16px 24px;
    border: 1px solid rgba(233, 233, 233, 1);
    .loading {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    h1 {
      font-family: Barlow-Medium, Barlow;
      font-size: 30px;
      font-weight: 700;
      line-height: 45px;
      margin-bottom: 4px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    h3 {
      font-size: 16px;
      font-weight: 500;
      line-height: 24px;
      margin-bottom: 36px;
      word-break: break-all;
    }
    .live {
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 140px;
      height: 48px;
      background: rgba(37, 144, 255, 0.1);
      border: 1px solid #2590ff;
      border-radius: 8px;
      margin-bottom: 24px;
      span {
        font-size: 16px;
        letter-spacing: 0.02em;
        color: #2590ff;
        margin-left: 6px;
        font-family: Barlow-Medium, Barlow;
      }
    }
    .creator {
      color: #1f263b;
      font-weight: 500;
      font-family: Barlow-Medium, Barlow;
      font-size: 16px;
      line-height: 24px;
      display: flex;
      margin-bottom: 16px;
      a {
        font-size: 16px;
        margin-left: 8px;
        color: #2590ff;
      }
    }
    .dateWrapper {
      margin-bottom: 32px;
      .title {
        font-size: 16px;
        line-height: 24px;
        color: rgba(34, 34, 51, 1);
        opacity: 0.7;
        margin-bottom: 4px;
      }
      .date {
        font-family: Barlow-Medium, Barlow;
        color: #1f263b;
        font-size: 16px;
        line-height: 24px;
      }
    }
    .btns {
      display: flex;
    }
    .learnMore {
      a {
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 8px;
        overflow: hidden;
        background: rgba(37, 144, 255, 0.1);
        color: #2590ff;
        font-size: 14px;
        line-height: 20px;
        width: 200px;
        height: 40px;
        border: 1px solid #2590ff;
        margin-left: 24px;
      }
    }
    .price {
      margin-top: 12px;
      display: flex;
      align-items: center;
      height: 60px;
      span {
        font-size: 40px;
        font-family: Barlow-SemiBold, Barlow;
        font-weight: 600;
        color: #222233;
        margin-left: 8px;
        @media (max-width: 1000px) {
          font-size: 32px;
        }
        @media (max-height: 700px) {
          font-size: 32px;
        }
      }
      @media (max-width: 1000px) {
        margin-top: 8px;
        height: 48px;
      }
      @media (max-height: 700px) {
        margin-top: 8px;
        height: 48px;
      }
    }
    .attachWrapper {
      background: rgba(37, 144, 255, 0.1);
      color: #2590ff;
      font-size: 14px;
      line-height: 20px;
      width: 160px;
      height: 32px;
      border-radius: 8px;
      margin-top: 24px;
      a {
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      svg {
        margin-left: 8px;
      }
    }
    .svgWrapper {
      position: relative;
      width: 32px;
      height: 32px;
    }
  }
  .botContainer {
    width: 100%;
    height: auto;
    margin-top: 36px;
    border: 1px solid rgba(233, 233, 233, 1);
    padding-top: 8px;
    h2 {
      color: #1f263b;
      font-size: 16px;
      font-weight: 600;
      line-height: 24px;
      text-align: center;
      margin-bottom: 18px;
    }
    .swiperContainer {
      position: relative;
      padding: 0 24px;
      box-sizing: border-box;
      .prev-box {
        width: 40px;
        height: 40px;
        border-radius: 40px;
        position: absolute;
        left: -24px;
        top: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        user-select: none;
        overflow: hidden;
        &:hover {
          border: 2px solid #dfe4ea;
        }
      }
      .next-box {
        width: 40px;
        height: 40px;
        border-radius: 40px;
        position: absolute;
        right: -24px;
        top: 50%;
        transform: translate(50%, -50%);
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        user-select: none;
        overflow: hidden;
        &:hover {
          border: 2px solid #dfe4ea;
        }
      }
      .skeleton {
        position: relative;
        width: 100%;
        height: 200px;
        .child {
          position: absolute;
          width: 100%;
          padding-bottom: 100%;
        }
      }
    }
  }
`;
