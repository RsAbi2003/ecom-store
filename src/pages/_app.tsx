import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { CartProvider } from '../context/cartcontext';
import { WishlistProvider } from '../context/whishlistcontext';
import Layout from '../components/layout';
import Footer from '@/components/Footer';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <CartProvider>
      <WishlistProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </WishlistProvider>
    </CartProvider>
  );
};

export default MyApp;
