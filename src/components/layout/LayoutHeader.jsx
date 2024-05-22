'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import MainLogo from '../svg_icons/MainLogo';
import Container from '../common/Container';
import IcnMenu from '../svg_icons/IcnMenu';
import MenuSidebar from './MenuSidebar';

const LayoutHeader = () => {
    const [toggleMenu, setToggleMenu] = useState(false);
    return (
        <header className={`header fixed top-0 left-0 w-full z-[99] transition-all duration-300 bg-white/10 backdrop-blur-sm`}>
            <div className="large_screen lg:block hidden">
                <Container>
                    <div className={`flex items-center transition-all duration-300 py-5`}>
                        <div className="logo-part">
                            <Link href={"/"} className='text-[22px] text-white font-700 flex items-end gap-1'>
                                <MainLogo className="h-14 w-14" />
                                <div className="">
                                    <p>Whitetail</p>
                                    <p>Tactical</p>
                                </div>
                            </Link>
                        </div>
                        <div className="nav-part -ms-[157px] flex items-center justify-center w-full">
                            <ul className='flex items-center gap-12'>
                                <li>
                                    <Link href={'/'} className='text-sm font-400 text-gray-800 hover:text-white transition-all duration-300'>Home</Link>
                                </li>
                                <li>
                                    <Link href={'/#AboutApp'} className='text-sm font-400 text-gray-800 hover:text-white transition-all duration-300'>About App</Link>
                                </li>
                                <li>
                                    <Link href={'/#OurTeam'} className='text-sm font-400 text-gray-800 hover:text-white transition-all duration-300'>Our Team</Link>
                                </li>
                                <li>
                                    <Link href={'/#AppStory'} className='text-sm font-400 text-gray-800 hover:text-white transition-all duration-300'>My Story</Link>
                                </li>
                                <li>
                                    <Link href={'/#ContactUs'} className='text-sm font-400 text-gray-800 hover:text-white transition-all duration-300'>Contact Us</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </Container>
            </div>
            <div className="small_screen lg:hidden block">
                <Container>
                    <div className="flex items-center justify-between py-4">
                        <div className="logo-part">
                            <Link href={"/"}>
                                <MainLogo className="h-[37px] w-[60px] " />
                            </Link>
                        </div>
                        <div className="action-part flex items-center gap-4">
                            <span onClick={() => setToggleMenu(!toggleMenu)}><IcnMenu className="h-5 w-5 text-white" /></span>
                        </div>
                    </div>
                </Container>
            </div>
            <MenuSidebar toogleMenuSidebar={toggleMenu} settoogleMenuSidebar={setToggleMenu} />
        </header>
    );
}

export default LayoutHeader;
