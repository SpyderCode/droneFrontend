import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { IoList, IoLogIn, IoAddCircle, IoLogOut, IoPerson, IoPersonAdd } from "react-icons/io5";

export default function Navbar() {
    const { isAuthenticated, logout, user } = useAuth();
    return (
        <nav className="bg-zinc-700 my-3 flex justify-between py-5 px-10 rounded-lg">
            <Link to= {
                isAuthenticated ? '/products' : '/'
            }>
                <h1 className="text-2xl font-bold">Sistema de Productos</h1>
            </Link>

            <ul className="flex gap-x-2">
                {isAuthenticated ? (
                    <>
                        <li>
                            <div className="flex mx-3 px-3 items-start">
                                <IoPerson size={30}/>
                                {user.username}
                            </div>
                            
                        </li>
                        <li>
                            <Link className="bg-zinc-500 rounded-sm" to="/add-products"> 
                                <IoAddCircle size={30}/>
                            </Link>
                        </li>
                        <li>
                            <Link className="bg-zinc-500 rounded-sm" to="/products">
                                <IoList size={30}/>
                            </Link>
                        </li>
                        <li>
                            <Link className="bg-zinc-500 rounded-sm" to="/" onClick={() => { logout() }}>
                                <IoLogOut size={30}/>
                            </Link>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link className="bg-zinc-500 rounded-sm" to="/login"> 
                                <IoLogIn size={30}/>
                            </Link>
                        </li>
                        <li>
                            <Link className="bg-zinc-500 rounded-sm" to="/register"> 
                                <IoPersonAdd size={30}/>
                            </Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
}
