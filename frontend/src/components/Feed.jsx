import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { client } from '../client'
import { feedQuery, searchQuery } from '../utils/data'
import MasonryLayout from './MasonryLayout'
import Spinner from './Spinner'

const Feed = () => {

    const [pins, setPins] = useState()
    const [loading, setLoading] = useState(false)
    const { categoryId } = useParams()

    // when selecting a category, only display events in that category 
    useEffect(() => {
        if (categoryId) {
            setLoading(true);
            const query = searchQuery(categoryId);
            client.fetch(query).then((data) => {
                setPins(data);
                setLoading(false);
            });
        } else {
            setLoading(true);
            client.fetch(feedQuery).then((data) => {
                setPins(data);
                setLoading(false);
            });
        }
    }, [categoryId]);

    // handle loading
    if (loading)
        return <Spinner message="We are adding new ideas to your feed!" />
    // handle if there are no events in that category
    if (!pins?.length)
        return <h2 className='flex justify-center font-semibold'>No Events Yet. Be the first to post in this category!</h2>

    return (
        // use masonry layout to nicely display all events to the user
        <div>
            {pins && (<MasonryLayout pins={pins} />)}
        </div>
    )
}

export default Feed