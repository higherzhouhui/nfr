import styled from 'styled-components';
export const CreateNfrsContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 80px;
  position: relative;
  .step {
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    opacity: 0.7;
  }
`;

export const CreteNfrsStepContent = styled.div`
  position: relative;
  .title {
    position: sticky;
    top: 80px;
    background: #f5f7fa;
    z-index: 9;
    padding-top: 24px;
    h1 {
      font-weight: 600;
      font-size: 24px;
      line-height: 36px;
      color: #1f263b;
      font-family: 'Barlow-Bold';
    }
    h4 {
      margin-top: 4px;
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
      color: rgba(34, 34, 51, 0.7);
    }
    .division {
      margin-top: 22px;
      width: 100%;
      height: 2px;
      background: rgba(34, 34, 51, 0.2);
    }
    .step2Container {
      display: flex;
      align-items: center;
      position: absolute;
      top: 50%;
      right: 0;
      transform: translateY(-50%);
      button {
        margin-left: 24px;
      }
      .searchInput {
        width: 300px;
        position: relative;
        svg {
          position: absolute;
          top: 11px;
          left: 17px;
        }
      }
    }
  }
  main {
    display: flex;
    aside {
      border-right: 1px solid rgba(34, 34, 51, 0.2);
      min-height: 500px;
      height: calc(100vh - 270px);
      position: sticky;
      top: 190px;
    }
    section {
      flex: 1;
      padding: 32px 0 0 55px;
      h2 {
        margin-top: 8px;
        font-family: 'Barlow-Medium';
        font-style: normal;
        font-weight: 600;
        font-size: 24px;
        line-height: 36px;
        color: #1f263b;
        margin-bottom: 36px;
      }
    }
  }
`;

export const StepContainerComp = styled.div`
  width: 260px;
  position: relative;
  .rowContainer {
    width: 100%;
    position: absolute;
    z-index: 30;
    top: 33px;
    right: -5px;
    display: flex;
    align-items: center;
    height: 90px;
    justify-content: space-between;
    .wordDes {
      width: 180px;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .wtitle {
      font-style: normal;
      font-weight: 600;
      font-size: 18px;
      line-height: 26px;
      /* identical to box height, or 144% */
      font-family: 'Barlow-Medium';
      text-align: left;
      /* 深色 */
      color: #1f263b;
    }
    .des {
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
      /* identical to box height, or 143% */
      text-align: left;
      color: #1f263b;
      opacity: 0.7;
    }
    .activeSvg {
      opacity: 1 !important;
    }
    .svgWrapper {
      min-width: 48px;
      min-height: 48px;
      border-radius: 50%;
      background: #2590ff;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0.5;
      width: 48px;
      height: 48px;
    }
    .activeCircle {
      background: #2590ff !important;
    }
    .circle {
      border-radius: 50%;
      min-width: 8px;
      min-height: 8px;
      background: #f5f7fa;
      border: 1px solid rgba(34, 34, 51, 0.2);
      width: 8px;
      height: 8px;
    }
  }
  .step2 {
    top: 200px;
  }
  .step3 {
    top: 388px;
  }
`;

export const CollectionContainerComp = styled.div`
  width: 100%;
  height: auto;
  position: relative;
  border-radius: 8px;
  background: #fff;
  overflow: hidden;
  cursor: pointer;
  .logo {
    position: relative;
    width: 100%;
    padding-bottom: 60%;
    height: 0;
    top: 0;
    left: 0;
  }
  .headName {
    margin-top: -10px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .head {
      position: relative;
      width: 56px;
      height: 56px;
      border-radius: 4px;
      border: 2px solid #fff;
      box-sizing: border-box;
      box-shadow: 1px 2px 9px #766a6a;
      background: #fff;
    }
    .name {
      font-family: 'Barlow-Bold';
      margin: 16px 0;
      font-weight: 600;
      font-size: 16px;
      line-height: 24px;
      color: #1f263b;
    }
  }
  &:hover {
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.06);
  }
`;

export const FormItemContainer = styled.div`
  width: 100%;
  margin-bottom: 16px;
  @media (max-height: 700px) {
    margin-bottom: 12px;
  }
  .attach {
    background: #e0edfb;
    width: 200px;
    height: 36px;
    font-size: 14px;
    border-radius: 4px;
    position: relative;
    color: #2590ff;
  }
  .datePicker {
    width: 200px;
    border-radius: 4px;
    background: #e0edfb;
    color: #2590ff;
    height: 36px;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    text-align: center;
    border: none;
    &:focus-visible {
      border: none !important;
    }
  }
  p {
    font-family: Barlow-Medium, Barlow;
    color: #1f263b;
    font-weight: 600;
    font-size: 12px;
    line-height: 18px;
    display: flex;
    align-items: center;
    margin-bottom: 4px;
    i {
      color: #ff6666;
      font-weight: Bold;
      font-style: normal;
      margin-left: 4px;
      margin-bottom: -5px;
    }
    .des {
      margin-left: 4px;
      font-size: 12px;
      font-family: Barlow-Medium, Barlow;
      font-weight: 500;
      color: #222233;
      line-height: 18px;
      opacity: 0.7;
    }
  }
  .qmark {
    font-family: Barlow-Medium, Barlow;
    color: #1f263b;
    font-weight: 600;
    font-size: 12px;
    line-height: 18px;
    display: flex;
    align-items: center;
    margin-bottom: 4px;
    i {
      color: #ff6666;
      font-weight: Bold;
      font-style: normal;
      margin-left: 4px;
      margin-bottom: -5px;
    }
    .des {
      margin-left: 4px;
      font-size: 12px;
      font-family: Barlow-Medium, Barlow;
      font-weight: 500;
      color: #222233;
      line-height: 18px;
      opacity: 0.7;
    }
    > div {
      margin: 3px 0 0 5px;
    }
  }
  .title {
    font-size: 16px;
    font-family: Barlow-Bold, Barlow;
    color: #333333;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    i {
      color: #ff6666;
      font-weight: Bold;
      font-style: normal;
      margin-left: 4px;
      margin-bottom: -5px;
    }
  }
  .innerInputText {
    height: 24px;
    font-size: 16px;
    font-family: Barlow-Medium, Barlow;
    color: #989898;
    line-height: 24px;
  }
  .validating {
    font-size: 12px;
    color: #e87706;
    margin-top: 5px;
  }
  .error {
    font-size: 12px;
    color: red;
    margin-top: 5px;
  }
  input {
    border: 1px solid #b7b7c1;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none !important;
  }
  input[type='number'] {
    -moz-appearance: textfield;
  }
  input[type='radio']:checked {
    background-color: #2590ff;
    border: 1px solid #2590ff;
  }
`;

export const StepThreeContainer = styled.div`
  display: flex;
  box-sizing: border-box;
  padding-right: 24px;
  position: relative;
  .twoRow {
    display: flex;
    @media (max-width: 1440px) {
      flex-direction: column;
    }
    span {
      width: 36px;
    }
  }
  form {
    flex: 1;
    margin-right: 24px;
    .create {
      position: fixed;
      top: 116px;
      right: 80px;
      z-index: 110;
    }
  }
  .rightSide {
    min-width: 250px;
    max-width: 420px;
    width: 40%;
    height: auto;
    position: relative;
    margin-top: 24px;
    .selectNfts {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 8px;
      h3 {
        font-weight: 600;
        font-size: 14px;
        line-height: 20px;
        color: #000000;
      }
      span {
        font-weight: 600;
        font-size: 14px;
        line-height: 20px;
        color: #2590ff;
      }
    }

    .imageWrapper {
      position: relative;
      width: 100%;
      padding-bottom: 100%;
      height: 0;
    }
    .nftsList {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
    .nftWrapper {
      position: relative;
      width: 33%;
    }
    .nftImage {
      position: absolute;
      width: 100%;
      padding-bottom: 100%;
      background: #e9e9eb;
    }
  }
`;
