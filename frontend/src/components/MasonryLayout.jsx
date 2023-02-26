import React from 'react'
import { useEffect } from 'react';
import Masonry from 'react-masonry-css';
import Pin from './Pin';

// based on screen size dynamically change the number of columns to display events
const breakpointColumnsObj = {
    default: 3,
    3000: 3,
    2000: 3,
    1200: 3,
    1000: 2,
    500: 1,
};

// Masonry Layout is a react component that creates the clean user-interface for the events to be posted
const MasonryLayout = ({ pins }) => {
    return (
        <Masonry className="flex animate-slide-fwd" breakpointCols={breakpointColumnsObj}>
            {pins?.map((pin) => <Pin key={pin._id} pin={pin} className="w-max" />)}
        </Masonry>
    )
}

export default MasonryLayout