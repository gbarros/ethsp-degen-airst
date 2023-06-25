import { useEffect } from 'react';

const ConnectWallet = ({
    walletAddress,
    setWalletAddress,
    walletIsConnected,
    setWalletIsConnected
}) => {
    const connect = async () => {
        const { ethereum } = window;
        if (ethereum) {
            if (!walletIsConnected) {
                const accounts = await ethereum.request({
                    method: 'eth_requestAccounts'
                });
                setWalletAddress(accounts[0]);
                setWalletIsConnected(true);
            } else {
                ethereum.disconnect();
                setWalletIsConnected(false);
            }
        }
    };

    useEffect(() => {
        connect();
    }, []);

    return (
        <div className="relative">
            <button
                type="button"
                className="hover:bg-hover_grey px-4 py-2 rounded-full border-[1px] border-grey transition duration-300 ease-in-out"
                onClick={connect}
            >
                {walletIsConnected
                    ? 'Connected wallet: ' +
                      walletAddress.substring(0, 6) +
                      '...' +
                      walletAddress.substring(38, 42)
                    : 'Connect wallet'}
            </button>
        </div>
    );
};

export default ConnectWallet;
