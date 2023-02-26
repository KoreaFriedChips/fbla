import React, { useEffect, useState } from 'react';
import MasonryLayout from './MasonryLayout';
import { client } from '../client';
import { feedQuery, searchQuery } from '../utils/data';
import Spinner from './Spinner';

const Search = ({ searchTerm }) => {

    const [pins, setPins] = useState();
    const [loading, setLoading] = useState(false);

    // Search: fetches all the pins and looks for terms from the title, about, and/or category that are the same with the search term
    useEffect(() => {
        if (searchTerm !== '') {
            setLoading(true);
            const query = searchQuery(searchTerm.toLowerCase());
            client.fetch(query).then((data) => {
                setPins(data);
                setLoading(false);
            });
        } else {
            client.fetch(feedQuery).then((data) => {
                setPins(data);
                setLoading(false);
            });
        }
    }, [searchTerm]);

    return (
        <div>
            {/* spinner for when searching pins are loading and the user doesn't see just blank */}
            {loading && <Spinner message="Searching pins" />}
            {pins?.length !== 0 && <MasonryLayout pins={pins} />}
            {pins?.length === 0 && searchTerm !== '' && !loading && (
                <div className="mt-10 text-center text-xl ">No Events Found!</div>
            )}
        </div>
    )
}

export default Search