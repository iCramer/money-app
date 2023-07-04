import styled, { createGlobalStyle } from 'styled-components';

export const CategoryCellStyles = styled.div`
  display: flex;
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

    .MuiMenuItem-root {
      padding: 2px 5px;

      &.new-tag-btn {
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
