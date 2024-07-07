import { getViemClient } from "./viem";
import { hasWithdrawnAbi } from "./abi";

export async function getWithdrawableBoosts(data: any[]) {
  const eligibleBoosts = data.filter((boost: any) => boost.network && (boost.status === "expired" || boost.status === "completed")).sort((a, b) => a.network.localeCompare(b.network));
  const withdrawableBoosts = []
  for (const boost of eligibleBoosts) {
    const { contractAddress, network } = boost;
    const client = getViemClient(network);
    const hasWithdrawn = await client.readContract({
      address: contractAddress,
      functionName: "hasWithdrawn",
      abi: hasWithdrawnAbi,
    });
    if (!hasWithdrawn) {
      withdrawableBoosts.push(boost);
    }
  }
  return withdrawableBoosts;
}
