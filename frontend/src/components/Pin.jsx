import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { MdDownloadForOffline } from 'react-icons/md'
import { AiTwotoneDelete } from 'react-icons/ai'

import { client, urlFor } from '../client';
import { fetchUser } from '../utils/fetchUser'

// Events displayed on the feed
const Pin = ({ pin: { postedBy, image, _id, save } }) => {

    const [postHovered, setPostHovered] = useState(false);
    const [savingPost, setSavingPost] = useState(false);
    const navigate = useNavigate();
    const user = fetchUser();

    // save = join --> check if the user already joined this event by checking the user ID/google ID
    const alreadySave = !!(save?.filter((item) => item.postedBy._id === user.googleId))?.length
    //console.log(alreadySave)

    // when joining an event, if you haven't already joined it then join it and update in the backend
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
    // only the creators of an event can delete their own event
    // delete the event/update in the backend, reload the page (may take a while before it's gone) 
    const deletePin = (id) => {
        client
            .delete(id).then(() => {
                window.location.reload()
            })
    }
    // success notification when successfully joined an event
    const [successNotif, setSuccessNotif] = useState(false);
    const successMessage = "success";
    function toggleSuccess() {
        setSuccessNotif(true);
    }

    return (
        <div className='m-2'>
            {/* when you hover over the event you get the options to join, see who posted the event, and download the image to keep the information */}
            <div
                onMouseEnter={() => setPostHovered(true)}
                onMouseLeave={() => setPostHovered(false)}
                onClick={() => navigate(`/pin-detail/${_id}`)} //when you click into the post you can see more details like the title, about, comments etc.
                className=" relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
            >
                <img className='rounded-lg w-full' alt='user-post' src={urlFor(image).width(250).url()} />
                {postHovered && (
                    <div className="absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50" style={{ height: '100%' }}>
                        <div className="flex gap-2 justify-between">
                            {/* allow user to download image */}
                            <a
                                href={`${image?.asset?.url}?dl=`}
                                download
                                onClick={(e) => {
                                    e.stopPropagation();
                                }}
                                className="bg-white w-9 h-9 p-2 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none"
                            ><MdDownloadForOffline />
                            </a>
                            {/* join the event */}
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
                        {/* see the user who posted the event and go to their profile */}
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
                            {/* only if you were the one that posted the event, you can delete it */}
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