import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';

export const StyleOverridesGlobal = createGlobalStyle`
  .MuiDialog-container {
    .MuiPaper-root {
      width: 600px;
      max-width: 800px;
    }
  }

  .MuiDataGrid-renderingZone {
    transform: none !important;
  }
`;

export const StyleOverrides = styled.div`
  .MuiFormGroup-root {
    .MuiFormControlLabel-root {
      margin-left: -4px;
    }
  }
  .MuiFormControl-root {
    margin: 0;
  }
`;
