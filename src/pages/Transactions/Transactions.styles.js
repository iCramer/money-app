import styled from 'styled-components'

export const TransactionsWrapper = styled.div`
  width: 100%;

  .totals {
    span {
      margin-right: 20px;
    }
  }

  table {
    font-size: 14px;
    border-collapse: collapse;
    width: 100%;
    text-align: left;
    background: #fff;
  }

  tr {
    &:nth-child(even) {
      background: #ebebeb;
    }
  }

  th {
    background: #406b87;
    color: #fff;
    padding: .5rem 1rem;

    &:first-of-type {
      border-top-left-radius: 5px;
    }

    &:last-of-type {
      border-top-right-radius: 5px;
    }
  }

  td {
    padding: .5rem 1rem;
    text-transform: capitalize;
  }

  .MuiDataGrid-root {
    .MuiDataGrid-cell {
      text-transform: capitalize;

      &.tag-cell {
        overflow: visible;
      }

      .tag-edit-btn,
        .cat-edit-btn {
            display: none;
          }

        &:hover {
          .tag-edit-btn,
          .cat-edit-btn {
            display: block;
          }
        }
    }
  }
  
  .category-cell {
    display: flex;
    width: 100%;
    
    button {
      margin-left: auto;
    }
  }
`;
