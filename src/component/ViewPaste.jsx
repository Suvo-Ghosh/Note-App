import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { FaCopy } from 'react-icons/fa'
import toast from 'react-hot-toast'

function ViewPaste() {
    const { id } = useParams()
    const allPastes = useSelector((state) => state.paste.pastes || [])
    const paste = allPastes.filter((p) => p._id === id)[0]

    return (
        <div className="w-full h-full">
            <div className=" mx-auto max-w-[1000px] p-2">
                <div className='flex flex-row  place-content-between'>
                    <input
                        className='bg-inherit text-white p-2 rounded-sm border-2 outline-blue-700 w-full '
                        type="text"
                        placeholder='Enter Title Here'
                        value={paste.title}
                        onChange={(e) => setTitle(e.target.value)}
                        disabled
                    />

                </div>
                <div className="mt-4 rounded  w-full min-w-[300px] border-2">
                    <div className="h-[7%] border-b-2 border-b-gray-300 flex flex-row justify-between">
                        <div className=" p-2 flex flex-row gap-2">
                            <div className="h-4 w-4 bg-red-500 rounded-full"></div>
                            <div className="h-4 w-4 bg-yellow-400 rounded-full"></div>
                            <div className="h-4 w-4 bg-green-400 rounded-full"></div>
                        </div>
                        <div
                            className="p-2 cursor-pointer"
                            onClick={() => {
                                navigator.clipboard.writeText(paste.content)
                                toast.success("Copied to clipboard")
                            }}
                        >
                            <FaCopy size={20} color='white' />
                        </div>
                    </div>
                    <textarea
                        className='bg-inherit text-white p-2 rounded w-full min-w-[300px] resize-none'
                        rows={20}
                        placeholder="Enter Content Here"
                        value={paste.content}
                        onChange={(e) => setValue(e.target.value)}
                        disabled
                    >

                    </textarea>
                </div>
            </div>
        </div>
    )
}

export default ViewPaste