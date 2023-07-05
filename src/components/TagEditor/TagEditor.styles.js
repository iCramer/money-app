import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';

export const TagEditorGlobalStyles = createGlobalStyle`
  .tag-menu-actions {
    display: flex;
    justify-content: space-around;
    width: 100%;
  }

  .edit-btn-group {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #dcdcdc;
  }

  .MuiList-root {
    min-width: 200px;
    display: flex;
    flex-direction: column;

    .MuiMenuItem-root {
      padding: 3px 10px;
    }
  }
`;

export const TagEditorStyles = styled.div`
  width: 100%;

  .done-overlay, .edit-overlay {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgb(234 234 234 / 66%);
    display: flex;
    justify-content: center;
    align-items: center;
    pointer-events: auto;
  }

  .edit-overlay {
    visibility: hidden;
  }

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
