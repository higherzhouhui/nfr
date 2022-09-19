import styled from 'styled-components';

export const TabContainer = styled.div`
  width: 100%;
  height: 44px;
  box-sizing: border-box;
  border-bottom: 2px solid #e9e9eb;
  @media (max-width: 800px) {
    border: 0;
  }
  .select-box {
    width: 100%;
    height: 100%;
    display: none;
    justify-content: center;
    align-items: center;
    max-width: 400px;
    margin: 0 auto;
    .css-1s2u09g-control,
    .css-1pahdxg-control {
      border-radius: 50px;
    }
    @media (max-width: 800px) {
      display: flex;
    }
  }
  .tab-box {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    @media (max-width: 800px) {
      display: none;
    }
  }
`;

interface TabItemInterface {
  active: boolean;
}

export const TabItemContainer = styled.div<TabItemInterface>`
  font-size: 14px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Barlow-SemiBold, Barlow;
  font-weight: 600;
  color: ${({active}) => (active ? '#1F263B' : '#bdbdc2')};
  border-bottom: ${({active}) => (active ? '2px solid #2590FF' : '0')};
  margin: 0 24px;
  cursor: pointer;
`;

export const TabPanelContainer = styled.div``;
