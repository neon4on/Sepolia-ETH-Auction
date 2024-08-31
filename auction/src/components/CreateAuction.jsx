import React, { useState } from 'react';
import { ethers } from 'ethers';

function CreateAuction({ contract }) {
  const [startPrice, setStartPrice] = useState('');
  const [duration, setDuration] = useState('');

  const handleCreateAuction = async () => {
    try {
      const priceInWei = ethers.utils.parseEther(startPrice);
      const transaction = await contract.createAuction(priceInWei, duration);
      await transaction.wait();
      alert('Аукцион создан!');
    } catch (error) {
      console.error('Ошибка при создании аукциона:', error);
    }
  };

  return (
    <div>
      <h2>Create Auction</h2>
      <input
        type="text"
        placeholder="Start Price (ETH)"
        value={startPrice}
        onChange={(e) => setStartPrice(e.target.value)}
      />
      <input
        type="text"
        placeholder="Duration (seconds)"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
      />
      <button onClick={handleCreateAuction}>Create Auction</button>
    </div>
  );
}

export default CreateAuction;
