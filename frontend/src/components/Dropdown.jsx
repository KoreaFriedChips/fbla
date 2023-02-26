import React, { useState, cloneElement } from 'react'

// dropdown menu used in the winners page to look through each grade and see how many points each person has
const Dropdown = ({ trigger, menu }) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(!open);
    };

    return (
        <div className="relative p-3">
            {cloneElement(trigger, {
                onClick: handleOpen,
            })}
            {open ? (
                <ul className="absolute list-style-none mx-5">
                    {menu.map((menuItem, index) => (
                        <li key={index} className="bg-white hover:bg-gray-200 p-3">
                            {cloneElement(menuItem, {
                                onClick: () => {
                                    menuItem.props.onClick();
                                    setOpen(false);
                                },
                            })}
                        </li>
                    ))}
                </ul>
            ) : null}
        </div>
    );
};

export default Dropdown