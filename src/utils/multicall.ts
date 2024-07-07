import { Boost } from "../schemas";
import { encodeFunctionData } from 'viem';
import { withdrawRemainingTokensAbi } from "./abi";

export const MULTICALL_ADDRESS = "0xcA11bde05977b3631167028862bE2a173976CA11"
export const MULTICALL_ABI = [
  {
    inputs: [
      {
        components: [
          { internalType: "address", name: "target", type: "address" },
          { internalType: "bool", name: "allowFailure", type: "bool" },
          { internalType: "bytes", name: "callData", type: "bytes" },
        ],
        internalType: "struct Multicall3.Call3[]",
        name: "calls",
        type: "tuple[]",
      },
    ],
    name: "aggregate3",
    outputs: [
      {
        components: [
          { internalType: "bool", name: "success", type: "bool" },
          { internalType: "bytes", name: "returnData", type: "bytes" },
        ],
        internalType: "struct Multicall3.Result[]",
        name: "returnData",
        type: "tuple[]",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
];

export function prepareWithdrawPayload(boosts: Boost[]) {
  return boosts.map(boost => ({
    target: boost.contractAddress,
    allowFailure: true,
    callData: encodeFunctionData({
      abi: withdrawRemainingTokensAbi,
      functionName: 'withdrawRemainingTokens',
    }),
  }));
}
