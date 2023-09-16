import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    main: string;
    red: string;
    black: {
      black: string;
      veryDark: string;
      darker: string;
      lighter: string;
    };
    gray: {
      lighter: string;
      darker: string;
    };
    white: {
      darker: string;
      lighter: string;
    };
  }
}
