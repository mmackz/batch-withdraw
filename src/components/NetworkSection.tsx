import styles from '../styles/NetworkSection.module.css';
import BoostCard from './BoostCard';
import { Boost } from '../schemas';
import { prepareWithdrawPayload, MULTICALL_ABI, MULTICALL_ADDRESS } from '../utils/multicall';
import { useAccount, useWriteContract, useSwitchChain } from 'wagmi';
import { NetworkIdentifier, getChainId } from '../utils/viem';

const NetworkSection: React.FC<{ network: NetworkIdentifier, data: Boost[] }> = ({ network, data }) => {

  const { chain } = useAccount();
  const { switchChain } = useSwitchChain();

  const targetChainId = getChainId(network);
  const isCorrectChain = chain?.id === targetChainId;

  const handleSwitchChain = () => {
    if (targetChainId) {
      switchChain({ chainId: targetChainId });
    }
  };

  const { writeContract } = useWriteContract()

  const handleWithdraw = () => {

    if (isCorrectChain) {
      const calls = prepareWithdrawPayload(data);

      writeContract({
        address: MULTICALL_ADDRESS,
        abi: MULTICALL_ABI,
        functionName: 'aggregate3',
        args: [calls],
      });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.networkSection}>
        <div className={styles.networkHeader}>
          <h3>{network}</h3>
          <div className={styles.buttonContainer}>

            <button
              onClick={handleSwitchChain}
              className={styles.switchChainButton}
              disabled={isCorrectChain}
            >
              Switch to {network}
            </button>

            <button
              onClick={handleWithdraw}
              className={styles.withdrawButton}
              disabled={!isCorrectChain}
            >
              Withdraw All
            </button>
          </div>
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