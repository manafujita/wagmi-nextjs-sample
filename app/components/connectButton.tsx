'use client'

import { emojiAvatarForAddress } from '@/lib/emojiAvatarForAddress'
import {
  useAccountModal,
  useChainModal,
  useConnectModal,
} from '@rainbow-me/rainbowkit'
import { useEffect, useRef } from 'react'
import { useAccount, useDisconnect } from 'wagmi'

export const ConnectBtn = () => {
  const { isConnecting, address, isConnected, chain } = useAccount()
  const { color: backgroundColor, emoji } = emojiAvatarForAddress(address ?? '')

  const { openConnectModal } = useConnectModal()
  const { openAccountModal } = useAccountModal()
  const { openChainModal } = useChainModal()
  const { disconnect } = useDisconnect()

  const isMounted = useRef(false)

  useEffect(() => {
    isMounted.current = true
  }, [])

  if (!isConnected) {
    return (
      <button
        className="btn"
        onClick={async () => {
          // Disconnecting wallet first because sometimes when is connected but the user is not connected
          if (isConnected) {
            disconnect()
          }
          openConnectModal?.()
        }}
        disabled={isConnecting}
      >
        {isConnecting ? 'Connecting...' : 'Connect your wallet'}
      </button>
    )
  }

  if (isConnected && !chain) {
    return (
      <button className="btn" onClick={openChainModal}>
        Wrong network
      </button>
    )
  }

  return (
    <div className="flex w-full max-w-5xl items-center justify-between">
      <div
        className="flex cursor-pointer items-center justify-center gap-x-2 rounded-xl border border-neutral-700 bg-neutral-800/30 px-4 py-2 font-mono font-bold"
        onClick={async () => openAccountModal?.()}
      >
        <div
          role="button"
          tabIndex={1}
          className="flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-full"
          style={{
            backgroundColor,
            boxShadow: '0px 2px 2px 0px rgba(81, 98, 255, 0.20)',
          }}
        >
          {emoji}
        </div>
        <p>Account</p>
      </div>
      <button className="btn" onClick={openChainModal}>
        Switch Networks
      </button>
    </div>
  )
}
