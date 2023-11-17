import { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import sha256 from 'crypto-js/sha256';

function SwapSession({ userAddress, tokenContractAddress , tokenId ,title}) {
  const [sessionId, setSessionId] = useState('');
  const [sessionURL, setSessionURL] = useState(''); 
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const baseURL = 'http://localhost:3000/swap';

  const generateSessionId = () => {
    if (!userAddress || !tokenContractAddress || !tokenId) {
      setError("Invalid token or user information.");
      return;
    }

    setIsLoading(true);
    console.log("Generating session ID...");

    try {
      const uniqueId = sha256(`${userAddress}-${tokenContractAddress}-${tokenId}-${Date.now()}`).toString();
      setSessionId(uniqueId);
      console.log("Session ID set:", uniqueId);
      const sessionURL = `${baseURL}?session_id=${uniqueId}&userAddress=${encodeURIComponent(userAddress)}&title=${encodeURIComponent(title)}`;
      setSessionURL(sessionURL);

    } catch (e) {
      console.error("Error generating session ID:", e);
      setError("Failed to generate session ID.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyClick = () => {
    if (sessionURL) { 
      navigator.clipboard.writeText(sessionURL)
        .then(() => alert('Session URL copied to clipboard!'))
        .catch(() => setError('Failed to copy URL to clipboard.'));
    }
  };

  useEffect(() => {
    if (error) {
      alert(error);
      setError('');
    }
  }, [error]);

  return (
    <div className="flex flex-col items-center space-y-4">
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={generateSessionId}
        disabled={isLoading}
      >
        {isLoading ? "Creating Session..." : "Create Swap Session"}
      </button>

      {sessionId && (
        <>
          <QRCodeSVG value={sessionURL} />

          <div>
            Session URL:
            <a href={sessionURL} target="_blank" rel="noopener noreferrer">
              {sessionURL}
            </a>
            <span
              role="button"
              className="cursor-pointer text-blue-500"
              onClick={handleCopyClick}
            >
              (Copy)
            </span>
          </div>
        </>
      )}

      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}

export default SwapSession;
