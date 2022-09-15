import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans',
        'Droid Sans', 'Helvetica Neue', sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
  
    #__next {
      height: 100%;
  
      > .ant-layout {
        min-height: 100%;
        overflow: auto;
        > .ant-breadcrumb {
          padding: 0 32px;
        }
        > .ant-layout-content {
          padding: 0 32px;
        }
  
        > .ant-breadcrumb + .ant-layout-content {
          padding: 0 32px 0;
        }
      }
    }
  }
`;

export default GlobalStyle;
