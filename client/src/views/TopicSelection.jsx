import React from 'react';
import { Link } from 'react-router-dom';
import japan from "../assets/japan.png"
import film from "../assets/film.png"
import game from "../assets/game.png"

const TopicSelection = () => {
    return (
        <div className="p-4 md:p-8 flex flex-col justify-center items-center h-screen w-screen bg-white">
            <h1 className="text-3xl md:text-4xl text-neutral-950 font-bold mb-6 md:mb-8">Select a Topic</h1>
            <div className="w-full max-w-4xl">
                <div className="flex flex-wrap justify-center gap-4">
                    <Link to="/anime">
                        <button className="flex flex-col items-center hover:-translate-y-3 transition-all duration-500 px-6 py-4 bg-white border border-neutral-300 rounded-lg text-neutral-950 w-full sm:w-80">
                            <img className='h-8 mb-2' src={japan} alt="Anime" />
                            <p className='text-neutral-950 font-bold text-lg md:text-2xl mb-2 text-center'>
                                Anime
                            </p>
                            <p className='text-neutral-500 font-medium text-center'>
                                Anime is Japanese animation <br /> with distinctive art and varied <br /> themes.
                            </p>
                        </button>
                    </Link>
                    <Link to="/film">
                        <button className="flex flex-col items-center hover:-translate-y-3 transition-all duration-500 px-6 py-4 bg-white border border-neutral-300 rounded-lg text-neutral-950 w-full sm:w-80">
                            <img className='h-8 mb-2' src={film} alt="Film" />
                            <p className='text-neutral-950 font-bold text-lg md:text-2xl mb-2 text-center'>
                                Film
                            </p>
                            <p className='text-neutral-500 font-medium text-center'>
                                A film is a story told <br /> through moving images <br /> and sound.
                            </p>
                        </button>
                    </Link>
                    <Link to="/game">
                        <button className="flex flex-col items-center hover:-translate-y-3 transition-all duration-500 px-6 py-4 bg-white border border-neutral-300 rounded-lg text-neutral-950 w-full sm:w-80">
                            <img className='h-8 mb-2' src={game} alt="Game" />
                            <p className='text-neutral-950 font-bold text-lg md:text-2xl mb-2 text-center'>
                                Game
                            </p>
                            <p className='text-neutral-500 font-medium text-center'>
                                A game is an interactive <br /> activity with rules and goals <br /> for entertainment.
                            </p>
                        </button>
                    </Link>
                </div>
            </div>
        </div>

    );
};

export default TopicSelection;
