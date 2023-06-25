'use client';

import NavBar from '@/components/NavBar';
import './globals.css';
import WalletContext from '@/context/WalletContext';
import { useState } from 'react';

export default function RootLayout({ children }) {
	const [walletAddress, setWalletAddress] = useState('');
	const [walletIsConnected, setWalletIsConnected] = useState(false);
	const [tokenBalance, setTokenBalance] = useState(0);

	return (
		<html lang="en" className="scroll-smooth;">
			<head>
				<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet" />
			</head>
			<WalletContext.Provider value={{ walletAddress, setWalletAddress, walletIsConnected, setWalletIsConnected, tokenBalance, setTokenBalance }}>
				<body className="font-montserrat scroll-smooth">
					<NavBar />
					{children}
				</body>
			</WalletContext.Provider>
		</html>
	);
}
