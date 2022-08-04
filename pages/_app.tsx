import Head from "next/head";
import type { AppProps } from "next/app";
import "../styles/normalize.scss";
import "../styles/globals.scss";
import { Provider } from "react-redux";
import { setupStore } from "../redux/store/store";
import { CookiesProvider } from "react-cookie";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const store = setupStore();

const theme = createTheme({
  typography: {
    fontFamily: [
      "Spectral",
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1"
        />
      </Head>
      <Provider store={store}>
        <CookiesProvider>
          <ThemeProvider theme={theme}>
            <Component {...pageProps} />
          </ThemeProvider>
        </CookiesProvider>
      </Provider>
    </>
  );
}

export default MyApp;
