import { z } from 'zod';
import { NetworkIdentifier } from '../utils/viem';

const BoostSchema = z.object({
  id: z.string(),
  appLink: z.string(),
  iconOption: z.string(),
  imagePath: z.string(),
  name: z.string(),
  boostEnd: z.union([z.date(), z.string()]),
  boostStart: z.union([z.date(), z.string()]),
  description: z.string(),
  network: z.nativeEnum(NetworkIdentifier),
  receiptsMinted: z.number(),
  status: z.string(),
  createdAt: z.union([z.date(), z.string()]),
  contractAddress: z.string().nullable().optional(),
  creatorAddress: z.string().nullable().optional(),
});

export type Boost = z.infer<typeof BoostSchema>;

export type BoostsByNetwork = {
  [K in NetworkIdentifier]: Boost[]
}