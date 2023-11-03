import { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";
import { GoSignOut } from "react-icons/go";
import { useAuth } from "@/firebase/auth";
import { useRouter } from "next/router";
import Loader from "@/components/Loader";
import {
    collection,
    addDoc,
    getDocs,
    where,
    query,
    deleteDoc,
    updateDoc,
    doc,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

export default function Home() {
    const [todoInput, setTodoInput] = useState("");
    const [todos, setTodos] = useState([]);

    const { signOut, authUser, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !authUser) {
            router.push("/login");
        }
        if (!!authUser) {
            fetchTodos(authUser.uid);
        }
    }, [authUser, isLoading]);

    
    const fetchTodos = async (uid) => {
        try {
            const q = query(collection(db, "todos"), where("owner", "==", uid));

            const querySnapshot = await getDocs(q);

            let data = [];
            querySnapshot.forEach((todo) => {
                console.log(todo);
                data.push({ ...todo.data(), id: todo.id });
            });

            setTodos(data);
        } catch (error) {
            console.error("An error occured", error);
        }
    };

    const onKeyUp = (event) => {
        if (event?.key === "Enter" && todoInput?.length > 0) {
            addToDo();
        }
    };

    const addToDo = async () => {
        try {
           
            const docRef = await addDoc(collection(db, "todos"), {
                owner: authUser.uid,
                content: todoInput,
                completed: false,
            });

            
            fetchTodos(authUser.uid);

            
            setTodoInput("");
        } catch (error) {
            console.error("An error occured", error);
        }
    };

    const deleteTodo = async (docId) => {
        try {
           
            await deleteDoc(doc(db, "todos", docId));

            
            fetchTodos(authUser.uid);
        } catch (error) {
            console.error("An error occured", error);
        }
    };

    const makeAsCompleteHander = async (event, docId) => {
        try {
           
            const todoRef = doc(db, "todos", docId);

            
            await updateDoc(todoRef, {
                completed: event.target.checked,
            });

           
            fetchTodos(authUser.uid);
        } catch (error) {
            console.error("An error occured", error);
        }
    };

    return !authUser ? (
        <Loader />
    ) : (
        <main className="bg-zinc-800 h-[100vh] text-white overflow-hidden">
            <div
                className="bg-zinc-700 text-white w-44 py-4 mt-10 rounded-lg transition-transform hover:bg-black/[0.8] active:scale-90 flex items-center justify-center gap-2 font-medium  fixed bottom-5 right-5 cursor-pointer shadow-xl"
                onClick={signOut}
            >
                <GoSignOut size={18} />
                <span>Logout</span>
            </div>
            <div className="max-w-3xl mx-auto mt-10 p-8">
                <div className="  p-3 sticky top-0">
                    <div className="flex justify-center flex-col items-center">
                       
                        <h1 className="text-5xl md:text-6xl font-bold">
                            My Tasks
                        </h1>
                    </div>
                    <div className="flex items-center gap-2 mt-10 ">
                        <input
                            placeholder={` Hey ${authUser.username}, Enter your Task..`}
                            type="text"
                            className="font-semibold placeholder:text-gray-500 border-[2px] border-black h-[60px] grow shadow-sm rounded-xl px-4 focus-visible:outline-blue-400 text-lg transition-all duration-300 text-black"
                            autoFocus
                            value={todoInput}
                            onChange={(e) => setTodoInput(e.target.value)}
                            onKeyUp={(e) => onKeyUp(e)}
                        />
                        <button
                            className="w-[60px] h-[60px]  bg-zinc-950 flex justify-center items-center cursor-pointer transition-all duration-300 hover:bg-black/[0.8] hover:bg-zinc-700  rounded-xl"
                            onClick={addToDo}
                        >
                            <AiOutlinePlus size={30}  color="#fff" />
                        </button>
                    </div>
                </div>
                <div className="my-5 bg-zinc-700 p-5 rounded-xl shadow-2xl flex
                flex-col gap-2 ">
                    {todos.length > 0 &&
                        todos.map((todo) => (
                            <div
                                key={todo.id}
                                className="flex items-center justify-between "
                            >
                                <div className="flex items-center gap-3">
                                    <input
                                        id={`todo-${todo.id}`}
                                        type="checkbox"
                                        className="w-4 h-4 accent-green-400 rounded-lg"
                                        checked={todo.completed}
                                        onChange={(e) =>
                                            makeAsCompleteHander(e, todo.id)
                                        }
                                    />
                                    <label
                                        htmlFor={`todo-${todo.id}`}
                                        className={`font-medium ${
                                            todo.completed ? "line-through" : ""
                                        }`}
                                    >
                                        {todo.content}
                                    </label>
                                </div>

                                <div className="flex items-center gap-3">
                                    <MdDeleteForever
                                        size={24}
                                        className="text-red-400 hover:text-red-600 cursor-pointer"
                                        onClick={() => deleteTodo(todo.id)}
                                    />
                                </div>
                            </div>
                        ))}

                    {todos.length < 1 && (
                        <span className="text-center w-full block text-2xl font-medium text-gray-400  ">{`Add your tasks now..`}</span>
                    )}
                </div>
            </div>
        </main>
    );
}
