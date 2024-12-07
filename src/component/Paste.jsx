import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromPaste } from '../redux/pasteSlice'
import toast from 'react-hot-toast'
import { NavLink } from 'react-router-dom'
import { FaEdit, FaEye, FaTrashAlt, FaCopy, FaShareAlt, FaCalendar } from 'react-icons/fa'; // Import specific icons


function Paste() {
    const pastes = useSelector((state) => state.paste.pastes || [])
    const dispatch = useDispatch()
    const [searchTerm, setSearchTerm] = useState("")

    // Filter pastes based on the search term
    const filteredData = pastes.filter(
        (paste) => paste.title.toLowerCase().includes(searchTerm.toLowerCase())
    )

    // Handle delete action
    const handleDelete = (pasteId) => {
        dispatch(removeFromPaste(pasteId))
    }

    // Format the creation date
    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }
    // Share function using Web Share API
    const handleShare = (pasteContent, pasteTitle) => {
        if (navigator.share) {
            // If Web Share API is supported
            navigator.share({
                title: pasteTitle,
                text: pasteContent,
                url: window.location.href,
            })
                .then(() => {
                    toast.success("Content shared successfully!");
                })
                .catch((error) => {
                    toast.error("Failed to share content.");
                });
        } else {
            // Fallback if Web Share API is not supported
            navigator.clipboard.writeText(pasteContent);
            toast.success("Content copied to clipboard!");
        }
    }

    return (
        <div className='bg-inherit text-white mx-auto max-w-[1000px] p-2'>
            <input
                className='bg-inherit text-white  p-2 rounded-sm w-full border-2 border-gray-300 outline-blue-600 mt-4'
                type="text"
                placeholder='Search Here . . .'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="border-2 border-gray-300 mt-2 rounded-sm">
                <div className="text-2xl sm:text-3xl border-b-2 px-2 py-1">All Notes</div>
                <div className="flex flex-col gap-2 p-2">
                    {filteredData.length > 0 ? (
                        filteredData.map((paste) => (
                            <div className="border-2 p-1 border-gray-300 rounded-sm" key={paste?._id}>
                                <div className="flex flex-col sm:flex-row justify-between">
                                    <h1 className="text-2xl sm:text-3xl">{paste.title.slice(0, 40)}</h1>
                                    <div className="flex flex-row gap-2 mr-3 mt-1">
                                        <button className="h-8 p-1 border-2 rounded-sm hover:text-yellow-500  duration-300">
                                            <NavLink to={`/?pasteId=${paste?._id}`} aria-label="Edit Paste">
                                                <FaEdit size={20} />
                                            </NavLink>
                                        </button>
                                        <button className="p-1 h-8 border-2 rounded-sm hover:text-blue-400  duration-300">
                                            <NavLink to={`/paste/${paste?._id}`} aria-label="View Paste">
                                                <FaEye size={20} />
                                            </NavLink>
                                        </button>
                                        <button
                                            className="p-1 h-8 border-2 rounded-sm hover:text-red-700  duration-300"
                                            onClick={() => handleDelete(paste?._id)}
                                            aria-label="Delete Paste"
                                        >
                                            <FaTrashAlt size={20} />
                                        </button>
                                        <button
                                            className="p-1 h-8 border-2 rounded-sm hover:text-green-700  duration-300"
                                            onClick={() => {
                                                navigator.clipboard.writeText(paste?.content)
                                                toast.success("Copied to clipboard", {
                                                    position: 'top-right'  // This places the toast at the top-right corner
                                                })
                                            }}
                                            aria-label="Copy Paste Content"
                                        >
                                            <FaCopy size={20} />
                                        </button>
                                        <button className="p-1 h-8 border-2 rounded-sm hover:text-blue-700  duration-300"
                                            onClick={() => handleShare(paste.content, paste.title)}
                                            aria-label="Share Paste">
                                            <FaShareAlt size={20} />
                                        </button>
                                    </div>
                                </div>
                                <div className="flex flex-col-reverse sm:flex-row justify-between mt-2">
                                    <div className='w-full sm:w-[70%] '>{paste.content.slice(0, 200)}</div>
                                    <div className='flex '>
                                        <div className="mt-1"><FaCalendar size={17} color="blue" className='mr-1' /></div>
                                        <div className="">{formatDate(paste.createAt)}</div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className='ml-2'>No Note found !</div> // Handle empty search result
                    )}
                </div>
            </div>
        </div>
    )
}

export default Paste
