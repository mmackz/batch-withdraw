import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Header from '../components/Header';
import BoostList from '../components/BoostList';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>RainbowKit App</title>
        <meta
          content="Generated by @rainbow-me/create-rainbowkit"
          name="description"
        />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <Header />
      <BoostList />
    </div>
  );
};

export default Home;
