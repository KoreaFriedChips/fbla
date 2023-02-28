import React, { useState } from 'react';
import { useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import WheelComponent from 'react-wheel-of-prizes';
import { ranking } from '../utils/data';
import Dropdown from './Dropdown';

const Winners = ({ user }) => {

    const { admin } = user

    let grade9 = [
        'Person 1',
        'Person 5',
        'Person 9',
        'Alex Xu',
        'Bill Jiang',
        'Bryan Deng'
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
        'Alex Xu'
    ]
    const [grade, setGrade] = useState(9);
    const [seg, setSeg] = useState(grade9);


    const wheelColours = () => {
        let arr = [];
        let colors = ["#EE4040", "#F0CF50", "#815CD1", "#3DA5E0", "#34A24F"];
        seg.forEach((el) => {
            let color = colors.shift();
            arr.push(color);
            colors.push(color);
        });

        return arr;
    };
    const segColors = wheelColours();

    const [successNotif, setSuccessNotif] = useState(false);
    const successMessage = "Succesfully chosen a winner!";
    function toggleSuccess() {
        setSuccessNotif(true);
    }

    const gradeNine = () => {
        setGrade(9);
        setSeg(grade9)
        console.log(seg)
    };
    const gradeTen = () => {
        setGrade(10);
        setSeg(grade10)
        console.log(seg)
    };
    const gradeEleven = () => {
        setGrade(11);
        setSeg(grade11)
        console.log(seg)
    };
    const gradeTwelve = () => {
        setGrade(12);
        setSeg(grade12)
        console.log(seg)
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
                                trigger={
                                    <button className='font-bold text-2xl text-center mb-2 ml-3 bg-sky-100 p-3 rounded-lg'>Grade {grade}</button>}
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
                        {/* positive alert */}
                        <div className="overflow-hidden ease-in-out duration 200 mt-3" style={{ height: successNotif ? "3.5rem" : "0" }}>
                            <div className="w-full bg-green-300 flex items-center justify-between p-3 rounded-lg">
                                <p className="text-xl">{successMessage}</p>
                                <button
                                    className="text-xl"
                                    onClick={() => {
                                        setSuccessNotif(false);
                                    }}
                                >
                                    X
                                </button>
                            </div>
                        </div>
                        <div className='mt-10 justify-center items-center' style={{ margin: "0% 12%" }}>
                            < WheelComponent
                                segments={seg}
                                segColors={segColors}
                                winningSegment={"8"}
                                onFinished={toggleSuccess}
                                primaryColor='black'
                                contrastColor='white'
                                buttonText='Spin'
                                isOnlyOnce={false}
                            />
                        </div>
                    </div>
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
                        <div>
                            <Dropdown
                                trigger={
                                    <button className='font-bold text-2xl text-center mb-2 ml-3 bg-sky-100 p-3 rounded-lg'>Grade {grade}</button>}
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
                    </div>
                </div>

            </div >
        )
    }
}

export default Winners