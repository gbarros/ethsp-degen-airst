'use client';

const Leaderboard = () => {
        
   return (
        <div
            className="bg-darkgreen w-full min-h-screen px-10"
            id="leaderboard">

            <div className="pt-20 text-white w-[40%]">
                <h1 className="text-6xl font-bold">Best Sellers</h1>
                <p className="text-md mt-5">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sed facilisis diam. Praesent tincidunt lobortis turpis.  
                </p>
            </div>

            <div className="flex gap-5 justify-between w-full mt-8">

                <div className="bg-white text-darkgreen px-20 py-10 rounded-md flex flex-col items-center justify-center relative">
                <h1 className="font-bold text-lg absolute right-2 top-2 bg-lightgreen text-white w-9 h-9 flex justify-center items-center rounded-full">1</h1>
                <h3 className="font-bold text-lg text-center">Manu's company</h3>
                <p>123 tokens</p>
                </div>

                <div className="bg-white text-darkgreen px-20 py-10 rounded-md flex flex-col items-center justify-center relative">
                <h1 className="font-bold text-lg absolute right-2 top-2 bg-lightgreen text-white w-9 h-9 flex justify-center items-center rounded-full">aa</h1>
                <h3 className="font-bold text-lg text-center">Manu's company</h3>
                <p>aa</p>
                </div>

                <div className="bg-white text-darkgreen px-20 py-10 rounded-md flex flex-col items-center justify-center relative">
                <h1 className="font-bold text-lg absolute right-2 top-2 bg-lightgreen text-white w-9 h-9 flex justify-center items-center rounded-full">aa</h1>
                <h3 className="font-bold text-lg text-center">Manu's company</h3>
                <p>aa</p>
                </div>
            </div>
            
            <div className="py-10">
                <div className="w-full flex items-center justify-between text-white mb-3">
                    <h2 className="text-3xl font-semibold">Create your own AIDeGen NFT</h2>
                    
                </div>
                <div className=" flex justify-center">
                    <div className="bg-white w-[100%] h-[5%] rounded-md">
                        <form>
                            
                            <div className="mx-4 my-4">
                                <p>Select the attributes you want in your NFT:</p>
                                <div className="flex flex-col">
                                    <input type="checkbox" aria-label="Checkbox" className="btn" />

                                    <div>
                                        <input type="checkbox" />
                                        <label>Info</label>
                                    </div>
                                    <div>
                                        <input type="checkbox" />
                                        <label>Info</label>
                                    </div>
                                    <div>
                                        <input type="checkbox" />
                                        <label>Info</label>
                                    </div>
                                    

                                    
                                </div>
                                
                            </div>
                            <div className="flex justify-center my-4">
                                <button 
                                type="button"
                                className="hover:bg-white px-4 py-2 rounded-full border-[1px] border-grey transition duration-300 ease-in-out w-44 font-semibold text-white bg-darkgreen hover:text-grey text-md">
                                Create
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                
            </div> 
        </div>
    );
};

export default Leaderboard;
