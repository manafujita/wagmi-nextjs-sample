'use client'

import type { Chain } from '@rainbow-me/rainbowkit';
import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { cookieStorage, createStorage, http } from 'wagmi'
import { blastSepolia, bscTestnet, sepolia } from 'wagmi/chains'

const projectId = 'testprojectId';

const supportedChains: Chain[] = [sepolia, bscTestnet, blastSepolia]

export const config = getDefaultConfig({
  appName: 'WalletConnection',
  projectId,
  chains: supportedChains as any,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  transports: supportedChains.reduce(
    (obj, chain) => ({ ...obj, [chain.id]: http() }),
    {},
  ),
})
