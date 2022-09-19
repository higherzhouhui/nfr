import styled from 'styled-components';

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
