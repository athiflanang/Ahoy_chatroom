import React from 'react';
import { Link } from 'react-router-dom';

const TopicSelection = () => {
    return (
        <div className="p-8 flex flex-col justify-center h-screen items-center w-screen">
            <h1 className="text-4xl font-bold mb-8">Select a Topic</h1>
            <div className="mb-8">
                <Link to="/anime">
                    <button className="mr-4 px-4 py-2 bg-blue-500 text-white rounded">
                        Anime
                    </button>
                </Link>
                <Link to="/film">
                    <button className="mr-4 px-4 py-2 bg-blue-500 text-white rounded">
                        Film
                    </button>
                </Link>
                <Link to="/game">
                    <button className="px-4 py-2 bg-blue-500 text-white rounded">
                        Game
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default TopicSelection;
