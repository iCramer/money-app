import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import Badge from '@mui/material/Badge';

export const TagEditorGlobalStyles = createGlobalStyle`
  .MuiPaper-root {
    .check-list {
      padding: 8px 15px;

      & > div {
        margin: 8px 0;
      }
    }
  }
`;

export const StyledBadge = styled(Badge)`
  .MuiBadge-badge {
    background-color: #fff;
    color: #2e7d32;
  }
`;

export const FiltersWrapper = styled.div`
  .filters {
    display: flex;
    gap: 10px;
  }

  .filter-submit-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 25px;
  }

  h3 {
    margin-top: 0;
    display: flex;
    align-items: center;
    
    .filter-icon {
      font-size: 14px;
      margin-right: 3px;
    }
  }
`;
