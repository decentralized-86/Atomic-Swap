import { Inter } from "next/font/google";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
// import SwapSession from "@/components/qrLinkSession";
import AtomicSwapUI from "./components/AtomicSwapUI";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { isConnected } = useAccount();
  return (
<div className="min-h-screen bg-gray-100">
      <header className="bg-blue-500 text-white text-center py-4">
        <h1 className="text-2xl font-bold">Atomic Swap</h1>
      </header>
      <main>
        <AtomicSwapUI />
      </main>
    </div>
  );
}
