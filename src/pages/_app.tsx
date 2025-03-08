// pages/_app.tsx

import { CartProvider } from  '../context/cartcontext'; // Ensure this path is correct
import Layout from '../components/layout';
import { AppProps } from 'next/app'; // Import AppProps type
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>  {/* Wrap CartProvider here */}
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </CartProvider>
  );
}

export default MyApp;
