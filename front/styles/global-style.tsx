import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";

export const GlobalStyle = createGlobalStyle`
  ${reset}

  * {
  box-sizing: border-box;
  }

  html,body {
  width: 100%;
  height: 100vh;
  padding: 0;
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans,      Droid Sans,Helvetica Neue, sans-serif;
  }

  button {
    background-color: ${props => props.theme.color.button};
    color: ${props => props.theme.color.white};
    font-size: 16px;
    border-radius: ${props => props.theme.borderSize.borderSm};
    border: none;
    cursor: pointer;
    padding: 0.4em 1.2em;
    &:hover {
      background-color: ${props => props.theme.color.buttonHover};
    }
  }

  textarea, input {
    border: 1px solid ${props => props.theme.color.border};
    color: ${props => props.theme.color.fontMain};
    ::placeholder {
      color: ${props => props.theme.color.fontSub};
    }
    padding: 0.3em 0.5em;
  }

  a {
  color: inherit;
  text-decoration: none;
  cursor: pointer;
  }

  @media (prefers-color-scheme: dark) {
    html {
      color-scheme: dark;
    }
    body {
      color: white;
      background: black;
    }
  }
`;
