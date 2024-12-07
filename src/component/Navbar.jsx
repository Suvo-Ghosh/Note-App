import React from 'react'
import { NavLink } from 'react-router-dom'
import { GiNotebook } from "react-icons/gi";



function Navbar() {
    return (
        <div className="w-full bg-gray-900 p-2">
            <div className="flex flex-row items-center gap-20 px-2 max-w-[1000px] mx-auto text-white">
                <GiNotebook size={35} />
                <div className='flex gap-6 justify-center'>
                    <NavLink
                        to="/"
                    >
                        Create Note
                    </NavLink>
                    <NavLink
                        to="/paste"
                    >
                        View Notes
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

export default Navbar