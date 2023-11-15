import { Inter } from 'next/font/google'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import {useAccount} from "wagmi"
import SwapSession from '@/components/qrLinkSession'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { isConnected } = useAccount();
  return (
    <div>
    <main
      className={`flex h-screen items-center justify-center ${inter.className}`}
    >
      <div className="flex flex-col items-center space-y-4">
        <h2 className="text-2xl font-bold">Atomic Swap</h2>
        <ConnectButton />
        {isConnected && <SwapSession/>}
      </div>
    </main>
    </div>
  )
}
