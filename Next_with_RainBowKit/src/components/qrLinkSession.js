import { useState , useEffect} from 'react';
import { QRCodeSVG } from 'qrcode.react';

function SwapSession() {
  const [sessionId, setSessionId] = useState(''); 
  const baseURL = 'https://AtomicSwap.com/swap';

  const generateSessionId = () => {
    console.log("Entered session id")
    const uniqueId = "22432424";
    setSessionId(uniqueId);
    console.log("Session Id is been set okay ")
  };

  const handleCopyClick = () => {
    if (sessionId) {
      navigator.clipboard.writeText(sessionURL);
      alert('Session URL copied to clipboard!');
    }
  };
  
useEffect(()=>{
  console.log("Session Id",sessionId);
},[sessionId])


  const sessionURL = sessionId ? `${baseURL}?session_id=${sessionId}` : '';

  return (
    <div className="flex flex-col items-center space-y-4">
      <button 
        className="bg-blue-500 text-white px-4 py-2 rounded" 
        onClick={generateSessionId}
      >
        Create Swap Session
      </button>
      {sessionId && (
        <>
          <QRCodeSVG value={sessionURL} />
          <p>
            Session URL:{' '}
            <a href={sessionURL} target="_blank" rel="noopener noreferrer">
              {sessionURL}
            </a>{' '}
            <span
              role="button"
              className="cursor-pointer text-blue-500"
              onClick={handleCopyClick}
            >
              (Copy)
            </span>
          </p>
        </>
      )}
    </div>
  );
}

export default SwapSession;
