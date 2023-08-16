import React from 'react'

const Footer = () => {
    return (
        <div className='fixed bottom-0 w-full'>
            <footer className="bg-gray-100 p-3 dark:bg-black px-10 mb-0">
                <div className="w-full max-w-screen-xl mx-auto mb-0">
                    {/* <div className="sm:flex sm:items-center sm:justify-between">
                        <a href="/" className="flex items-center mb-4 sm:mb-0">
                            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">TMH</span>
                        </a>
                        <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-black sm:mb-0 dark:text-white">
                            <li>
                                <a href="#" className="mr-4 hover:underline md:mr-6 ">About</a>
                            </li>
                            <li>
                                <a href="#" className="mr-4 hover:underline md:mr-6">Privacy Policy</a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline">Contact</a>
                            </li>
                        </ul>
                    </div> */}
                    <span className="block text-sm sm:text-center">© 2023 <a href="/" className="hover:underline">TMH</a>. All Rights Reserved.</span>
                </div>
            </footer>
        </div>
    )
}

export default Footer