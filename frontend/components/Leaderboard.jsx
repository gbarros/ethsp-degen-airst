'use client';

const Leaderboard = () => {
    return (
        <div
            className="bg-darkgreen w-full min-h-screen px-10"
            id="leaderboard"
        >
            <div className="pt-20 text-white w-[40%]">
                <h1 className="text-6xl font-bold">Best Sellers</h1>
                <p className="text-md mt-5">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Suspendisse sed facilisis diam. Praesent tincidunt lobortis
                    turpis.
                </p>
            </div>

            <div className="flex gap-5 justify-between w-full mt-8">
                <div
                    className="bg-white text-darkgreen px-20 py-10 rounded-md flex flex-col items-center justify-center relative btn"
                    onClick={() => window.my_modal_3.showModal()}
                >
                    <h1 className="font-bold text-lg absolute right-2 top-2 bg-lightgreen text-white w-9 h-9 flex justify-center items-center rounded-full">
                        1º
                    </h1>
                    <div className="flex flex-col">
                        <h3 className="font-bold text-lg text-center">
                            Collection 1
                        </h3>
                        <p>123 tokens emitted</p>
                    </div>
                </div>

                <dialog id="my_modal_3" className="modal">
                    <form method="dialog" className="modal-box">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                            ✕
                        </button>
                        <h3 className="font-bold text-lg">Collection Name</h3>
                        <p className="py-4">Description</p>
                        <div>
                            {/* if there is a button in form, it will close the modal */}
                            <button className="hover:bg-white px-4 py-2 rounded-full border-[1px] border-grey transition duration-300 ease-in-out w-44 font-semibold text-white bg-darkgreen hover:text-grey text-md" onClick={() => alert('OK')}>Mint</button>
                        </div>
                    </form>
                </dialog>

                <div
                    className="bg-white text-darkgreen px-20 py-10 rounded-md flex flex-col items-center justify-center relative btn"
                    onClick={() => window.my_modal_3.showModal()}
                >
                    <h1 className="font-bold text-lg absolute right-2 top-2 bg-lightgreen text-white w-9 h-9 flex justify-center items-center rounded-full">
                        2º
                    </h1>
                    <div className="flex flex-col">
                        <h3 className="font-bold text-lg text-center">
                            Collection 2
                        </h3>
                        <p>123 tokens emitted</p>
                    </div>
                </div>
                <div
                    className="bg-white text-darkgreen px-20 py-10 rounded-md flex flex-col items-center justify-center relative btn"
                    onClick={() => window.my_modal_3.showModal()}
                >
                    <h1 className="font-bold text-lg absolute right-2 top-2 bg-lightgreen text-white w-9 h-9 flex justify-center items-center rounded-full">
                        3º
                    </h1>
                    <div className="flex flex-col">
                        <h3 className="font-bold text-lg text-center">
                            Collection 3
                        </h3>
                        <p>123 tokens emitted</p>
                    </div>
                </div>
            </div>

            <div className="py-10">
                <div className="w-full flex items-center justify-between text-white mb-3">
                    <h2 className="text-3xl font-semibold" id="best-sellers">
                        Create your own
                        <span className="text-lightgreen"> AIDeGen NFT:</span>
                    </h2>
                </div>
                <div className=" flex justify-center">
                    <div className="bg-white w-[100%] h-[5%] rounded-md">
                        <form>
                            <div className="mx-4 my-4">
                                <div className="flex justify-center">
                                    <h3 className="md:font-bold mb-2">
                                        Select which plant species you want to
                                        mint a unique NFT:
                                    </h3>
                                </div>
                                <div className="flex justify-around">
                                    <div className="flex flex-col">
                                        <div className="flex items-center my-2">
                                            <input
                                                type="radio"
                                                name="radio-1"
                                                className="radio"
                                            />
                                            <label className="mx-2">
                                                Teste
                                            </label>
                                        </div>
                                        <div className="flex items-center my-2">
                                            <input
                                                type="radio"
                                                name="radio-1"
                                                className="radio"
                                            />
                                            <label className="mx-2">
                                                Teste
                                            </label>
                                        </div>
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="flex items-center my-2">
                                            <input
                                                type="radio"
                                                name="radio-1"
                                                className="radio"
                                            />
                                            <label className="mx-2">
                                                Teste
                                            </label>
                                        </div>
                                        <div className="flex items-center my-2">
                                            <input
                                                type="radio"
                                                name="radio-1"
                                                className="radio"
                                            />
                                            <label className="mx-2">
                                                Teste
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-center my-4">
                                <button
                                    type="button"
                                    className="hover:bg-white px-4 py-2 rounded-full border-[1px] border-grey transition duration-300 ease-in-out w-44 font-semibold text-white bg-darkgreen hover:text-grey text-md"
                                >
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

