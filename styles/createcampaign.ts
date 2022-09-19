import styled from 'styled-components';

export const CampaignContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #f5f7fa;
  box-sizing: border-box;
  padding: 112px 80px 110px 80px;
  max-width: 1300px;
  margin: 0 auto;
  position: relative;
  h1 {
    font-family: 'Barlow-SemiBold';
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 36px;
    /* identical to box height, or 150% */
    text-align: center;
    /* 深色 */
    color: #1f263b;
  }
  .campaignTwoTitle {
    margin: 18px 0;
    padding: 18px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    top: 80px;
    background: #f5f7fa;
    z-index: 90;
    .title {
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
      color: #1f263b;
    }
    .operation {
      display: flex;
    }
  }
`;

export const CampaignContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  margin-top: 32px;
  background: #ffffff;
  border-radius: 18px;
  box-sizing: border-box;
  padding: 24px;
  aside {
    min-width: 300px;
    width: 45%;
    height: auto;
    position: relative;
    border-radius: 8px 0 0 8px;
    border: 2px solid rgba(232, 232, 234);
    box-sizing: border-box;
    padding: 24px;
    h2 {
      font-family: 'Barlow-SemiBold';
      font-weight: 600;
      font-size: 12px;
      line-height: 18px;
      color: #000000;
      margin-bottom: 8px;
    }
    .uploadContainer {
      width: 100%;
      padding-bottom: 100%;
      position: relative;
      border: 3px dotted #c9a0a0;
      border-radius: 8px;
      :hover {
        border: 3px dotted #4c3a3a;
      }
      .content {
        position: absolute;
        width: 100%;
        height: 100%;
        .sizeTip {
          position: absolute;
          bottom: 30px;
          color: #222233;
          font-size: 14px;
          line-height: 20px;
          font-family: 'Barlow-Medium';
          width: 100%;
          text-align: center;
        }
        .loading {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgb(223 232 241);
        }
      }
      .replaceImage {
        position: absolute;
        bottom: -30px;
        left: 0;
        font-family: 'Barlow-Medium';
        font-size: 14px;
        line-height: 20px;
        display: flex;
        align-items: center;
        span {
          margin-left: 5px;
        }
      }
      .error {
        position: absolute;
        bottom: -30px;
        left: 0;
        color: red;
        font-family: Barlow-Medium, Barlow;
        font-weight: 600;
      }
    }
  }
  section {
    flex: 1;
    border-radius: 0 8px 8px 0;
    border: 2px solid rgba(232, 232, 234);
    border-left: none;
    box-sizing: border-box;
    padding: 24px;
    position: relative;
    .campaignSubmit {
      position: absolute;
      display: flex;
      right: -24px;
      bottom: -110px;
      button {
        margin-left: 12px;
      }
    }
  }
`;

export const CampaignStepTwo = styled.div`
  width: 100%;
  height: auto;
`;
