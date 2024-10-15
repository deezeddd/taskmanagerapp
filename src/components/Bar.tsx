import React from 'react'

export default function Bar() {
  return (
    <div>
        <ul className='w-[100%] flex mb-3  justify-between items-center'>
            <li className='font-bold'>Today</li>
            <li > 
                <input type="text" name='search' placeholder='Search' className='border-2 border-gray-200 rounded-3xl w-96 text-sm h-10 pl-4 '/>
            </li>
            <li>
                <div className='flex gap-3'>
                    <button className='border-2 border-gray-200 rounded-md bg-green-400 text-sm w-14 h-10'>All</button>
                    <button className=' border-2 border-gray-200 rounded-md bg-gray-200 text-sm h-10 w-24 '>Completed</button>
                    <button className=' border-2 border-gray-200 rounded-md bg-gray-200 text-sm h-10 w-24'>Incomplete</button>
                </div>
            </li>
        </ul>
        
    </div>
  )
}
