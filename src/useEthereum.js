import { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import ABIFILE from './artifacts/contracts/BlockchainVoting.sol/BlockchainVoting.json';

const ABI = ABIFILE.abi;
const ContractAddress = '0x0fee2908afda3d25e876c05ed5a6b9e40c37d909';

const useEthereum = () => {
    const [account, setAccount] = useState('');
    const [contract, setContract] = useState(null);
    const [isConnected, setConnected] = useState(false);
    const [loading, setLoading] = useState(false);

    const connect = useCallback(async () => {
        setLoading(true);
        setLoading(true);
        try {
            if (window.ethereum) {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                setAccount(accounts[0]);
        
                // Update the provider to connect to the COSVM network
                const provider = new ethers.providers.JsonRpcProvider('https://rpc.cosvm.net'); // Replace with COSVM RPC endpoint
                const signer = provider.getSigner();
                const contract = new ethers.Contract(ContractAddress, ABI, signer);
                setContract(contract);
                setConnected(true);
                window.localStorage.setItem('Connected', 'injected');
            } else {
                alert('Ethereum wallet not detected. Please install MetaMask.');
            }
        } catch (error) {
            console.error('Error connecting to CosVM:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    const disconnect = useCallback(() => {
        setAccount('');
        setContract(null);
        setConnected(false);
        window.localStorage.removeItem('Connected');
    }, []);

    useEffect(() => {
        if (window.localStorage.getItem('Connected')) {
            connect();
        }
        // Add listener for account changes
        window.ethereum?.on('accountsChanged', (accounts) => {
            if (accounts.length > 0) {
                setAccount(accounts[0]);
            } else {
                disconnect();
            }
        });
        // Cleanup listener on unmount
        return () => {
            window.ethereum?.removeListener('accountsChanged', disconnect);
        };
    }, [connect, disconnect]);

    return { account, contract, isConnected, loading, connect, disconnect };
};

export default useEthereum;
