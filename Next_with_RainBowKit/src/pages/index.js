import { Inter } from "next/font/google";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import SwapSession from "@/components/qrLinkSession";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    const dummyData = [
        {
            name: "Name",
            amount: 1000,
        },
        {
            name: "Name",
            amount: 1000,
        },
    ];
    const { isConnected } = useAccount();
    return (
        <div>
            <main
                className={`flex h-screen items-center justify-center ${inter.className}`}
            >
                <div className=" fixed left-1/2 text-center -translate-x-1/2 top-8 mb-6 font-bold">
                    <span className="my-6 text-2xl block">Atomic Swap</span>
                    <ConnectButton />
                </div>
                <div className="flex gap-12 items-center space-y-4">
                    <div id="send" className="flex flex-col gap-2 w-[15rem]">
                        <h2 className="text-2xl text-center mb-6 font-bold">
                            You'll send
                        </h2>
                        {dummyData.length > 0 ? (
                            <div className="flex flex-col gap-2">
                                {dummyData.map((item, index) => (
                                    <div
                                        key={index}
                                        className="bg-slate-800 flex justify-between gap-2 p-3 rounded-lg px-4"
                                    >
                                        <div className="flex gap-1">
                                            <p>✔</p>
                                            <p>{item.name}</p>
                                        </div>
                                        <div className="flex gap-3">
                                            <p className="bg-blue-500 rounded-md p-1 px-2 text-xs">
                                                {item.amount}
                                            </p>
                                            <button className="text-red-500">
                                                x
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>Nothing to show here</p>
                        )}
                        <button className="bg-blue-500 px-5 p-2 mt-6 rounded-lg">
                            Add asset
                        </button>
                    </div>

                    <div className="text-center max-w-[400px] flex flex-col gap-8 justify-center items-center">
                        {isConnected && <SwapSession />}
                    </div>

                    <div id="send" className="flex flex-col gap-2 w-[15rem]">
                        <h2 className="text-2xl text-center mb-6 font-bold">
                            You'll Recieve
                        </h2>
                        <div className="flex flex-col gap-2">
                            {dummyData.map((item, index) => (
                                <div
                                    key={index}
                                    className="bg-slate-800 flex justify-between gap-2 p-3 rounded-lg px-4"
                                >
                                    <div className="flex gap-1">
                                        <p>✔</p>
                                        <p>{item.name}</p>
                                    </div>
                                    <div className="flex gap-3">
                                        <p className="bg-blue-500 rounded-md p-1 px-2 text-xs">
                                            {item.amount}
                                        </p>
                                        <button className="text-red-500">
                                            x
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="bg-blue-500 px-5 p-2 mt-6 rounded-lg">
                            Add asset
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}
