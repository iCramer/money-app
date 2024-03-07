import styled, { createGlobalStyle } from 'styled-components';

export const CategoryCellStyles = styled.div`
  display: flex;
  width: 100%;

  .edit-overlay {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgb(234 234 234 / 66%);
    display: flex;
    justify-content: center;
    align-items: center;
    visibility: hidden;
    cursor: pointer;
  }
`;

export const EditOverlay = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgb(214 214 214 / 60%);
  display: flex;
  justify-content: center;
  align-items: center;
  visibility: hidden;
  cursor: pointer;

  &:hover {
    visibility: visible;
  }
`;

export const CategoryEditorGlobalStyles = createGlobalStyle`
  .tag-menu-actions {
    display: flex;
    justify-content: space-around;
    width: 100%;
  }

  .MuiList-root {
    min-width: 200px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    .MuiMenuItem-root {
      padding: 3px 20px;
      justify-content: flex-start;
      width: 100%;

      &.new-category-btn {
        border-top: 1px solid #dcdcdc;
        margin-top: 5px;
        padding-top: 5px;

        button {
          width: 100%;
        }
      }
    }
  }
`;
