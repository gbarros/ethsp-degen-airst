'use client';

import Image from 'next/image';
import logo from '../public/assets/icon.svg';
import WalletContext from '@/context/WalletContext';
import { useContext, useState } from 'react';
import ConnectWallet from './ConnectWallet';

const NavBar = () => {
	const { walletAddress, setWalletAddress, walletIsConnected, setWalletIsConnected } = useContext(WalletContext);

	return (
		<div className="flex justify-between font-semibold text-grey items-center my-6 mx-10 font-montserrat">
			<span className="flex justify-between items-center gap-14">
				<Image src={logo} alt="logo" width="200" height="200" />
			</span>
			
			<ConnectWallet
				walletAddress={walletAddress}
				setWalletAddress={setWalletAddress}
				walletIsConnected={walletIsConnected}
				setWalletIsConnected={setWalletIsConnected}
			/>
		</div>
	);
};

export default NavBar;
