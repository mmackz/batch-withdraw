import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
  arbitrum,
  base,
  optimism,
  sepolia,
} from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'Batch Withdraw',
  projectId: 'be2d47a2f14c3da3fe9d8310f3193c9e',
  chains: [
    optimism,
    arbitrum,
    base,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [sepolia] : []),
  ],
  ssr: true,
});