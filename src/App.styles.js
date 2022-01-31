import styled from 'styled-components'

export const AppWrapper = styled.div`
  display: flex;
  background: #f5f5f5;
  color: #444;

  .main-container {
    display: flex;
    flex-direction: column;
    flex-grow: 2;
  }

  main {
    width: 100%;
    padding: 20px;

    .page-title {
      margin-top: 0;
      margin-bottom: 20px;
    }
  }

  .side-nav {
    background: #283E4A;
    width: 80px;
    min-height: 100vh;
    color: #fff;

    .logo-wrapper {
      height: 64px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #3e525e;

      .logo {
        font-size: 40px;
      }
    }

    ul {
      list-style-type: none;
      padding: 0;
      display: flex;
      flex-direction: column;
      margin: 0;

      li {
        a {
          color: #fff;
          width: 100%;
          text-align: center;
          padding: 10px 0;
          display: flex;
          align-items: center;
          justify-content: center;

          svg {
            font-size: 30px;
          }

          &.active {
            background: #4d697a;
          }
        }
      }
    }
  }

  header {
    padding: .5rem 1rem;
    background: #fff;
    border-bottom: 2px solid #dcdcdc;

    h1 {
      margin: 0;
      font-size: 2rem;
      letter-spacing: -2px;
      font-weight: 500;

      span {
        font-weight: 200;
      }
    }
  }

  .MuiDataGrid-root,
  .MuiFormControl-root {
    background: #fff;
  }
`;
