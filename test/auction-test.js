const { expect } = require('chai');

describe('Auction', function () {
  it('Should create an auction and allow bidding', async function () {
    const Auction = await ethers.getContractFactory('Auction');
    const auction = await Auction.deploy();
    await auction.deployed();

    await auction.createAuction(ethers.utils.parseEther('1'), 60);

    const auctionItem = await auction.auctions(1);
    expect(auctionItem.startPrice.toString()).to.equal(ethers.utils.parseEther('1').toString());

    await auction.bid(1, { value: ethers.utils.parseEther('1.5') });

    const updatedAuction = await auction.auctions(1);
    expect(updatedAuction.highestBid.toString()).to.equal(
      ethers.utils.parseEther('1.5').toString(),
    );
  });
});
