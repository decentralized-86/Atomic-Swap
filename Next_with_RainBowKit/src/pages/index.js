import { Inter } from 'next/font/google'
import { useState } from 'react';
import TokenSelector from '@/components/Tokenselector'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const handleAddAssetsClick = () => {
    setShowTokenSelector(true);
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <h2 className="text-2xl font-bold">Atomic Swap</h2>
        <TokenSelector />
      </div>
    </div>
  )
}
