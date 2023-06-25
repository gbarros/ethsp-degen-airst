import Home from '@/components/Home';
import Image from 'next/image';
import logo from 'public/assets/home-logo.svg';
import heroPic from '/public/assets/home-img.svg';
import Leaderboard from '@/components/Leaderboard';
import HowItWorks from '@/components/HowItWorks';

export default function LandingPage() {
    return (
        <div className="w-full overflow-hidden scroll-smooth	">
            <Home id="home" />
            <Image
                src={logo}
                alt="logo"
                className="absolute -z-10 right-0 top-[38%] overflow-hidden"
            />
            <Image
                src={heroPic}
                alt="home-bg"
                className="absolute w-[50%] right-24 top-[62vh]"
            />
            <Leaderboard id="best-sellers" />
            <HowItWorks id="how-it-works" />
        </div>
    );
}
