import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';

export const TagEditorGlobalStyles = createGlobalStyle`
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
    }
  }
`;

export const TagEditorStyles = styled.div`
  position: relative;
  width: 100%;

  .tag-container {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .tags {
      display: flex;
      flex-wrap: wrap;

      .MuiChip-root {
        margin: 0 2px 2px 0;
      }
    }
  }
`;
