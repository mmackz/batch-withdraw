# Boost.xyz Batch Withdrawal App

A simple web application for batch withdrawing Boosts from [boost.xyz](https://boost.xyz).

## Features

- Batch withdraw Boosts from multiple chains
- No need to connect the account you're withdrawing from
- Any address can initiate withdrawals (gas fees apply)

## How to Use

1. **Search by Address**
   - Enter an address into the search form
   - Wait for the app to find all withdrawable boosts (may take up to a minute)
   - Boosts will be grouped by network

2. **Withdraw Boosts**
   - Switch to the correct network for each group of boosts
   - Click the "Withdraw All" button for each network
   - Confirm the multicall transaction in your wallet

## Important Notes

- Withdrawals can be initiated by any address willing to pay the gas fees
- Ensure you're connected to the correct network before initiating a withdrawal

## Getting Started

- To run locally, download the code off github or fork the repo
- Setup a .env.local file and input a `NEXT_PUBLIC_ALCHEMY_API_KEY`
- Run the `pnpm install` command
- Run `pnpm run dev` to start the app
