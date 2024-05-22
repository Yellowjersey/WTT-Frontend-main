"use client"
import { useEffect } from 'react'
import Link from 'next/link';
import IcnClose from '../svg_icons/IcnClose';

const MenuSidebar = ({ toogleMenuSidebar, settoogleMenuSidebar }) => {

    const handleClose = () => {
        settoogleMenuSidebar(false)
    }

    useEffect(() => {
        settoogleMenuSidebar(false)
    }, [settoogleMenuSidebar])

    return (
        <>
            <aside className={`block lg:hidden pt-20 p-10 fixed top-0 ${toogleMenuSidebar ? "end-0" : "-end-full"} transition-all duration-300 z-30 h-screen sm:w-[320px] w-full overflow-y-auto theme-scrollbar bg-gray-600`}>
                <div className="h-full">
                    <div className="sidebar-action">
                        <button variant={"ghost"} className='absolute top-5 end-5 p-0' onClick={handleClose}>
                            <IcnClose className='w-4 h-4 text-white' />
                        </button>
                    </div>
                    <div className="flex items-center flex-col h-full gap-10">
                        <ul className='flex items-center flex-col gap-12'>
                            <li>
                                <Link href={'/'} className='text-base font-400 text-white hover:text-danger transition-all duration-300'>Home</Link>
                            </li>
                            <li>
                                <Link href={'/'} className='text-base font-400 text-white hover:text-danger transition-all duration-300'>About App</Link>
                            </li>
                            <li>
                                <Link href={'/'} className='text-base font-400 text-white hover:text-danger transition-all duration-300'>Our Team</Link>
                            </li>
                            <li>
                                <Link href={'/'} className='text-base font-400 text-white hover:text-danger transition-all duration-300'>My Story</Link>
                            </li>
                            <li>
                                <Link href={'/'} className='text-base font-400 text-white hover:text-danger transition-all duration-300'>Contact Us</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </aside>
        </>
    )
}

export default MenuSidebar