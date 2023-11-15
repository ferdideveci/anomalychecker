// pages/index.js

"use client"

import { useEffect, useState } from 'react';

const fetchTokens = async () => {
  try {
    const options = {
      method: 'GET',
      headers: {
        accept: '*/*',
        'x-api-key': 'b222ec2a-a8a2-5128-8731-250249ac141b',
      },
    };

    const response = await fetch('https://api.reservoir.tools/tokens/v6?collection=0x7a31c6726f358fad0783110a46ef489372fbfc65', options);
    const data = await response.json();
    return data; // Return the token data
  } catch (error) {
    console.error('Error fetching tokens:', error);
    return null;
  }
};

const Home = () => {
  const [tokens, setTokens] = useState([]);

  useEffect(() => {
    const loadTokens = async () => {
      const tokenData = await fetchTokens();
      if (tokenData) {
        setTokens(tokenData.tokens); // Assuming the API response has a "tokens" property
      }
    };
    loadTokens();
  }, []);

  return (
    <div>
      <h1>Anomaly AI NFT Collection Tokens</h1>
      <ul>
        {tokens.map((token) => (
          <li key={`${token.contract}-${token.tokenId}`}>
            {/* Customize how you want to display each token */}
            Token ID: {token.tokenId}, Name: {token.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
