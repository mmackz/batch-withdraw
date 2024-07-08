import Image from 'next/image';
import styles from '../styles/BoostCard.module.css';
import { Boost } from '../schemas';

interface BoostCardProps {
  boost: Boost;
}

const BoostCard: React.FC<BoostCardProps> = ({ boost }) => {
  return (
    <div className={styles.boostCard}>
      <h4>{boost.name}</h4>
      <Image src={boost.iconOption} alt={boost.name} width={40} height={40} />
      <p>ID: {boost.id}</p>
      <p>Start: {new Date(boost.boostStart).toLocaleString()}</p>
      <p>End: {new Date(boost.boostEnd).toLocaleString()}</p>
    </div>
  );
};

export default BoostCard;