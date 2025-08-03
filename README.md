# SoundProof

A decentralized music streaming and licensing platform built to empower African independent musicians and connect them directly with fans through transparent, on-chain revenue sharing, copyright protection, and engagement rewards.

---

## Overview

SoundProof consists of ten Clarity smart contracts that form a modular, composable ecosystem for decentralized music distribution, monetization, and discovery:

1. **Song Registry Contract** – Registers and manages metadata, IPFS content, and licensing terms for songs.
2. **Music NFT Contract** – Mints NFTs representing full or fractional ownership of music content.
3. **Royalty Split Contract** – Distributes streaming or purchase revenue among artists, producers, and collaborators.
4. **Access Token Contract** – Issues ERC-1155–like access passes for rentals, streams, or downloads.
5. **Fan Subscription Contract** – Enables recurring fan subscriptions to artists or labels.
6. **Platform Token Contract** – Manages the platform's native reward token (NoteToken).
7. **Referral Reward Contract** – Pays fans for promoting artists or tracks through tracked referral links.
8. **Host Incentive Contract** – Rewards users who host and serve music files via decentralized storage (IPFS/Filecoin).
9. **Sync Licensing Contract** – Allows artists to license music for film, games, and commercial use.
10. **Dispute Resolution Contract** – Resolves conflicts such as copyright claims or revenue splits.

---

## Features

- **NFT-based song ownership and licensing**
- **Automated royalty splits with on-chain transparency**
- **Tokenized access to rent, stream, or purchase music**
- **Recurring artist subscription payments**
- **Referral-based fan engagement rewards**
- **Hosting incentives for decentralized audio distribution**
- **Built-in sync licensing tools for creators**
- **Dispute mediation and copyright claim resolution**
- **Localized payment support via stablecoins**
- **Mobile-friendly onboarding with low gas usage**

---

## Smart Contracts

### Song Registry Contract
- Register IPFS hash and metadata for music tracks
- Define public or commercial license terms
- Update or revoke entries by the song owner

### Music NFT Contract
- Mint and transfer NFTs tied to song content
- Represent full or fractional ownership rights
- Integrate with licensing and royalty modules

### Royalty Split Contract
- Split incoming payments among collaborators
- Enforce predefined percentage allocations
- Trigger payout on stream/purchase

### Access Token Contract
- Mint passes for access tiers (e.g., stream, rent, download)
- Validity rules (time-based, quantity-based)
- Transferable/non-transferable token types

### Fan Subscription Contract
- Allow fans to subscribe monthly to artists
- Manage recurring billing cycles
- Reward loyal subscribers with perks

### Platform Token Contract (NoteToken)
- Mint and distribute NOTE tokens
- Used for artist tips, staking, and platform governance
- Claimable through referrals, engagement, or hosting

### Referral Reward Contract
- Assign unique referral codes to fans
- Track referred users and reward promoters
- Calculate tiered bonuses based on engagement

### Host Incentive Contract
- Reward users who pin/share high-demand music
- Track IPFS node proof of service
- Distribute NOTE tokens based on usage stats

### Sync Licensing Contract
- Artists offer tracks for sync licensing
- Buyers submit usage proposals and payments
- Licensing terms enforced on-chain

### Dispute Resolution Contract
- Accept copyright or royalty-related disputes
- Community voting or arbitration logic
- Escrow funds until resolution

---

## Installation

1. Install [Clarinet CLI](https://docs.hiro.so/clarinet/getting-started)
2. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/soundproof.git
   ```
3. Run tests:
    ```bash
    npm test
    ```
4. Deploy contracts:
    ```bash
    clarinet deploy
    ```

## Usage

Each contract is modular and can function independently, but they are designed to work together to deliver a seamless experience for creators and fans. See individual .clar files and test cases for function reference and integration patterns.

## License

MIT License