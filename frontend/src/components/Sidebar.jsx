import React from 'react'
import { NavLink, Link } from 'react-router-dom';
import { IoIosArrowForward } from 'react-icons/io';

import logo from '../assets/djx.png';
import { prizes, ranking, winners } from '../utils/data';

const buttonStyle = 'flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize';

const Sidebar = ({ closeToggle, user }) => {

    // close sidebar for mobile experience
    const handleCloseSidebar = () => {
        if (closeToggle) closeToggle(false)
    }

    return (
        <div className="flex flex-col justify-between bg-white h-full overflow-y-scroll min-w-190 hide-scrollbar">
            <div className="flex flex-col items-center justify-center">
                <Link
                    to="/"
                    className="flex px-5 gap-2 my-6 pt-1 w-190 items-center justify-center"
                    onClick={handleCloseSidebar}
                >
                    <img src={logo} alt="logo" className="w-full" />
                </Link>
                <div className="flex flex-col gap-5">
                    <div class="h-256 group">
                        <div class="flex flex-col overflow-hidden gap-3 h-10 duration-200  group-hover:h-96">
                            <Link to={`/winners`} className="flex gap-2 mt-2 items-center">
                                <h3 className="mt-2 px-5 text-base 2xl:text-xl font-bold">Last Quarter's Winners &#9662;</h3>
                            </Link>
                            {winners.slice(0, winners.length).map((winner) => (
                                <NavLink
                                    to={`/`}
                                    className={buttonStyle}
                                    onClick={handleCloseSidebar}
                                    key={winner.name}
                                >
                                    <img src={winner.image} className="w-11 h-11 rounded-full shadow-sm object-fit" alt="person" />
                                    {winner.name} | Grade: {winner.grade}
                                </NavLink>
                            ))}
                        </div>
                        <div className="flex flex-col overflow-hidden gap-3 h-10 duration-200  group-hover:h-96">
                            <h3 className="mt-3 px-5 text-base 2xl:text-xl font-bold">This Quarter's Prizes &#9662;</h3>
                            {prizes.slice(0, prizes.length).map((prize) => (
                                <NavLink
                                    to={`/`}
                                    className={buttonStyle}
                                    onClick={handleCloseSidebar}
                                    key={prize.name}
                                >
                                    <img src={prize.image} className="w-11 h-11 rounded-full shadow-sm object-fit" alt="person" />
                                    {prize.name} | {prize.points}
                                </NavLink>
                            ))}
                        </div>
                        <div className="flex flex-col gap-3 duration-200 h-100 group-hover:h-100">
                            <h3 className="mt-2 px-5 text-base 2xl:text-xl font-bold">Leaderboard</h3>
                            {ranking.slice(0, 10).map((rank) => (
                                <NavLink
                                    to={`/`}
                                    className={buttonStyle}
                                    onClick={handleCloseSidebar}
                                    key={rank.name}
                                >
                                    {rank.rank}
                                    <img src={rank.image} className="w-11 h-11 rounded-full shadow-sm object-fit" alt="person" />
                                    {rank.name} | {rank.points}
                                </NavLink>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {user && (
                <Link
                    to={`user-profile/${user._id}`}
                    className="flex my-5 mb-3 gap-2 p-2 items-center bg-white rounded-lg shadow-lg mx-3"
                    onClick={handleCloseSidebar}
                >
                    <img src={user.image} className="w-10 h-10 rounded-full" alt="user-profile" />
                    <p>{user.userName}</p>
                    <IoIosArrowForward />
                </Link>
            )}
        </div>
    )
}

export default Sidebar