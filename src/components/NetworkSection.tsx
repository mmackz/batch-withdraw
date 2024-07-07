import React from 'react';
import styles from '../styles/BoostList.module.css';
import BoostCard from './BoostCard';
import { Boost } from '../schemas';

const NetworkSection: React.FC<{ network: string, data: Boost[] }> = ({ network, data }) => {
  const handleWithdraw = (network: string) => {
    // TODO: Implement withdraw logic
    console.log(`Withdrawing from network: ${network}`);
  
  };

  return (
    <div className={styles.container}>
      <div className={styles.networkSection}>
        <div className={styles.networkHeader}>
          <h3>{network}</h3>
          <button
            onClick={() => handleWithdraw(network)}
            className={styles.withdrawButton}
          >
            Withdraw All
          </button>
        </div>
        <div className={styles.boostGrid}>
          {data.map((boost) => (
            boost && <BoostCard key={boost.id} boost={boost} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NetworkSection;