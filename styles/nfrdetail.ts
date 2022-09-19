import styled from 'styled-components';
export const NfrDetailContainer = styled.div``;
export const NfrProperty = styled.div`
  margin-top: 36px;
  width: 40%;
  border: 1px solid rgba(233, 233, 233, 1);
  padding: 8px 16px;
  box-sizing: border-box;
  min-width: 250px;
  max-width: 450px;
  h2 {
    font-family: Barlow-SemiBold, Barlow;
    font-size: 16px;
  }
  .propertyWrapper {
    display: flex;
    margin-top: 12px;
    justify-content: space-between;
  }
  .property {
    display: flex;
    width: 48%;
    flex-direction: column;
    align-items: center;
    background: rgba(37, 144, 255, 0.1);
    border: 1px solid #2590ff;
    border-radius: 8px;
    padding: 16px 0;
    word-break: break-all;
    text-transform: uppercase;
    .title {
      color: #2590ff;
      font-size: 12px;
    }
    .name {
      color: #000;
      font-family: Barlow-Medium, Barlow;
      font-size: 18px;
    }
  }
`;
