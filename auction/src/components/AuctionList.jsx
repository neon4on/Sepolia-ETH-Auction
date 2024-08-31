import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

function AuctionList({ contract }) {
  const [auctions, setAuctions] = useState([]);

  useEffect(() => {
    async function loadAuctions() {
      if (contract) {
        try {
          const auctionCount = await contract.auctionCount();
          const auctionsArray = [];
          for (let i = 1; i <= auctionCount; i++) {
            const auction = await contract.auctions(i);
            auctionsArray.push(auction);
          }
          setAuctions(auctionsArray);
        } catch (error) {
          console.error('Ошибка при загрузке аукционов:', error);
        }
      }
    }
    loadAuctions();
  }, [contract]);

  return (
    <div>
      <h2>Active Auctions</h2>
      {auctions.length === 0 ? (
        <p>No auctions available</p>
      ) : (
        <ul>
          {auctions.map((auction, index) => (
            <li key={index}>
              <p>Seller: {auction.seller}</p>
              <p>Start Price: {ethers.utils.formatEther(auction.startPrice)} ETH</p>
              <p>Highest Bid: {ethers.utils.formatEther(auction.highestBid)} ETH</p>
              <p>Ends in: {auction.endTime.toString()}</p>
              <p>Status: {auction.ended ? 'Ended' : 'Active'}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AuctionList;
