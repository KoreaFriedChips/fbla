import React from 'react'
import { NavLink, Link } from 'react-router-dom';

import { ranking } from '../utils/data';

const Winners = () => {
    return (
        <div className="relative pb-2 h-full justify-center items-center">
            <div className="flex flex-col pb-5">
                <div className="relative flex flex-col mb-7">
                    <div className="flex flex-col justify-center items-center">
                        <img
                            className=" w-full h-370 2xl:h-510 shadow-lg object-cover"
                            src="https://source.unsplash.com/1600x900/?nature,photography,technology"
                            alt="user-pic"
                        />
                    </div>
                    <div>
                        <h1 className="font-bold text-3xl text-center mt-3">
                            Monthly Report
                        </h1>
                    </div>
                    <div className="flex flex-row space-between justify-evenly items-center">
                        <p className='font-bold text-xl mt-3 text-center'>Grade 9</p>
                        <p className='font-bold text-xl mt-3 text-center'>Grade 10</p>
                        <p className='font-bold text-xl mt-3 text-center'>Grade 11</p>
                        <p className='font-bold text-xl mt-3 text-center'>Grade 12</p>
                    </div>
                    <div className='flex flex-wrap justify-center'>
                        {ranking.slice(0, ranking.length).map((rank) => (
                            <NavLink
                                to={`/`}
                                className={'flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize mt-3 mr-3'}
                                key={rank.name}
                            >
                                <img src={rank.image} className="w-11 h-11 rounded-full shadow-sm object-fit" />
                                {rank.name} | {rank.points}
                            </NavLink>
                        ))}
                    </div>
                    {/* select random winner with wheel animation + notification pop up */}
                </div>
            </div>

        </div>
    )

}

export default Winners