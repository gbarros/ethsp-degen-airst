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
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sed facilisis diam. Praesent tincidunt lobortis turpis. In vehicula posuere iaculis. Nunc a metus eu turpis ultrices tincidunt sed sed metus.  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
				</p>
			</div>
			<div className="flex flex-col justify-start mt-4 flex-1 ml-12 gap-6">
				<p className="text-md">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sed facilisis diam. Praesent tincidunt lobortis turpis. In vehicula posuere iaculis. Nunc a metus eu turpis ultrices tincidunt sed sed metus.  Lorem ipsum dolor sit amet, consectetur adipiscing elit.{' '}
				</p>
				<button
					type="button"
					className="hover:bg-white px-4 py-2 rounded-full border-[1px] border-grey transition duration-300 ease-in-out w-44 font-semibold text-white bg-darkgreen hover:text-grey text-md"
					
				><Link href='/#best-sellers' >Create</Link>
					
				</button>
			</div>
		</div>
	);
};

export default Home;
