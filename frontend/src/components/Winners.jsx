import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import WheelComponent from 'react-wheel-of-prizes';
import { ranking } from '../utils/data';
import Dropdown from './Dropdown';

const Winners = ({ user }) => {

    const { admin } = user

    let grade9 = [
        'Person 1',
        'Person 5',
        'Person 9'
    ]
    let grade10 = [
        'Person 2',
        'Person 6',
        'Person 10'
    ]
    let grade11 = [
        'Person 3',
        'Person 7',
    ]
    let grade12 = [
        'Person 4',
        'Person 9',
    ]
    const [grade, setGrade] = useState(9);
    const [segments, setSegments] = useState(grade9);


    const wheelColours = () => {
        let arr = [];
        let colors = ["#EE4040", "#F0CF50", "#815CD1", "#3DA5E0", "#34A24F"];
        segments.forEach((el) => {
            let color = colors.shift();
            arr.push(color);
            colors.push(color);
        });

        return arr;
    };
    const segColors = wheelColours();

    const onFinished = (winner) => {
        console.log(winner)
    }
    // let text = 'Pizza Party Event Joined';
    // let popupOpen1 = true;
    // let popupOpen2 = true;

    // const togglePopup = () => {
    //     popupOpen1 = !popupOpen1;
    //     popupOpen2 = !popupOpen2;
    // }
    const gradeNine = () => {
        setGrade(9);
        setSegments(grade9)
    };
    const gradeTen = () => {
        setGrade(10);
        setSegments(grade10)
    };
    const gradeEleven = () => {
        setGrade(11);
        setSegments(grade11)
    };
    const gradeTwelve = () => {
        setGrade(12);
        setSegments(grade12)
    };

    if (admin) {
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
                                Quartly Report
                            </h1>
                        </div>
                        <div>
                            <Dropdown
                                trigger={<button className='font-bold text-2xl text-center mb-2'>Grade {grade}</button>}
                                menu={[
                                    <button onClick={gradeNine}>Grade 9</button>,
                                    <button onClick={gradeTen}>Grade 10</button>,
                                    <button onClick={gradeEleven}>Grade 11</button>,
                                    <button onClick={gradeTwelve}>Grade 12</button>,
                                ]}
                            />
                        </div>
                        <div className=''>
                            {ranking.slice(0, ranking.length).map((rank) => {
                                if (grade === rank.grade)
                                    return (
                                        <NavLink
                                            to={`/`}
                                            className={'flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize mt-3'}
                                            key={rank.name}
                                        >
                                            <img src={rank.image} className="w-11 h-11 rounded-full shadow-sm object-fit" alt="person" />
                                            {rank.name} | {rank.points}
                                        </NavLink>
                                    );
                                return null;
                            })}
                        </div>
                        {/* select random winner with wheel animation + notification pop up, only admins*/}
                        <div className='mt-10 justify-center'>
                            <WheelComponent
                                segments={segments}
                                segColors={segColors}
                                winningSegment={"8"}
                                onFinished={(winner) => onFinished(winner)}
                                primaryColor='black'
                                contrastColor='white'
                                buttonText='Spin'
                                isOnlyOnce={false}
                            />
                        </div>
                    </div>
                    {/* <div className={`${popupOpen1 ? 'h-3.5' : 'h-0'} ease-in-out duration 200`}>
                        <div className="w-full bg-green-300 flex items-center justify-between p-3 rounded-lg">
                            <p className="text-xl">{text}</p>
                            <button
                                className="text-xl"
                                onClick={() => {
                                    popupOpen1 = false;
                                }}>X</button>
                        </div>
                    </div> */}
                </div>

            </div >
        )
    } else {
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
                                Quartly Report
                            </h1>
                        </div>
                        <div className="columns-4">
                            <p className='font-bold text-xl mt-3 text-center'>Grade 9</p>
                            <p className='font-bold text-xl mt-3 text-center'>Grade 10</p>
                            <p className='font-bold text-xl mt-3 text-center'>Grade 11</p>
                            <p className='font-bold text-xl mt-3 text-center'>Grade 12</p>
                        </div>
                        <div className='columns-4'>
                            {ranking.slice(0, ranking.length).map((rank) => (
                                <NavLink
                                    to={`/`}
                                    className={'flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize mt-3'}
                                    key={rank.name}
                                >
                                    <img src={rank.image} className="w-11 h-11 rounded-full shadow-sm object-fit" alt="img" />
                                    {rank.name} | {rank.points}
                                </NavLink>
                            ))}
                        </div>

                    </div>

                </div>

            </div>
        )
    }

}

export default Winners