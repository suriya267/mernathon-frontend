import React, { useContext } from 'react'
import { SubscribeContext } from '../context/subscribeContext';

const NewsLetterBox = () => {
    const { form, onChange, onSubmitHandler } = useContext(SubscribeContext);

    return (
        <div className='mt-10 text-center '>
            <p className='text-2xl font-medium text-gray-800'>Unlock 20% Off | Subscribe Today!</p>
            <p className='mt-3 text-gray-400'>Don't miss out—unlock your savings now by subscribing below!</p>
            <form onSubmit={onSubmitHandler} className='flex items-center w-full gap-3 pl-3 mx-auto my-6 border sm:w-1/2'>
                <input
                    onChange={onChange}
                    className='w-full outline-none sm:flex-1'
                    type="email"
                    name="email"
                    placeholder='hello@gmail.com'
                    required
                />
                <button type='submit' className='px-10 py-4 text-xs text-white bg-black'>SUBSCRIBE</button>
            </form>
        </div>
    )
}

export default NewsLetterBox
