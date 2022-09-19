import styled from 'styled-components';

export const HeaderContainer = styled.header`
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 0 40px;
  position: fixed;
  top: 0;
  z-index: 9999;
  transition: all 0.2s;
  background-color: white;
  box-shadow: 0px 6px 18px rgba(0, 0, 0, 0.02);
  @media (max-width: 500px) {
    height: 60px;
    padding: 0 30px;
  }
  @media (max-width: 400px) {
    height: 60px;
    padding: 0 10px;
  }
`;

export const HeaderLeftContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

export const LogoContainer = styled.div`
  height: 100%;
  font-size: 20px;
  font-family: Barlow-SemiBold, Barlow;
  font-weight: 600;
  color: #ffffff;
  line-height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* text-transform: Uppercase; */
  cursor: pointer;
  @media (max-width: 500px) {
    font-size: 18px;
  }
  @media (max-width: 350px) {
    font-size: 15px;
  }
  .logo {
    display: flex;
    align-items: center;
  }
  .routerTitle {
    display: flex;
    .active {
      color: rgba(34, 34, 51, 1) !important;
      .underLine {
        visibility: visible !important;
      }
    }
    .title {
      margin-left: 30px;
      position: relative;
      font-size: 14px;
      font-weight: 500;
      color: rgba(34, 34, 51, 0.6);
      &:hover {
        color: rgba(34, 34, 51, 1);
        .underLine {
          visibility: visible;
        }
      }
      .underLine {
        width: 24px;
        height: 2px;
        background: rgba(37, 144, 255, 1);
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: -10px;
        visibility: hidden;
      }
    }
  }
`;

export const MenuContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  &:hover .dropDown {
    display: block;
  }
  .dropDown {
    display: none;
    padding: 16px 0;
    position: absolute;
    width: 200px;
    right: 0;
    top: 70px;
    background: #ffffff;
    /* 投影 */
    box-shadow: 0px 12px 36px rgba(204, 204, 204, 0.3);
    border-radius: 8px;
    .list {
      padding: 6px 24px;
      cursor: pointer;
      svg {
        margin-right: 8px;
      }
      display: flex;
      align-items: center;
      font-style: normal;
      font-size: 14px;
      line-height: 20px;
      color: #222233;
      opacity: 0.7;
      :hover {
        opacity: 1;
        font-family: Barlow-Medium, Barlow;
      }
    }
  }
`;

export const MenuItemContainer = styled.div`
  font-size: 18px;
  font-family: Barlow-Regular, Barlow;
  font-weight: 400;
  color: #ffffff;
  display: flex;
  align-items: center;
  svg {
    cursor: pointer;
  }
  .mynftWrapper {
    width: 44px;
    height: 44px;
    background: #f5f7fa;
    border-radius: 40px;
    opacity: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
    @media (max-width: 500px) {
      margin-right: 5px;
    }
  }
  .addressWraper {
    height: 44px;
    background: #f5f7fa;
    border-radius: 70px;
    opacity: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 6px;
    position: relative;
    cursor: pointer;
    margin-left: 10px;
    @media (max-width: 1000px) {
      display: none;
    }
    .address {
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 14px;
      font-family: Barlow-Medium, Barlow;
      font-weight: 500;
      color: #000000;
      line-height: 20px;
      margin-left: 8px;
      @media (max-width: 800px) {
        display: none;
      }
    }
    .imageWrapper {
      min-width: 32px;
      min-height: 32px;
      position: relative;
      border-radius: 40px;
      overflow: hidden;
    }
  }
  .wallet-box {
    width: 171px;
    height: 44px;
    background: #f5f7fa;
    border-radius: 44px;
    display: flex;
    align-items: center;
    color: #1f263b;
    justify-content: center;
    cursor: pointer;
    svg {
      margin-right: 16px;
    }
    p {
      font-size: 14px;
      font-family: Barlow-Medium, Barlow;
      font-weight: 500;
    }
    @media (max-width: 1000px) {
      display: none;
    }
  }
`;

export const HeaderSearchContainer = styled.div`
  width: 320px;
  height: 36px;
  border-radius: 103px;
  position: relative;
  border: 1px solid #c6bebe;
  .icon-box {
    width: 44px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: 0;
    @media (max-width: 1000px) {
      display: none;
    }
  }
  .icon-phone-box {
    width: 44px;
    height: 100%;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: 0;
    display: none;
    cursor: pointer;
    @media (max-width: 1000px) {
      display: flex;
    }
  }
  .input-box {
    width: 100%;
    height: 100%;
    input {
      width: 100%;
      height: 100%;
      border: 0;
      background: #f5f7fa;
      border-radius: 103px;
      box-sizing: border-box;
      padding-left: 48px;
      font-size: 14px;
      @media (max-width: 500px) {
        padding-left: 40px;
      }
      &::-webkit-input-placeholder {
        font-size: 14px;
        font-family: Barlow-Regular, Barlow;
        font-weight: 400;
        color: #bdbdc2;
      }
      &::-moz-placeholder {
        font-size: 14px;
        font-family: Barlow-Regular, Barlow;
        font-weight: 400;
        color: #bdbdc2;
      }
    }
  }
  @media (max-width: 1000px) {
    width: 44px;
    background: #f5f7fa;
    border-radius: 103px;
    .input-box {
      display: none;
    }
  }
  .search-list-box {
    position: absolute;
    width: 100%;
    max-height: 300px;
    background-color: white;
    box-shadow: 0 0 10px rgb(0 0 0 / 20%);
    border-radius: 15px;
    top: 100%;
    left: 0;
    overflow-y: auto;
    z-index: 99;
    .search-item-box {
      width: 100%;
      height: 57px;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      padding: 0 20px;
      border-bottom: 1px solid rgb(229, 232, 235);
      font-weight: 600;
      font-size: 14px;
      color: rgb(4, 17, 29);
      cursor: pointer;
      &:last-child {
        border: 0;
      }
      &:hover {
        box-shadow: 0 0 10px rgb(0 0 0 / 20%);
      }
    }
  }
`;
export const DrawerSearchContentContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  position: relative;
  .drawer-header-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 70px;
    box-sizing: border-box;
    padding: 0 20px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    svg {
      cursor: pointer;
    }
    .input-box {
      flex: 1;
      height: 44px;
      margin-right: 20px;
      position: relative;
      .icon-phone-box {
        width: 44px;
        height: 100%;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        position: absolute;
        top: 0;
        left: 0;
        cursor: pointer;
        display: flex;
      }
      input {
        width: 100%;
        height: 100%;
        border: 0;
        background: #f5f7fa;
        border-radius: 103px;
        box-sizing: border-box;
        padding-left: 48px;
        font-size: 14px;
        @media (max-width: 500px) {
          padding-left: 40px;
        }
        &::-webkit-input-placeholder {
          font-size: 14px;
          font-family: Barlow-Regular, Barlow;
          font-weight: 400;
          color: #bdbdc2;
        }
        &::-moz-placeholder {
          font-size: 14px;
          font-family: Barlow-Regular, Barlow;
          font-weight: 400;
          color: #bdbdc2;
        }
      }
    }
  }
  .search-list-box {
    width: 100%;
    max-height: calc(100% - 70px);
    background-color: white;
    overflow-y: auto;
    .search-item-box {
      width: 100%;
      height: 57px;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      padding: 0 20px;
      border-bottom: 1px solid rgb(229, 232, 235);
      font-weight: 600;
      font-size: 14px;
      color: rgb(4, 17, 29);
      cursor: pointer;
      &:last-child {
        border: 0;
      }
      &:hover {
        box-shadow: 0 0 10px rgb(0 0 0 / 20%);
      }
    }
  }
`;
export const HeaderNavContainer = styled.div`
  display: flex;
  box-sizing: border-box;
  padding: 0 50px;
  @media (max-width: 1000px) {
    display: none;
  }
  .nav-item-box {
    margin-right: 32px;
    @media (max-width: 1000px) {
      margin-right: 25px;
    }
    a {
      font-size: 14px;
      font-family: Barlow-Medium, Barlow;
      font-weight: 500;
      color: #bdbdc2;
      &:hover {
        color: #222233;
      }
    }
    &.active-nav {
      a {
        color: #222233;
      }
    }
  }
`;

export const MenuDrawerContainer = styled.div`
  width: 44px;
  height: 44px;
  background: #f5f7fa;
  border-radius: 44px;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
  display: none;
  @media (max-width: 1000px) {
    display: flex;
  }
  svg {
    cursor: pointer;
  }
`;

export const DrawerContentContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  position: relative;
  .drawer-header-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 60px;
    box-sizing: border-box;
    padding: 0 20px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    svg {
      cursor: pointer;
    }
  }
  .drawer-menu-box {
    width: 100%;
    height: calc(100% - 60px);
    box-sizing: border-box;
    padding: 30px 20px 100px 20px;
    .drawer-menu-item-box {
      width: 100%;
      height: 40px;
      a {
        font-size: 16px;
        font-weight: 500;
        color: #222233;
      }
    }
  }
  .drawer-btn-box {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    .wallet-box {
      width: 200px;
      height: 44px;
      background: #f5f7fa;
      border-radius: 44px;
      display: flex;
      align-items: center;
      color: #1f263b;
      justify-content: center;
      cursor: pointer;
      svg {
        margin-right: 16px;
      }
      p {
        font-size: 14px;
        font-family: Barlow-Medium, Barlow;
        font-weight: 500;
        color: #1f263b;
        margin-top: -3px;
      }
    }
    .addressWraper {
      width: 140px;
      height: 44px;
      background: #f5f7fa;
      border-radius: 70px;
      opacity: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 6px;
      position: relative;
      cursor: pointer;
      .address {
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 14px;
        font-family: Barlow-Medium, Barlow;
        font-weight: 500;
        color: #000000;
        line-height: 20px;
        margin-left: 8px;
      }
      .imageWrapper {
        min-width: 32px;
        min-height: 32px;
        position: relative;
        border-radius: 40px;
        overflow: hidden;
      }
    }
  }
`;
