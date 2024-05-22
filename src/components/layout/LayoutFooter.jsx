import React from 'react';
import Container from '../common/Container';
import Link from 'next/link';
import IcnHome from '../svg_icons/IcnHome';
import IcnEmail from '../svg_icons/IcnEmail';
import IcnArrow from '../svg_icons/IcnArrow';
import MainLogo from '../svg_icons/MainLogo';
import BgLogo from '../svg_icons/BgLogo';

const LayoutFooter = () => {
    return (
        <footer className='footer bg-dark'>
            <Container>
                <div className="py-6">
                    <div className="grid lg:grid-cols-6 md:grid-cols-4 grid-cols-20 xl:gap-14 lg:gap-8 gap-6 realtive py-24 items-center">
                        <div className="absolute start-1/2 -translate-x-1/2">
                            <BgLogo className="h-[280px] w-[280px] opacity-5" />
                        </div>
                        <div className="col-span-2 lg:order-1 order-2">
                            <div className="flex gap-5 pb-9">
                                <div className="h-10 w-10 bg-danger rounded-full flex items-center justify-center flex-shrink-0">
                                    <IcnHome className="h-5 w-5 text-white" />
                                </div>
                                <div className="">
                                    <h5 className='font-500 pb-2'>Mailing Address</h5>
                                    <p className='font-400 text-gray-800'>Whitetail Tatical LLC 524 Wingfield Orchard Rd Martinsville, VA 24112-6910</p>
                                </div>
                            </div>
                            <div className="flex gap-5">
                                <div className="h-10 w-10 bg-danger rounded-full flex items-center justify-center flex-shrink-0">
                                    <IcnEmail className="h-5 w-5 text-white" />
                                </div>
                                <div className="">
                                    <h5 className='font-500 pb-2'>Email Address</h5>
                                    <p className='font-400 text-gray-800'>info@whitetailtactical.com</p>
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-2 md:col-span-4 col-span-2 flex lg:items-center items-center lg:justify-center justify-start lg:flex-col flex-row gap-2 lg:order-2 order-1">
                            <MainLogo className="h-20 w-20" />
                            <h4 className='text-[18px] font-800 text-white'>Whitetail</h4>
                        </div>
                        <div className="order-3">
                            <ul className='flex lg:gap-3.5 gap-2 flex-col'>
                                <li>
                                    <Link href={"/"} className='text-sm font-400 cursor-pointer text-white hover:text-danger flex items-center gap-2'>
                                        <IcnArrow className="h-4 w-4 text-danger" />
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link href={"/"} className='text-sm font-400 cursor-pointer text-white hover:text-danger flex items-center gap-2'>
                                        <IcnArrow className="h-4 w-4 text-danger" />
                                        About Us
                                    </Link>
                                </li>
                                <li>
                                    <Link href={"/"} className='text-sm font-400 cursor-pointer text-white hover:text-danger flex items-center gap-2'>
                                        <IcnArrow className="h-4 w-4 text-danger" />
                                        Our Team
                                    </Link>
                                </li>
                                <li>
                                    <Link href={"/"} className='text-sm font-400 cursor-pointer text-white hover:text-danger flex items-center gap-2'>
                                        <IcnArrow className="h-4 w-4 text-danger" />
                                        My Story
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="order-4">
                            <ul className='flex lg:gap-3.5 gap-2 flex-col'>
                                <li>
                                    <Link href={"/"} className='text-sm font-400 cursor-pointer text-white hover:text-danger flex items-center gap-2'>
                                        <IcnArrow className="h-4 w-4 text-danger" />
                                        Job Opening
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/term_of_service" className='text-sm font-400 cursor-pointer text-white hover:text-danger flex items-center gap-2'>
                                        <IcnArrow className="h-4 w-4 text-danger" />
                                        Terms & Conditions
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/privacy_policy" className='text-sm font-400 cursor-pointer text-white hover:text-danger flex items-center gap-2'>
                                        <IcnArrow className="h-4 w-4 text-danger" />
                                        Privacy Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link href={"/"} className='text-sm font-400 cursor-pointer text-white hover:text-danger flex items-center gap-2'>
                                        <IcnArrow className="h-4 w-4 text-danger" />
                                        Contact Us
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="p-3 border border-white/5 rounded-[8px]">
                        <p className='font-400 text-gray-800 text-center'>© Whitetail Tatical, LLC Martinsville, VA | Design: South Atlantic Data and Design</p>
                    </div>
                </div>
            </Container>
        </footer>
    );
}

export default LayoutFooter;
