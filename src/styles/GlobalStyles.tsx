import { css, Global } from '@emotion/react';

const GlobalStyles = () => {
  return (
    <Global
      styles={css`
        html {
          font-family: 'Noto Sans KR', sans-serif;
          font-weight: bold;
          height: 100%;
          overflow: hidden;
        }
        body {
          height: 100%;
        }
        #__next {
          height: 100%;
        }
      `}
    />
  );
};

export default GlobalStyles;
