import React, { useEffect, useState } from 'react';
import { MdDownloadForOffline } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { client, urlFor } from '../client';
import MasonryLayout from './MasonryLayout';
import { pinDetailMorePinQuery, pinDetailQuery } from '../utils/data';
import Spinner from './Spinner';

// maybe directly use alreadySave
const PinDetail = ({ user }) => {

    const [successNotif, setSuccessNotif] = useState(false);
    const successMessage = "Successfully joined the event!";
    function toggleSuccess() {
        setSuccessNotif(true);
    }
    const [warningNotif, setWarningNotif] = useState(false);
    const warningMessage = "Warning: your comment contains inappropriate language";
    function toggleWarning() {
        setWarningNotif(true);
    }
    const [pins, setPins] = useState();
    const [pinDetail, setPinDetail] = useState();
    const [comment, setComment] = useState('');
    const [addingComment, setAddingComment] = useState(false);
    const { pinId } = useParams();

    const fetchPinDetails = () => {
        let query = pinDetailQuery(pinId)
        if (query) {
            client.fetch(`${query}`).then((data) => {
                setPinDetail(data[0]);
                //console.log(data);
                if (data[0]) {
                    query = pinDetailMorePinQuery(data[0]);
                    client.fetch(query).then((res) => {
                        setPins(res);
                    })
                }
            })
        }
    }

    useEffect(() => {
        fetchPinDetails()
    }, [pinId])

    const addComment = () => {
        if (comment) {
            if (comment.includes("crap")) {
                toggleWarning()
                setComment('');
            } else {
                setAddingComment(true);
                client
                    .patch(pinId)
                    .setIfMissing({ comments: [] })
                    .insert('after', 'comments[-1]', [{ comment, _key: uuidv4(), postedBy: { _type: 'postedBy', _ref: user._id } }])
                    .commit()
                    .then(() => {
                        fetchPinDetails();
                        setComment('');
                        setAddingComment(false);
                    });
            }
        }
    };

    if (!pinDetail)
        return <Spinner message="Loading pin..." />

    let points = 0;
    switch (pinDetail.category) {
        case 'Formal':
            points = 50;
            break;
        case 'Festive':
            points = 30;
            break;
        case 'Spirit Week':
            points = 10;
            break;
        case 'Sports':
            points = 20;
            break;
        case 'Field Trip':
            points = 10;
            break;
        case 'Social':
            points = 25;
            break;
        case 'Fundraiser':
            points = 15;
            break;
        default:
            points = 0;
    }
    const updateUserPoints = () => {
        console.log(user.points)
        console.log(points)
        // fck it just hard code this sht
    };



    return (
        <>
            {pinDetail && (

                <div>
                    {/* positive alert */}
                    <div className="overflow-hidden ease-in-out duration 200" style={{ height: successNotif ? "3.5rem" : "0" }}>
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
                    {/* warning alert */}
                    <div className="overflow-hidden ease-in-out duration 200" style={{ height: warningNotif ? "3.5rem" : "0" }}>
                        <div className="w-full bg-yellow-300 flex items-center justify-between p-3 rounded-lg">
                            <p className="text-xl">{warningMessage}</p>
                            <button
                                className="text-xl"
                                onClick={() => {
                                    setWarningNotif(false);
                                }}
                            >
                                X
                            </button>
                        </div>
                    </div>
                    <div className="flex xl:flex-row flex-col m-auto bg-white" style={{ maxWidth: '1500px', borderRadius: '32px' }}>

                        <div className="flex justify-center items-center md:items-start flex-initial">
                            <img
                                className="rounded-t-3xl rounded-b-lg"
                                src={(pinDetail?.image && urlFor(pinDetail?.image).url())}
                                alt="user-post"
                            />
                        </div>
                        <div className="w-full p-5 flex-1 xl:min-w-620">
                            <div className="flex items-center justify-between">
                                <div className="flex gap-2 items-center">
                                    {/* move join button here, when user joins give a success notification */}
                                    <button
                                        onClick={toggleSuccess}
                                        type="button"
                                        className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none"
                                    >
                                        Join
                                    </button>
                                </div>
                                <div>
                                    <button
                                        onClick={updateUserPoints}
                                        type="button"
                                        className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none"
                                    >
                                        Get Points
                                    </button>
                                </div>
                                <div>
                                    <p>{points} points</p>
                                </div>
                            </div>
                            <div>
                                <h1 className="text-4xl font-bold break-words mt-3">
                                    {pinDetail.title}
                                </h1>
                                <p className="mt-3">{pinDetail.about}</p>
                            </div>
                            <Link to={`/user-profile/${pinDetail?.postedBy._id}`} className="flex gap-2 mt-5 items-center bg-white rounded-lg ">
                                <img src={pinDetail?.postedBy.image} className="w-10 h-10 rounded-full" alt="user-profile" />
                                <p className="font-bold">{pinDetail?.postedBy.userName}</p>
                            </Link>
                            <h2 className="mt-5 text-2xl">Comments</h2>
                            <div className="max-h-370 overflow-y-auto">
                                {pinDetail?.comments?.map((item) => (
                                    <div className="flex gap-2 mt-5 items-center bg-white rounded-lg" key={item.comment}>
                                        <img
                                            src={item.postedBy?.image}
                                            className="w-10 h-10 rounded-full cursor-pointer"
                                            alt="user-profile"
                                        />
                                        <div className="flex flex-col">
                                            <p className="font-bold">{item.postedBy?.userName}</p>
                                            <p>{item.comment}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex flex-wrap mt-6 gap-3">
                                <Link to={`/user-profile/${user._id}`}>
                                    <img src={user.image} className="w-10 h-10 rounded-full cursor-pointer" alt="user-profile" />
                                </Link>
                                <input
                                    className=" flex-1 border-gray-100 outline-none border-2 p-2 rounded-2xl focus:border-gray-300"
                                    type="text"
                                    placeholder="Add a comment"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                />
                                <button
                                    type="button"
                                    className="bg-red-500 text-white rounded-full px-6 py-2 font-semibold text-base outline-none"
                                    onClick={addComment}
                                >
                                    {addingComment ? 'Posting the comment...' : 'Post'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {pins?.length > 0 && (
                <h2 className="text-center font-bold text-2xl mt-8 mb-4">
                    More like this
                </h2>
            )}
            {pins ? (
                <MasonryLayout pins={pins} />
            ) : (
                <Spinner message="Loading more pins" />
            )}
        </>
    )
}

export default PinDetail