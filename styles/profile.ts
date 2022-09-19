import styled from 'styled-components';

export const ProfileContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #f5f7fa;
  box-sizing: border-box;
  padding-top: 80px;
`;

export const ProfileAvatarContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 64px;
  position: relative;
  .avatar-box {
    width: 96px;
    height: 96px;
    position: relative;
    border-radius: 100%;
    overflow: hidden;
  }
  .edit-profile-box {
    width: 100px;
    height: 36px;
    position: absolute;
    left: 50%;
    margin-left: 72px;
    top: 30px;
    @media (max-width: 800px) {
      position: relative;
      left: 0;
      top: 0;
      margin-top: 20px;
      margin-left: 0;
    }
  }
  h3 {
    font-size: 26px;
    font-family: Barlow-SemiBold, Barlow;
    font-weight: 600;
    color: #1f263b;
    line-height: 38px;
    margin-top: 8px;
    margin-bottom: 12px;
  }
  .twitter-box {
    padding: 0 12px;
    width: fit-content;
    height: 44px;
    background: #ffffff;
    border-radius: 83px;
    opacity: 1;
    border: 1px solid rgba(255, 255, 255, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    p {
      margin: 0 8px;
      font-size: 14px;
      font-family: Barlow-Medium, Barlow;
      font-weight: 500;
      color: #1f263b;
      margin-top: -3px;
    }
  }
`;

export const ProfilePopsContainer = styled.div`
  width: 1280px;
  margin: 60px auto;
  box-sizing: border-box;
  @media (max-width: 1280px) {
    width: 1000px;
  }
  @media (max-width: 1000px) {
    width: 700px;
  }
  @media (max-width: 700px) {
    width: 100%;
    max-width: 400px;
    padding: 0 20px;
  }
`;

export const ProfilePopsContentContainer = styled.div`
  .list-box {
    display: grid;
    grid-gap: 24px;
    grid-column: 4;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    margin-top: 40px;
    @media (max-width: 1280px) {
      grid-template-columns: 1fr 1fr 1fr;
    }
    @media (max-width: 1000px) {
      grid-template-columns: 1fr 1fr;
    }
    @media (max-width: 700px) {
      grid-template-columns: 1fr;
      grid-gap: 20px;
      margin-top: 20px;
    }
    .nft-item-box {
      background: #ffffff;
      border-radius: 8px;
      box-sizing: border-box;
      padding: 16px;
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
        border-radius: 8px;
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
  }
`;

export const CreatedPorsPanelContainer = styled.div``;

export const EditProfileModalContainer = styled.div`
  box-sizing: border-box;
  padding: 24px 40px;
  h3 {
    font-family: 'Barlow';
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 36px;
    color: #1f263b;
  }
  p {
    font-family: 'Barlow';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    color: #1f263b;
    margin-top: 8px;
  }
  .form-box {
    margin-top: 24px;
    .form-item-box {
      margin-bottom: 24px;
      position: relative;
      label {
        font-family: 'Barlow';
        font-style: normal;
        font-weight: 600;
        font-size: 12px;
        line-height: 18px;
        color: #bdbdc2;
        margin-bottom: 8px;
        display: block;
      }
      .form-avatar-box {
        margin-top: 16px;
        display: flex;
        align-items: center;
        .img-box {
          width: 56px;
          height: 56px;
          border-radius: 56px;
          margin-right: 16px;
          position: relative;
          overflow: hidden;
        }
        .avatar-des-box {
          position: relative;
          a {
            font-family: 'Barlow';
            font-style: normal;
            font-weight: 600;
            font-size: 12px;
            line-height: 18px;
            color: #2590ff;
            cursor: pointer;
          }
          p {
            font-family: 'Barlow';
            font-style: normal;
            font-weight: 500;
            font-size: 12px;
            line-height: 18px;
            color: #bdbdc2;
          }
        }
      }
      .twitter-box {
        position: absolute;
        width: 130px;
        height: 100%;
        top: 0;
        left: 16px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .twitter-btn {
          width: 85px;
          height: 30px;
          background: #f5f7fa;
          border-radius: 24px;
          font-size: 14px;
          font-family: Barlow-Medium, Barlow;
          font-weight: 500;
          color: #1f263b;
          display: flex;
          align-items: center;
          justify-content: center;
          svg {
            margin-right: 8px;
          }
        }
        span {
          font-family: 'Barlow';
          font-style: normal;
          font-weight: 500;
          font-size: 14px;
          line-height: 20px;
          color: #1f263b;
        }
      }
    }
    .form-btn-box {
      margin-top: 40px;
      display: flex;
      flex-direction: column;
      align-items: center;
      box-sizing: border-box;
      padding: 0 40px;
    }
  }
`;
