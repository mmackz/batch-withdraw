import type { NextApiRequest, NextApiResponse } from 'next';
import { isAddress } from 'viem';
import { getWithdrawableBoosts } from '../../utils/getWithdrawableBoosts';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { address } = req.query;

  if (!address || typeof address !== 'string' || !isAddress(address)) {
    return res.status(400).json({ error: 'Invalid address' });
  }

  try {
    const allBoosts: any[] = [];
    let pageNumber = 1;
    const pageSize = 50;

    while (true) {
      const response = await fetch(`https://api.boost.xyz/manager/quests?creatorAddress=${address}&pageSize=${pageSize}&searchQuery=&status=&sortBy=quest_start&sortOrder=DESC&pageNumber=${pageNumber}`);
      if (!response.ok) throw new Error('Failed to fetch boosts');
      const data = await response.json();

      allBoosts.push(...data.map((item: any) => item.boost));

      if (data.length < pageSize) {
        break;
      }

      pageNumber++;
    }

    const withdrawableBoosts = await getWithdrawableBoosts(allBoosts);

    // Separate boosts by network
    const boostsByNetwork = withdrawableBoosts.reduce((acc, boost) => {
      if (!acc[boost.network]) {
        acc[boost.network] = [];
      }
      acc[boost.network].push(boost);
      return acc;
    }, {});

    res.status(200).json(boostsByNetwork);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};

export default handler;
