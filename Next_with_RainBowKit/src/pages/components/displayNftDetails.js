import React from 'react';
import { useRouter } from 'next/router';

function NFTDisplayBox({session_id, userAddress, title}) {
  

  return (
    <div className="nft-display-box">
      <h2>You will receive</h2>
      <p><strong>Title:</strong> {title}</p>
      <p><strong>User Address:</strong> {userAddress}</p>
      <a href={`https://someblockexplorer.com/${session_id}`} target="_blank" rel="noopener noreferrer">
        View Session ID
      </a>
      <style jsx>{`
        .nft-display-box {
          border: 2px solid #ddd;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          margin: 20px 0;
          background-color: #f9f9f9;
        }
        h2 {
          color: #333;
          margin-bottom: 10px;
        }
        p {
          color: #555;
          margin: 5px 0;
        }
        a {
          display: inline-block;
          margin-top: 10px;
          color: #0077cc;
          text-decoration: none;
        }
        a:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}

export default NFTDisplayBox;
