import { getViemClient, NetworkIdentifier } from "./viem";
import { hasWithdrawnAbi } from "./abi";
import { isPast, isAfter } from "date-fns";
import { Boost } from "../schemas";
import { Address } from "viem";

export async function getWithdrawableBoosts(data: Boost[]) {
  const eligibleBoosts = data
    .filter(
      (boost) =>
        boost &&
        boost.contractAddress &&
        boost.boostEnd != null &&
        (boost.status === "expired" || boost.status === "completed") &&
        isPast(new Date(boost.boostEnd)) &&
        isAfter(new Date(boost.boostStart), new Date(2024, 0, 1))
    )
    .sort((a, b) => a.network.localeCompare(b.network));
  const withdrawableBoosts = [];
  for (const boost of eligibleBoosts) {
    const { contractAddress, network } = boost;
    const client = getViemClient(network as NetworkIdentifier);
    const hasWithdrawn = await client.readContract({
      address: contractAddress! as Address,
      functionName: "hasWithdrawn",
      abi: hasWithdrawnAbi,
    });
    if (!hasWithdrawn) {
      withdrawableBoosts.push(boost);
    }
  }
  return withdrawableBoosts;
}
