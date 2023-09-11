import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="w-full h-full flex items-center text-black justify-center flex-col gap-5">
            <h1 className="text-4xl font-bold leading-4">Home page</h1>
            <div className="flex gap-4 ">
                <div className="border rounded-md px-4 py-2 cursor-pointer">
                    <Link to="/signup">Signup</Link>
                </div>
                <div className="border rounded-md px-4 py-2 cursor-pointer">
                    <Link to="/login">Login</Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
