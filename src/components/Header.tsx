import { ConnectButton } from '@rainbow-me/rainbowkit';
import styles from '../styles/Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        Boost Batch Withdraw
      </div>
      <ConnectButton />
    </header>
  );
};

export default Header;