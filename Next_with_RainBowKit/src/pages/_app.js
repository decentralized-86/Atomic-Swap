import "@/styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import {
  mainnet,
  polygonMumbai,
  polygon,
  optimism,
  arbitrum,
  base,
  zora,
} from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { useEffect, useState } from "react";
const { chains, publicClient } = configureChains(
  [mainnet, polygon, optimism, arbitrum, base, zora,polygonMumbai],
  [
    alchemyProvider({ apiKey: "https://polygon-mumbai.g.alchemy.com/v2/jHsyHSa62ulp2KmhwSFfpz8dsvCOwcMP" }),
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  projectId: "331afab9d25e6a69aedae6619a61faf1",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

export default function App({ Component, pageProps }) {
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    setIsReady(!isReady);
  }, []);
  return (
    <>
      {isReady ? (
        <WagmiConfig config={wagmiConfig}>
          <RainbowKitProvider chains={chains}>
            <Component {...pageProps} />
          </RainbowKitProvider>
        </WagmiConfig>
      ) : null}
    </>
  );
}
