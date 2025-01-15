import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { addToPaste, updateToPaste } from '../redux/pasteSlice'
import { FaCopy } from 'react-icons/fa'
import toast from 'react-hot-toast'


function Home() {
    const [title, setTitle] = useState("")
    const [value, setValue] = useState("")
    const [searshPsrams, setSearchParams] = useSearchParams()
    const pasteId = searshPsrams.get("pasteId")
    const dispatch = useDispatch("")
    const allPastes = useSelector((state) => state.paste.pastes || [])

    useEffect(() => {
        if (pasteId) {
            const paste = allPastes.find((p) => p._id === pasteId)
            setTitle(paste.title)
            setValue(paste.content)
        }
    }, [])

    function createPaste() {
        if (title.trim().length === 0 || value.trim().length === 0) {
            toast.error("Title and Content Can't Empty !")
        } else {
            const paste = {
                title: title,
                content: value,
                _id: pasteId || Date.now().toString(36),
                createAt: new Date().toISOString()
            }
            if (pasteId) {
                // update
                dispatch(updateToPaste(paste))
            } else {
                //create
                dispatch(addToPaste(paste))
            }
            // after creation or updation 
            setTitle("")
            setValue("")
            setSearchParams("")
        }
    }

    return (
        <div className="w-full text-white">
            <div className=" mx-auto max-w-[1000px] px-2 pt-2">
                <div className='flex flex-col sm:flex-row gap-1 place-content-between'>
                    <input
                        className='bg-inherit text-white p-2 border-gray-300 rounded-sm border-2 w-full outline-blue-600 sm:w-[70%]'
                        type="text"
                        placeholder='Enter Note Title '
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <button
                        className='p-2 rounded-sm font-semibold bg- bg-yellow-300 text-black w-full sm:w-[25%] outline-blue-600 hover:bg-yellow-400'
                        onClick={createPaste}
                    >
                        {pasteId ? "Update Note" : "Create My Note"}
                    </button>
                </div>
                <div className="mt-2 rounded h-[80vh] w-full min-w-[300px] border-2 border-gray-300">
                    <div className="border-b-2 border-b-gray-300 flex flex-row justify-between">
                        <div className=" p-2 flex flex-row gap-2">
                            <div className="h-4 w-4 bg-red-500 rounded-full"></div>
                            <div className="h-4 w-4 bg-yellow-400 rounded-full"></div>
                            <div className="h-4 w-4 bg-green-400 rounded-full"></div>
                        </div>
                        <div
                            className="p-2 cursor-pointer"
                            onClick={() => {
                                navigator.clipboard.writeText(value)
                                toast.success("Copied to clipboard")
                            }}
                        >
                            <FaCopy size={20} />
                        </div>
                    </div>
                    <textarea
                        className='bg-inherit p-2 w-full min-w-[300px] h-[93%]   resize-none outline-blue-600'
                        rows={20}
                        placeholder="Write Your Content Here . . ."
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        required
                    >
                    </textarea>
                </div>
            </div>
        </div>
    )
}

export default Home