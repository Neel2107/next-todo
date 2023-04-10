import { useEffect } from "react";
import { useRouter } from "next/router";
import { AiOutlinePlus } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
const arr = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
];

export default function Home() {
    const route = useRouter();
    useEffect(() => {
        route.push("/login");
    }, []);
    return (
        <main className="">
            <div className="max-w-xl mx-auto mt-10">
                <div className="bg-white -m-6 p-3 sticky top-0">
                    <div className="flex flex-col items-center gap-5">
                        <img src="/todo-banner.jpg" className="w-[400px]" />
                    </div>
                    <div className="flex items-center gap-2 mt-10">
                        <input
                            placeholder="What to do Today?"
                            type="text"
                            className="font-medium border-[2px] border-black h-[60px] grow shadow-sm rounded-md px-4 focus-visible:outline-yellow-400 placeholder:text-black text-lg transition-all duration-300"
                            autoFocus
                        />
                        <button className="w-[60px] h-[60px] rounded-md bg-black flex justify-center items-center cursor-pointer transition-all duration-300 hover:bg-black/[0.8]">
                            <AiOutlinePlus size={30} color="#fff" />
                        </button>
                    </div>
                </div>
                <div className="my-10">
                    {arr.map((todo, index) => (
                        <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center gap-3">
                                <input
                                    id={`todo-${index}`}
                                    type="checkbox"
                                    className="w-4 h-4 accent-green-400 rounded-lg"
                                />
                                <label
                                    htmlFor={`todo-${index}`}
                                    className="font-medium"
                                >
                                    This is my first todo
                                </label>
                            </div>

                            <div className="flex items-center gap-3">
                                <FaEdit
                                    size={18}
                                    className="text-green-400 cursor-pointer"
                                />
                                <MdDeleteForever
                                    size={22}
                                    className="text-red-400 cursor-pointer"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
