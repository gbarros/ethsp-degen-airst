import Image from 'next/image';
import howWorksPic from 'public/assets/how-works.svg';
import Link from 'next/link';

const HowItWorks = () => {
	return (
		<div className="flex flex-row justify-between" id="how-it-works">
			<Image className="my-[2%] mx-[4%]" src={howWorksPic} alt="logo" width="400" height="400" />

			<div className="my-[2%] mr-[4%] ">
				<h1 className="text-6xl font-bold mb-2 leading-tight">Building a better future</h1>
				<p className="my-[1%]">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sed facilisis diam. Praesent tincidunt lobortis turpis. In vehicula posuere iaculis. Nunc a metus eu turpis ultrices tincidunt sed sed metus.  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
				</p>
				<p className="my-[1%]">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sed facilisis diam. Praesent tincidunt lobortis turpis. In vehicula posuere iaculis. Nunc a metus eu turpis ultrices tincidunt sed sed metus.  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
				</p>
				<p className="my-[1%]">Join us and be part of this green revolution. Together, we can make a difference!</p>
				<button
					type="button"
					className="hover:bg-white px-4 py-2 rounded-full border-[1px] border-grey transition duration-300 ease-in-out w-44 font-semibold text-white bg-darkgreen hover:text-grey text-md"
					
				><Link href='/#best-sellers' >Create</Link>
					
				</button>
			</div>
		</div>
	);
};

export default HowItWorks;
