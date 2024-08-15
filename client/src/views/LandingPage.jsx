import background from "../assets/bg-full.png"
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {

    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        if (username.trim()) {
            localStorage.setItem('username', username);
            navigate('/topic');
        }
    }

    return (

        <>
            <div className="relative">
                <img className="absolute inset-0 w-full h-full object-cover -z-50" src={background} alt="Background Image" />
                <div className="h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
                    <p className="font-bold text-neutral-700 text-3xl mb-5">
                        DiscHub
                    </p>

                    <p className="text-neutral-950 font-bold text-3xl sm:text-4xl lg:text-6xl text-center">
                        Connecting <br /> Thoughts, Building <br /> Communities.
                    </p>

                    <button onClick={() => document.getElementById('my_modal_1').showModal()} className="mt-12 py-3 px-5 text-md font-medium rounded-lg border bg-neutral-950 border-gray-200 text-white shadow-2xl relative h-12 overflow-hidden transition-all hover:shadow-neutral-700">
                        <p>Join Chat</p>
                    </button>

                    <dialog id="my_modal_1" className="modal">
                        <div className="bg-white modal-box p-6 max-w-sm mx-auto flex flex-col justify-center items-center">
                            <h3 className="font-bold text-lg text-neutral-950 text-center">Insert Your Name</h3>
                            <form onSubmit={handleLogin} className="w-full flex flex-col items-center">
                                <input onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Your Name" className="mt-5 input input-bordered w-full bg-white text-black text-center" />
                                <button type="submit" className="mt-5 w-full py-3 px-5 text-md font-medium rounded-lg border bg-neutral-900 border-gray-200 text-white shadow-2xl relative h-12 overflow-hidden transition-all hover:shadow-neutral-700">
                                    <p>Submit</p>
                                </button>
                            </form>
                        </div>
                    </dialog>
                </div>
            </div>


        </>
    )
}