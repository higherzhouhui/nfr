import styled from 'styled-components';

export const MintDetailModal = styled.div`
  max-width: 100%;
  width: 1200px;
  height: auto;
  background: transparent;
  position: relative;
  display: flex;
  box-sizing: border-box;
  .leftSide {
    width: 40%;
    background: #fff;
    border-radius: 16px;
    padding: 24px;
    margin-right: 24px;
    box-sizing: border-box;
    overflow: hidden;
    position: relative;
    @media (max-width: 1000px) {
      padding: 18px;
    }
    @media (max-height: 700px) {
      width: 30%;
      padding: 16px;
    }
    @media (max-width: 600px) {
      display: none;
    }
    .watermark {
      position: relative;
      z-index: 99;
      width: 100%;
      height: 100px;
      margin-bottom: -60px;
      @media (max-width: 1440px) {
        height: 80px;
        margin-bottom: -50px;
      }
    }

    .imageWrapper {
      width: 100%;
      padding-bottom: 100%;
      height: 0;
      position: relative;
    }
    .nameWrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 24px;
      @media (max-width: 1000px) {
        margin-top: 18px;
      }
      .name {
        font-size: 24px;
        font-family: Barlow-Medium, Barlow;
        font-weight: 500;
        color: #222233;
        line-height: 36px;
        @media (max-width: 1000px) {
          font-size: 20px;
          line-height: 30px;
        }
      }
      .svgWrapper {
        width: 32px;
        height: 32px;
        cursor: pointer;
        @media (max-width: 1000px) {
          width: 28px;
          height: 28px;
        }
      }
      .originLeft {
        display: flex;
        align-items: center;
      }
      .originImg {
        width: 40px;
        height: 40px;
        border-radius: 4px;
        overflow: hidden;
        position: relative;
        margin-right: 16px;
        @media (max-width: 1000px) {
          width: 32px;
          height: 32px;
        }
      }
      .originName {
        font-size: 16px;
        font-family: Barlow-Medium, Barlow;
        font-weight: 500;
        color: #222233;
        line-height: 24px;
        @media (max-width: 1000px) {
          font-size: 14px;
          line-height: 21px;
        }
      }
      .originLink {
        width: 24px;
        height: 24px;
        @media (max-width: 1000px) {
          width: 20px;
          height: 20px;
        }
      }
    }
    .addressWrapper {
      margin-top: 16px;
      display: flex;
      @media (max-width: 800px) {
        flex-direction: column;
      }
      .address {
        display: flex;
        width: 140px;
        align-items: center;
        justify-content: center;
        border-radius: 4px;
        border: 1px solid #decbcb;
        margin-right: 16px;
        height: 32px;
        padding: 0 10px;
        box-sizing: border-box;
        font-size: 12px;
        font-weight: 500;
        font-family: Barlow-Medium, Barlow;
        opacity: 0.7;
        line-height: 18px;
        position: relative;
        @media (max-width: 1000px) {
          margin-bottom: 12px;
        }
        .label {
          min-width: 66px;
        }
        .addWord {
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          height: 18px;
        }
        :hover .wholeAddress {
          display: block;
        }
        .wholeAddress {
          position: absolute;
          background: #190d0d;
          color: #fff;
          padding: 4px;
          top: 30px;
          left: 0;
          display: none;
          box-sizing: border-box;
          border-radius: 3px;
          overflow: hidden;
        }
        .leftmove {
          left: -80px;
        }
      }
    }
  }
  .rightLoading {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #ffffff;
    border-radius: 16px;
    flex: 1;
  }
  .rightSide {
    flex: 1;
    background: #ffffff;
    border-radius: 16px;
    opacity: 1;
    position: relative;
    padding: 32px 24px 32px 40px;
    box-sizing: border-box;
    overflow: hidden;
    @media (max-width: 600px) {
      padding: 12px;
    }
    @media (max-width: 1000px) {
      padding: 20px;
    }
    @media (max-height: 700px) {
      padding: 18px;
    }
    h1 {
      font-size: 32px;
      font-family: Barlow-SemiBold, Barlow;
      font-weight: 600;
      color: #222233;
      line-height: 48px;
      @media (max-width: 1000px) {
        font-size: 26px;
        line-height: 39px;
      }
      @media (max-height: 700px) {
        font-size: 26px;
        line-height: 39px;
      }
    }
    .goodlists {
      transition: all 0.2s;
      width: 100%;
      background: rgba(37, 144, 255, 0.1);
      border-radius: 8px;
      box-sizing: border-box;
      padding: 8px;
      position: relative;
      overflow: hidden;
      .mintFlag {
        position: absolute;
        bottom: 10px;
        right: 32px;
        width: 80px;
        height: 80px;
        z-index: 10;
        border-radius: 4px;
      }
      .lookMore {
        font-size: 14px;
        font-family: Barlow-Medium, Barlow;
        font-weight: 500;
        color: #2590ff;
        line-height: 21px;
        position: absolute;
        top: 8px;
        right: 16px;
        z-index: 99;
        text-transform: uppercase;
        cursor: pointer;
        &:hover {
          font-weight: bold;
        }
      }
      .list {
        display: flex;
        align-items: center;
        //改版删除
        height: 100%;
      }
      svg {
        margin-right: 8px;
      }
      .des {
        font-size: 20px;
        font-family: Barlow-Medium, Barlow;
        font-weight: 500;
        color: #222233;
        line-height: 30px;
      }
    }
    h2 {
      margin-top: 8px;
      font-size: 24px;
      font-family: Barlow-Medium, Barlow;
      font-weight: 500;
      color: #222233;
      line-height: 36px;
      padding-right: 100px;
      @media (max-width: 1000px) {
        font-size: 18px;
        line-height: 27px;
      }
      @media (max-height: 700px) {
        font-size: 18px;
        line-height: 27px;
      }
    }
    h4 {
      margin-top: 12px;
      font-size: 16px;
      font-family: Barlow-Medium, Barlow;
      font-weight: 500;
      opacity: 0.7;
      line-height: 24px;
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
    .timeWrapper {
      margin-top: 8px;
      display: flex;
      .content {
        flex: 1;
        display: flex;
        flex-direction: column;
        .number {
          font-size: 40px;
          font-family: Barlow-SemiBold, Barlow;
          font-weight: 600;
          color: #222233;
          line-height: 60px;
          @media (max-width: 1000px) {
            font-size: 36px;
            line-height: 54px;
          }
          @media (max-height: 700px) {
            font-size: 36px;
            line-height: 54px;
          }
        }
        .des {
          margin-top: 5px;
          font-size: 16px;
          font-family: Barlow-Medium, Barlow;
          font-weight: 500;
          opacity: 0.7;
          line-height: 24px;
        }
      }
    }
    .attachWrapper {
      display: flex;
      align-items: center;
      margin-top: 24px;
      margin: 24px 0 40px 0;
      @media (max-width: 1000px) {
        margin: 16px 0 30px 0;
      }
      @media (max-height: 700px) {
        margin: 16px 0 30px 0;
      }
      a,
      div {
        width: 120px;
        height: 32px;
        border-radius: 4px 4px 4px 4px;
        opacity: 1;
        border: 1px solid #decbcb;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        font-family: Barlow-Medium, Barlow;
        font-weight: 500;
        opacity: 0.7;
        line-height: 18px;
        margin-right: 16px;
        @media (max-width: 500px) {
          width: 100px;
        }
        :hover {
          background: rgba(37, 144, 255, 0.1);
          color: #2590ff;
        }
        svg {
          margin-left: 4px;
        }
      }
    }
    button {
      @media (max-width: 1000px) {
        width: 250px;
        height: 45px;
      }
      @media (max-width: 500px) {
        width: 160px;
        height: 38px;
      }
    }
  }
`;

export const NomintDetailModal = styled.div`
  max-width: 100%;
  width: 1200px;
  height: auto;
  background: transparent;
  position: relative;
  display: flex;
  .leftSide {
    width: 40%;
    background: #fff;
    border-radius: 16px;
    overflow: hidden;
    padding: 24px;
    margin-right: 24px;
    box-sizing: border-box;
    @media (max-width: 1000px) {
      padding: 18px;
    }
    @media (max-width: 500px) {
      display: none;
    }
    @media (max-height: 700px) {
      width: 30%;
    }
    .watermark {
      position: relative;
      z-index: 99;
      width: 100%;
      height: 100px;
      margin-bottom: -60px;
      @media (max-width: 1440px) {
        height: 80px;
        margin-bottom: -50px;
      }
    }
    .imageWrapper {
      width: 100%;
      padding-bottom: 100%;
      height: 0;
      position: relative;
    }
    h1 {
      margin-top: 24px;
      font-size: 24px;
      font-family: Barlow-Medium, Barlow;
      font-weight: 500;
      color: #222233;
      line-height: 36px;
    }
  }
  .rightSide {
    flex: 1;
    background: #ffffff;
    border-radius: 16px;
    overflow: hidden;
    opacity: 1;
    position: relative;
    padding: 40px;
    box-sizing: border-box;
    @media (max-width: 1000px) {
      padding: 24px;
    }
    @media (max-width: 500px) {
      padding: 18px;
    }
    @media (max-height: 700px) {
      padding: 18px;
    }

    .imageWrapper {
      position: relative;
      width: 160px;
      height: 160px;
      margin: 0 auto;
      display: none;
      @media (max-width: 500px) {
        display: block;
      }
      .watermark {
        position: absolute;
        z-index: 99;
        width: 100%;
        height: 60px;
        top: -20px;
        left: 0;
      }
    }
    .attach {
      width: 120px;
      height: 32px;
      background: rgba(37, 144, 255, 0.1);
      border-radius: 4px;
      opacity: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 24px 0;
      position: relative;

      @media (max-height: 700px) {
        margin: 18px 0;
      }
      .inputfile {
        width: 100%;
        opacity: 0;
        z-index: 10;
        cursor: pointer;
      }
      /* .content {
        cursor: pointer;
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #2590ff;
        svg {
          margin-left: 4px;
        }
      } */
    }
    button {
      @media (max-width: 1000px) {
        width: 250px;
        height: 45px;
      }
      @media (max-width: 700px) {
        width: 200px;
        height: 40px;
      }
      @media (max-width: 500px) {
        width: 160px;
        height: 38px;
      }
    }
  }
`;

export const FormItemContainer = styled.div`
  width: 100%;
  margin-bottom: 24px;
  @media (max-height: 700px) {
    margin-bottom: 18px;
  }
  p {
    font-size: 16px;
    font-family: Barlow-Medium, Barlow;
    font-weight: 500;
    color: #222233;
    line-height: 24px;
    color: #333333;
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
    border: 1px solid #222233;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none !important;
  }
  input[type='number'] {
    -moz-appearance: textfield;
  }
`;

export const SuccessComp = styled.div`
  width: 320px;
  height: 190px;
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  box-sizing: border-box;
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  h1 {
    text-align: center;
    font-size: 20px;
    font-family: Barlow-Medium, Barlow;
    font-weight: 500;
    color: #222233;
    line-height: 30px;
  }
  .svgWrapper {
    position: relative;
    width: 80px;
    height: 80px;
    margin-top: 24px;
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
`;

export const ModalLoading = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .text {
    width: 100%;
    text-align: center;
    font-size: 24px;
    font-family: Barlow-SemiBold, Barlow;
    font-weight: 600;
    color: #1f263b;
    line-height: 36px;
  }
  .loading {
    box-sizing: border-box;
    width: 100%;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const UploadComp = styled.div`
  width: 100%;
  height: 100%;
  .content {
    cursor: pointer;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #2590ff;
    svg {
      margin-left: 4px;
    }
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
`;
