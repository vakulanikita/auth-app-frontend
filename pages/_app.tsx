import Head from "next/head";
import type { AppProps } from "next/app";
import "../styles/normalize.scss";
import "../styles/globals.scss";
import { Provider } from "react-redux";
import { setupStore } from '../redux/store/store'

const store = setupStore()

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
        <Component {...pageProps} />
      </Provider>
    </>
  );
}

export default MyApp;
