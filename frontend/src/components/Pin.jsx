import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { MdDownloadForOffline } from 'react-icons/md'
import { AiTwotoneDelete } from 'react-icons/ai'
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs'

import { client, urlFor } from '../client';
import { fetchUser } from '../utils/fetchUser'

const Pin = ({ pin: { postedBy, image, _id, save } }) => {

    const [postHovered, setPostHovered] = useState(false);
    const [savingPost, setSavingPost] = useState(false);
    const navigate = useNavigate();
    const user = fetchUser();

    const alreadySave = !!(save?.filter((item) => item.postedBy._id === user.googleId))?.length
    //console.log(alreadySave)

    const savePin = (id) => {
        if (!alreadySave) {
            setSavingPost(true)

            client
                .patch(id)
                .setIfMissing({ save: [] })
                .insert('after', 'save[-1]', [{
                    _key: uuidv4(),
                    userId: user.googleId,
                    postedBy: {
                        _type: 'postedBy',
                        _ref: user.googleId,
                    }
                }])
                .commit()
                .then(() => {
                    window.location.reload()
                    setSavingPost(false)
                })
        }
    }

    const deletePin = (id) => {
        client
            .delete(id).then(() => {
                window.location.reload()
            })
    }

    return (
        <div className='m-2'>
            <div
                onMouseEnter={() => setPostHovered(true)}
                onMouseLeave={() => setPostHovered(false)}
                onClick={() => navigate(`/pin-detail/${_id}`)}
                className=" relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
            >
                <img className='rounded-lg w-full' alt='user-post' src={urlFor(image).width(250).url()} />
                {postHovered && (
                    <div className="absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50" style={{ height: '100%' }}>
                        <div className="flex gap-2 justify-between">
                            <a
                                href={`${image?.asset?.url}?dl=`}
                                download
                                onClick={(e) => {
                                    e.stopPropagation();
                                }}
                                className="bg-white w-9 h-9 p-2 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none"
                            ><MdDownloadForOffline />
                            </a>
                            {alreadySave ? (
                                <button type="button" className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none">
                                    {save?.length} Joined
                                </button>
                            ) : (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        savePin(_id);
                                    }}
                                    type="button"
                                    className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none"
                                >
                                    {save?.length}   {savingPost ? 'Joining' : 'Join'}
                                </button>
                            )}
                        </div>
                        <div className='flex justify-between items-center gap-2 w-full px-2'>
                            <button
                                // className='bg-white opacity-70 hover:opacity-100 rounded-lg backdorp-blur px-1 pb-1 '
                                onClick={(e) => { e.stopPropagation(); deletePin(_id); }}
                            >
                                <Link to={`/user-profile/${postedBy?._id}`} className="flex gap-2 mt-2 items-center">
                                    <img
                                        className="w-8 h-8 rounded-full object-cover"
                                        src={postedBy?.image}
                                        alt="user-profile"
                                    />
                                    <p className="font-semibold capitalize text-white">{postedBy?.userName}</p>
                                </Link>
                            </button>
                            {
                                postedBy?._id === user?.googleId && (
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            deletePin(_id);
                                        }}
                                        className="bg-white p-2 rounded-full w-8 h-8 flex items-center justify-center text-dark opacity-75 hover:opacity-100 outline-none"
                                    >
                                        <AiTwotoneDelete />
                                    </button>
                                )
                            }
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Pin