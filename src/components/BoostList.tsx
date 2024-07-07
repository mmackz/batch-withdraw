import { useState } from 'react';
import styles from '../styles/BoostList.module.css';
import { Address, isAddress } from 'viem';
import NetworkSection from './NetworkSection';
import { BoostsByNetwork } from '../schemas';

const fetchBoosts = async (address: Address) => {
  if (!address || !isAddress(address)) return null;
  const response = await fetch(`/api/get_boosts?address=${address}`);
  if (!response.ok) throw new Error('Failed to fetch boosts');
  return response.json() as Promise<BoostsByNetwork>;
};

const BoostList = () => {
  const [lookupAddress, setLookupAddress] = useState<string>("");
  const [data, setData] = useState<BoostsByNetwork | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setData(null);
    e.preventDefault();
    if (!lookupAddress) return;

    setIsLoading(true);
    setError(null);

    try {
      const result = await fetchBoosts(lookupAddress as Address);
      if (result == null) {
        setData(null);
        setError("Invalid Address");
        return;
      }
      setData(result as BoostsByNetwork);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Boost Lookup</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={lookupAddress}
          onChange={(e) => setLookupAddress(e.target.value as Address)}
          placeholder="Enter Ethereum address"
          className={styles.input}
        />
        <button type="submit" className={styles.button}>Look up Boosts</button>
      </form>

      {isLoading && <p>Loading...</p>}
      {error && <p className={styles.error}>{error}</p>}

      {data && Object.keys(data).length > 0 ? (
        <div className={styles.boostList}>
        {Object.entries(data).map(([network, networkData]) => {
          return <NetworkSection key={network} network={network} data={networkData} />;
        })}
        </div>
      ) : data ? (
        <p>No boosts found</p>
      ) : null}
    </div>
  );
};

export default BoostList;