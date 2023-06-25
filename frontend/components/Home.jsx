import Link from 'next/link';

const Home = () => {
	return (
		<div id="home" className="flex my-16 mx-10">
			<div className="flex flex-col justify-center w-[40%]">
				<h1 className="text-6xl font-bold mb-2 leading-tight">
					Change the
					<br />
					world creating
					<br />
					NFT's with IA
				</h1>
				<p className="text-md mt-5">
				The money raised from the sale of these NFTs will be directed to Non-Governmental Organizations (NGOs), thus promoting support for initiatives related to the Sustainable Development Goals.
				</p>
			</div>
			<div className="flex flex-col justify-start mt-4 flex-1 ml-12 gap-6">
				<p className="text-md">
				Our project aims to leverage the current interest and popularity of NFTs to generate positive social impact. Our NFT generation solution is powered by an AI model that converts text into high-quality images. These images will be unique to each NFT, ensuring the authenticity and rarity of the digital assets.{' '}
				</p>
				<button
					type="button"
					className="hover:bg-white px-4 py-2 rounded-full border-[1px] border-grey transition duration-300 ease-in-out w-44 font-semibold text-white bg-darkgreen hover:text-grey text-md"
					
				><Link href='/#best-sellers'>Create</Link>
					
				</button>
			</div>
		</div>
	);
};

export default Home;
