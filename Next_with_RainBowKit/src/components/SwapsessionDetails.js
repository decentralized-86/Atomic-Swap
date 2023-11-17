import React from 'react';
import { useRouter } from 'next/router';
import NFTDisplayBox from './displayNftDetails';
import { useAccount } from 'wagmi';
import { Alchemy, Network } from "alchemy-sdk";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useState , useEffect } from 'react';

const config = {
  apiKey: "Jyuuy4MI_u6RLY8TlkGasdskg1CJeIhE", 
  network: Network.MATIC_MUMBAI,
};

const alchemy = new Alchemy(config);

function SwapSessionDetails() {
  const { address, isConnected } = useAccount();  
  const [nfts, setNfts] = useState([]);
  const [selectedNft, setSelectedNft] = useState(null);
  const [showNftSelector, setShowNftSelector] = useState(false);

  const router = useRouter();
  const { session_id, userAddress, title } = router.query;
   console.log("sessionId",session_id )
   console.log("userAddress",userAddress )
   console.log("title",title )

   
  const fetchNFTs = async (walletAddress) => {
    console.log("Fetching NFTs for address:", walletAddress);
    try {
      const nftData = await alchemy.nft.getNftsForOwner(walletAddress);
  
      const fetchedNfts = nftData.ownedNfts.map(nft => {
        const title = nft.name || `NFT ${nft.tokenId} from ${nft.contract.name}`;
  
        const image = nft.image?.gateway || 'default_image_url_here'; 
  
        return {
          address: nft.contract.address,
          tokenId: nft.tokenId,
          title: title,
          image: image
        };
      });
  
      console.log("Fetched NFTs:", fetchedNfts);
      setNfts(fetchedNfts);
    } catch (error) {
      console.error("Error fetching NFTs:", error);
    }
  };

  const handleNftSelect = (nft) => {
    console.log("Selected NFT:", nft);
    setSelectedNft(nft);
    setShowNftSelector(false);  
  };

  useEffect(() => {
    if (isConnected && address) {
      fetchNFTs(address);
    }
  }, [address, isConnected]);

  return (
    <div>
      <ConnectButton/>
      {isConnected ? (
        <div>
          <h2 className="text-lg font-semibold">Selected NFT</h2>
          {selectedNft && (
            <div className="bg-gray-200 p-2 my-1 rounded text-black">
              {selectedNft.title} - ID: {selectedNft.tokenId}
            </div>
          )}
          <button
            onClick={() => setShowNftSelector(true)}
            className="bg-blue-500 text-white px-4 py-2 mt-2 rounded hover:bg-blue-600"
          >
            Select NFT
          </button>
        </div>
      ) : (
        <p>Please connect your wallet</p>
      )}
      {showNftSelector && (
        <div className="absolute w-72 max-h-96 overflow-y-auto bg-white border border-gray-300 p-4 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold mb-2 text-black">Select an NFT for swap</h2>
          {nfts.map((nft) => (
            <div
              key={`${nft.address}-${nft.tokenId}`}
              onClick={() => handleNftSelect(nft)}
              className="p-2 border-b border-gray-300 cursor-pointer hover:bg-gray-100 text-black flex items-center"
            >
              <img src={nft.image} alt={nft.title} className="w-10 h-10 mr-2" />
              {nft.title}
            </div>
          ))}
        </div>
      )}
      <NFTDisplayBox session_id={session_id} userAddress={userAddress} title={title}/>
    </div>
  );
}

export default SwapSessionDetails;
