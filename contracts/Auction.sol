// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Auction {
    struct AuctionItem {
        address payable seller;
        uint startPrice;
        uint highestBid;
        address payable highestBidder;
        uint endTime;
        bool ended;
    }

    mapping(uint => AuctionItem) public auctions;
    uint public auctionCount;

    function createAuction(uint _startPrice, uint _duration) public {
        auctionCount++;
        auctions[auctionCount] = AuctionItem({
            seller: payable(msg.sender),
            startPrice: _startPrice,
            highestBid: 0,
            highestBidder: payable(address(0)),
            endTime: block.timestamp + _duration,
            ended: false
        });
    }

    function bid(uint _auctionId) public payable {
        AuctionItem storage auction = auctions[_auctionId];
        require(block.timestamp < auction.endTime, "Auction already ended");
        require(msg.value > auction.highestBid, "There already is a higher bid");

        if (auction.highestBidder != address(0)) {
            auction.highestBidder.transfer(auction.highestBid);
        }

        auction.highestBidder = payable(msg.sender);
        auction.highestBid = msg.value;
    }

    function endAuction(uint _auctionId) public {
        AuctionItem storage auction = auctions[_auctionId];
        require(block.timestamp >= auction.endTime, "Auction not yet ended");
        require(!auction.ended, "Auction already ended");

        auction.ended = true;
        auction.seller.transfer(auction.highestBid);
    }
}
