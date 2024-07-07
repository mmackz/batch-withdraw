import styles from '../styles/BoostCard.module.css';
import { Boost } from '../schemas';

interface BoostCardProps {
  boost: Boost;
}

const BoostCard: React.FC<BoostCardProps> = ({ boost }) => {
  return (
    <div className={styles.boostCard}>
      <h4>{boost.name}</h4>
      <p>ID: {boost.id}</p>
      <p>Start: {new Date(boost.boostStart).toLocaleString()}</p>
      <p>End: {new Date(boost.boostEnd).toLocaleString()}</p>
    </div>
  );
};

export default BoostCard;