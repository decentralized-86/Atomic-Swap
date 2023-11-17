import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const SwapSessionPage = () => {
  const router = useRouter();
  const { session_id } = router.query;
  const [sessionData, setSessionData] = useState(null);

  useEffect(() => {
    if (session_id) {
      console.log('Session ID:', session_id);
      const fetchedData = {
        userAddress: '0xUserAddress...',
        tokenContractAddress: '0xTokenContract...',
        tokenId: '123',
        swapDetails: 'Details about the swap...'
      };
      setSessionData(fetchedData);
    }
  }, [session_id]);

  if (!sessionData) {
    return <div className="flex justify-center items-center h-screen">
             <p>Loading session data...</p>
           </div>;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Swap Session Details</h1>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            User Address
          </label>
          <p className="text-gray-600">{sessionData.userAddress}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Token Contract Address
          </label>
          <p className="text-gray-600">{sessionData.tokenContractAddress}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Token ID
          </label>
          <p className="text-gray-600">{sessionData.tokenId}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Swap Details
          </label>
          <p className="text-gray-600">{sessionData.swapDetails}</p>
        </div>
      </div>
    </div>
  );
};

export default SwapSessionPage;
