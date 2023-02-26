import React from 'react'
import { Link, useNavigate, NavLink } from 'react-router-dom';
import { IoMdAdd, IoMdSearch } from 'react-icons/io';
import { categories } from '../utils/data';


const isNotActiveStyle = 'flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize';
const isActiveStyle = 'flex items-center px-5 gap-3 font-extrabold border-r-2 border-black  transition-all duration-200 ease-in-out capitalize';

// navigation bar contains categories and search bar for easily finding events
const Navbar = ({ searchTerm, setSearchTerm, user }) => {

    const navigate = useNavigate()
    if (!user)
        return null

    if (user.admin) {
        return (
            <div className="relative pb-2 h-full justify-center items-center">
                <div className="flex flex-col">
                    <div className="relative flex flex-col mb-2">
                        <div className="flex flex-col justify-center items-center">
                            <img
                                className=" w-full h-370 2xl:h-510 shadow-lg object-cover"
                                src="https://source.unsplash.com/1600x900/?nature,photography"
                                alt="user-pic"
                            />
                        </div>
                        {/* <div className="absolute top-0 z-1 left-0 p-5 invisible md:visible">
                            <Link
                                to="/"
                                className="flex px-2  w-190 items-center"
                            >
                                <img src={logo} alt="logo" className="w-full" />
                            </Link>
                        </div> */}
                    </div>
                    <div className="">
                        <div className="overflow-x-auto flex flex-row justify-around mt-5 px-3 visible ">
                            {categories.slice(0, categories.length).map((category) => (
                                <NavLink
                                    to={`/category/${category.name}`}
                                    className={isNotActiveStyle}
                                    key={category.name}
                                >
                                    <img src={category.image} className="w-12 h-12 rounded-full shadow-sm object-contain" alt="category" />
                                    {category.name}
                                </NavLink>
                            ))}
                        </div>
                    </div>

                    <div className="px-2 md:px-5 flex  gap-2 md:gap-5 w-full mt-5 mb-5">

                        <div className="flex justify-start items-center w-full px-2 rounded-md bg-white border-none outline-none focus-within:shadow-sm">

                            <IoMdSearch fontSize={21} className="ml-1" />
                            <input
                                type="text"
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search"
                                value={searchTerm}
                                onFocus={() => navigate('/search')}
                                className="p-2 w-full bg-white outline-none"
                            />
                        </div>
                        <div className="flex gap-3 ">
                            <Link to={`user-profile/${user?._id}`} className="hidden md:block">
                                <img src={user.image} alt="user-pic" className="w-14 h-12 rounded-lg " />
                            </Link>
                            <Link to="/create-pin" className="bg-black text-white rounded-lg w-12 h-12 md:w-14 md:h-12 flex justify-center items-center">
                                <IoMdAdd />
                            </Link>
                        </div>
                    </div>
                </div>

            </div>

        )
    } else {
        return (
            <div className="relative pb-2 h-full justify-center items-center">
                <div className="flex flex-col">
                    <div className="relative flex flex-col mb-2">
                        <div className="flex flex-col justify-center items-center">
                            <img
                                className=" w-full h-370 2xl:h-510 shadow-lg object-cover"
                                src="https://source.unsplash.com/1600x900/?nature,photography"
                                alt="user-pic"
                            />
                        </div>
                        {/* <div className="absolute top-0 z-1 left-0 p-5 invisible md:visible">
                            <Link
                                to="/"
                                className="flex px-2  w-190 items-center"
                            >
                                <img src={logo} alt="logo" className="w-full" />
                            </Link>
                        </div> */}
                    </div>
                    <div className="">
                        <div className="overflow-x-auto flex flex-row mt-5 px-3">
                            {categories.slice(0, categories.length).map((category) => (
                                <NavLink
                                    to={`/category/${category.name}`}
                                    className={isNotActiveStyle}
                                    key={category.name}
                                >
                                    <div className="mr-4 items-center">
                                        <img src={category.image} className=" w-12 h-12 rounded-full shadow-sm object-fit" alt="category" />
                                        {category.name}
                                    </div>
                                </NavLink>
                            ))}
                        </div>
                    </div>

                    <div className="px-2 md:px-5 flex  gap-2 md:gap-5 w-full mt-5 mb-5">

                        <div className="flex justify-start items-center w-full px-2 rounded-md bg-white border-none outline-none focus-within:shadow-sm">

                            <IoMdSearch fontSize={21} className="ml-1" />
                            <input
                                type="text"
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search"
                                value={searchTerm}
                                onFocus={() => navigate('/search')}
                                className="p-2 w-full bg-white outline-none"
                            />
                        </div>
                        <div className="flex gap-3 ">
                            <Link to={`user-profile/${user?._id}`} className="hidden md:block">
                                <img src={user.image} alt="user-pic" className="w-14 h-12 rounded-lg " />
                            </Link>
                        </div>
                    </div>
                </div>

            </div>

        )
    }

}

export default Navbar