// components/SimpleUI.js
import { ConnectButton } from "@rainbow-me/rainbowkit";
import React, { useState } from "react";
import { AiOutlineSwap } from "react-icons/ai";
import { useAccount } from "wagmi";

const AtomicSwapUI = () => {
  const {isConnected} = useAccount()
  const [showModal, setShowModal] = useState(false);
  const [amount, setAmount] = useState('');

  const handleConnect = () => {
    setShowModal(true);
  };

  const handleDisconnect = () => {
    // Implement disconnect logic if needed
    setShowModal(false);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleConfirm = () => {
    // Implement logic to handle the confirmed amount
    console.log('Amount confirmed:', amount);
    setShowModal(false);
  };
  const handleCopyLink = () => {
    // Implement copy link logic
    console.log("Link copied to clipboard");
  };

  return (
    <div className="flex h-screen bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
      {/* Left Side */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <ConnectButton accountStatus="address" chainStatus="icon" />
        {isConnected ? (
        <div>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-400"
            onClick={handleConnect}
          >
            Open Modal
          </button>

          {showModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
              <div className="bg-white p-4 rounded">
                <label className="block mb-2">Enter Amount:</label>
                <input
                  type="number"
                  value={amount}
                  onChange={handleAmountChange}
                  className="w-full p-2 mb-4 border rounded"
                />
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-400 mr-2"
                  onClick={handleConfirm}
                >
                  Confirm
                </button>
                <button
                  className="bg-gray-300 text-gray-800 py-2 px-4 rounded hover:bg-gray-400"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-400"
          onClick={onConnect}
        >
          Connect Wallet
        </button>
      )}
      </div>

      {/* Center */}
      <div className="w-12 flex flex-col items-center justify-center  p-6">
        <div className="bg-white p-2 rounded-full">
          <AiOutlineSwap size={30} color="#4A5568" />
        </div>
        <div className="flex flex-col space-y-4 mt-6">
          <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-400">
            Freeze
          </button>
          <button className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-400">
            Sign
          </button>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="mb-6">
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
              "https://yourwebsite.com/session/123456"
            )}&size=150x150`}
            alt="Demo QR Code"
          />
        </div>

        <div className="flex flex-col items-center space-y-2">
          <p className="text-sm font-semibold">Session Start Link:</p>
          <div className="flex items-center space-x-2">
            <span className="text-sm">
              https://yourwebsite.com/session/123456
            </span>
            <button
              className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-400"
              onClick={handleCopyLink}
            >
              Copy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AtomicSwapUI;
