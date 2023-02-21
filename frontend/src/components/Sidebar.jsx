import React from 'react'
import { NavLink, Link } from 'react-router-dom';
import { RiHomeFill } from 'react-icons/ri';
import { IoIosArrowForward } from 'react-icons/io';

import logo from '../assets/photara.png';
import { categories, ranking } from '../utils/data';

const isNotActiveStyle = 'flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize';
const isActiveStyle = 'flex items-center px-5 gap-3 font-extrabold border-r-2 border-black  transition-all duration-200 ease-in-out capitalize';

const Sidebar = ({ closeToggle, user }) => {

    const handleCloseSidebar = () => {
        if (closeToggle) closeToggle(false)
    }

    return (
        <div className="flex flex-col justify-between bg-white h-full overflow-y-scroll min-w-190 hide-scrollbar">
            <div className="flex flex-col">
                <Link
                    to="/"
                    className="flex px-5 gap-2 my-6 pt-1 w-190 items-center"
                    onClick={handleCloseSidebar}
                >
                    <img src={logo} alt="logo" className="w-full" />
                </Link>
                <div className="flex flex-col gap-5">
                    <h3 className="mt-2 px-5 text-base 2xl:text-xl font-bold">Leaderboard</h3>
                    {ranking.slice(0, ranking.length).map((rank) => (
                        <NavLink
                            to={`/`}
                            className={isNotActiveStyle}
                            onClick={handleCloseSidebar}
                            key={rank.name}
                        >
                            {rank.rank}
                            <img src={rank.image} className="w-12 h-12 rounded-full shadow-sm" />
                            {rank.name}
                        </NavLink>
                    ))}
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