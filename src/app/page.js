// pages/index.js

import { useEffect } from 'react';

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
    console.log(data); // Log the token data to the console
  } catch (error) {
    console.error('Error fetching tokens:', error);
  }
};

const Home = () => {
  useEffect(() => {
    fetchTokens();
  }, []);

  return (
    <div>
      <h1> Test </h1>
    </div>
  );
};

export default Home;
