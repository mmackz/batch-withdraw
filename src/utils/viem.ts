import {
  Chain,
  arbitrum,
  base,
  baseSepolia,
  blast,
  cyber,
  degen,
  goerli,
  mainnet,
  mantle,
  optimism,
  optimismGoerli,
  polygon,
  scroll,
  sepolia,
  zkSync,
  zora,
} from 'viem/chains';
import { createPublicClient, http } from 'viem';

export enum NetworkIdentifier {
  ETH_MAINNET = 'eth-mainnet',
  ETH_GOERLI = 'eth-goerli',
  ETH_SEPOLIA = 'eth-sepolia',
  OPT_MAINNET = 'opt-mainnet',
  OPT_GOERLI = 'opt-goerli',
  ARB_MAINNET = 'arb-mainnet',
  ARB_GOERLI = 'arb-goerli',
  MATIC_MAINNET = 'polygon-mainnet',
  MATIC_MUMBAI = 'polygon-mumbai',
  ASTAR_MAINNET = 'astar-mainnet',
  POLYGONZKEVM_MAINNET = 'polygonzkevm-mainnet',
  POLYGONZKEVM_TESTNET = 'polygonzkevm-testnet',
  ZORA_MAINNET = 'zora-mainnet',
  ZKSYNC_MAINNET = 'zksync-mainnet',
  ZKSYNC_TESTNET = 'zksync-testnet',
  SCROLL_MAINNET = 'scroll-mainnet',
  BASE_MAINNET = 'base-mainnet',
  BASE_SEPOLIA = 'base-sepolia',
  MANTLE_MAINNET = 'mantle-mainnet',
  BLAST_MAINNET = 'blast-mainnet',
  DEGEN_MAINNET = 'degen-mainnet',
  CYBER_MAINNET = 'cyber-mainnet',
}

export const getNetworkIdentifier = (chainId: number) => {
  switch (chainId) {
    case sepolia.id:
      return NetworkIdentifier.ETH_SEPOLIA;
    case goerli.id:
      return NetworkIdentifier.ETH_GOERLI;
    case optimismGoerli.id:
      return NetworkIdentifier.OPT_GOERLI;
    case polygon.id:
      return NetworkIdentifier.MATIC_MAINNET;
    case optimism.id:
      return NetworkIdentifier.OPT_MAINNET;
    case mainnet.id:
      return NetworkIdentifier.ETH_MAINNET;
    case arbitrum.id:
      return NetworkIdentifier.ARB_MAINNET;
    case zora.id:
      return NetworkIdentifier.ZORA_MAINNET;
    case zkSync.id:
      return NetworkIdentifier.ZKSYNC_MAINNET;
    case scroll.id:
      return NetworkIdentifier.SCROLL_MAINNET;
    case base.id:
      return NetworkIdentifier.BASE_MAINNET;
    case mantle.id:
      return NetworkIdentifier.MANTLE_MAINNET;
    case blast.id:
      return NetworkIdentifier.BLAST_MAINNET;
    case degen.id:
      return NetworkIdentifier.DEGEN_MAINNET;
    case cyber.id:
      return NetworkIdentifier.CYBER_MAINNET;
    case baseSepolia.id:
      return NetworkIdentifier.BASE_SEPOLIA;
    default:
      return null;
  }
};

export const networkIdentifierToViemChain = (network: NetworkIdentifier): Chain => {
  switch (network) {
    case NetworkIdentifier.ARB_MAINNET:
      return arbitrum;
    case NetworkIdentifier.BASE_MAINNET:
      return base;
    case NetworkIdentifier.BASE_SEPOLIA:
      return baseSepolia;
    case NetworkIdentifier.BLAST_MAINNET:
      return blast;
    case NetworkIdentifier.CYBER_MAINNET:
      return cyber;
    case NetworkIdentifier.DEGEN_MAINNET:
      return degen;
    case NetworkIdentifier.ETH_MAINNET:
      return mainnet;
    case NetworkIdentifier.ETH_SEPOLIA:
      return sepolia;
    case NetworkIdentifier.OPT_MAINNET:
      return optimism;
    case NetworkIdentifier.MANTLE_MAINNET:
      return mantle;
    case NetworkIdentifier.MATIC_MAINNET:
      return polygon;
    case NetworkIdentifier.ZKSYNC_MAINNET:
      return zkSync;
    case NetworkIdentifier.ZORA_MAINNET:
      return zora;
    default:
      throw new Error(`Unsupported network on viem: ${network}`);
  }
};

function NetworkToTransport(network: NetworkIdentifier) {
  switch (network) {
    case NetworkIdentifier.ETH_MAINNET:
    case NetworkIdentifier.OPT_MAINNET:
    case NetworkIdentifier.ARB_MAINNET:
    case NetworkIdentifier.BASE_MAINNET:
    case NetworkIdentifier.MATIC_MAINNET:
      return http(`https://${network}.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`);
    default:
      return http();
  }
}

export function getViemClient(network: NetworkIdentifier) {
  const chain = networkIdentifierToViemChain(network);
  return createPublicClient({
    chain,
    transport: NetworkToTransport(network),
  });
}