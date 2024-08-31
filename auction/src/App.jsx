import './styles.css';
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import CreateAuction from './components/CreateAuction';
import AuctionList from './components/AuctionList';

function App() {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);

  const contractAddress = '0x95faF1425c6932E2D16c2FF42d6a4688827A03E1'; // Адрес контракта
  const contractABI = [
    {
      inputs: [],
      name: 'auctionCount',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      name: 'auctions',
      outputs: [
        {
          internalType: 'address payable',
          name: 'seller',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'startPrice',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'highestBid',
          type: 'uint256',
        },
        {
          internalType: 'address payable',
          name: 'highestBidder',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'endTime',
          type: 'uint256',
        },
        {
          internalType: 'bool',
          name: 'ended',
          type: 'bool',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '_auctionId',
          type: 'uint256',
        },
      ],
      name: 'bid',
      outputs: [],
      stateMutability: 'payable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '_startPrice',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: '_duration',
          type: 'uint256',
        },
      ],
      name: 'createAuction',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '_auctionId',
          type: 'uint256',
        },
      ],
      name: 'endAuction',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
  ];

  useEffect(() => {
    async function initializeProvider() {
      if (window.ethereum) {
        try {
          const web3Provider = new ethers.BrowserProvider(window.ethereum);
          setProvider(web3Provider);

          const signer = await web3Provider.getSigner();
          const contractInstance = new ethers.Contract(contractAddress, contractABI, signer);
          setContract(contractInstance);
        } catch (error) {
          console.error('Ошибка при инициализации контракта:', error);
        }
      } else {
        console.error('MetaMask не найден');
      }
    }

    initializeProvider();
  }, []);

  async function connectWallet() {
    if (provider) {
      try {
        await provider.send('eth_requestAccounts', []);
        const accounts = await provider.listAccounts();
        setAccount(accounts[0]);
      } catch (error) {
        console.error('Ошибка при авторизации:', error);
      }
    } else {
      console.error('Провайдер не инициализирован');
    }
  }

  return (
    <div>
      <button onClick={connectWallet}>
        {account ? `Connected: ${account}` : 'Connect Wallet'}
      </button>
      {!account && <p>Please connect your wallet to interact with the app.</p>}
      {account && contract && (
        <>
          <CreateAuction contract={contract} />
          <AuctionList contract={contract} />
        </>
      )}
    </div>
  );
}

export default App;
