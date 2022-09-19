import styled from 'styled-components';

export const HomePageContainer = styled.div`
  background: #fff;
  .content-container {
    width: 1300px;
    box-sizing: border-box;
    @media (max-width: 1400px) {
      width: 1000px;
    }
    @media (max-width: 1000px) {
      flex-direction: column;
      width: 100%;
      box-sizing: border-box;
      padding: 120px 20px 20px;
    }
  }
  .secondContent {
    margin: auto;
    padding-bottom: 64px;
    padding-top: 0;
  }
  .title {
    width: 100%;
    text-align: center;
    font-size: 32px;
    line-height: 48px;
    color: #1f263b;
    font-family: Barlow-Bold, Barlow;
    margin: 40px 0;
  }
  .resources {
    background: #fafafa;
    padding: 40px 40px 60px 40px;
    .tworesource {
      display: flex;
      justify-content: center;
      @media (max-width: 700px) {
        flex-direction: column;
        align-items: center;
      }
    }
    .jiange {
      width: 24px;
      @media (max-width: 700px) {
        display: none;
      }
    }
  }
`;

export const HomeContainer = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f7fa;
  .home-content-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .home-left-box {
      width: 690px;
      @media (max-width: 1000px) {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        margin-bottom: 50px;
      }
      h1 {
        font-size: 48px;
        font-family: Barlow-Bold, Barlow;
        font-weight: bold;
        color: #1f263b;
        line-height: 72px;
        /* text-transform: uppercase; */
        @media (max-width: 1400px) {
          font-size: 40px;
          line-height: 60px;
        }
        @media (max-width: 1000px) {
          font-size: 30px;
          line-height: 50px;
        }
        &.strong {
          margin-bottom: 24px;
          background: linear-gradient(180deg, #2590ff 0%, #35ceff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      }
      p {
        font-size: 20px;
        font-family: Barlow-Medium, Barlow;
        font-weight: 500;
        color: #1f263b;
        line-height: 30px;
        @media (max-width: 1400px) {
          font-size: 16px;
          line-height: 25px;
        }
        span {
          color: #2590ff;
          cursor: pointer;
        }
      }
      .btn-box {
        margin-top: 64px;
      }
    }
    .home-right-box {
      width: 550px;
      height: 550px;
      @media (max-width: 1000px) {
        width: 100%;
        height: auto;
      }
      video {
        width: 100%;
        height: 100%;
      }
    }
  }
`;

export const FoundMember = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 55%;
  svg {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
`;

export const InvestorWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 50%;
  .img {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
  svg {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
`;

export const ResourceMember = styled.a`
  width: 440px;
  height: 72px;
  padding: 0 32px;
  background: #fafafa;
  box-shadow: 0px 2px 16px rgba(0, 0, 0, 0.06);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 250px;
  margin-bottom: 18px;
  :hover {
    box-shadow: 0px 2px 24px rgba(0, 0, 0, 0.1);
  }
  @media (max-width: 700px) {
    width: 250px;
  }
  .name {
    font-family: 'Barlow-Medium';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    color: #1f263b;
    .coming {
      margin-left: 20px;
      font-size: 12px;
      opacity: 0.8;
    }
  }
  .svglogoname {
    display: flex;
    align-items: center;
  }
  .logosvg {
    margin-right: 30px;
  }
`;
