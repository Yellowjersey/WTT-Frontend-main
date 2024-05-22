import React from 'react';
import Container from '@/components/common/Container';
import IcnApple from '@/components/svg_icons/IcnApple';
import IcnGooglePlay from '@/components/svg_icons/IcnGooglePlay';
import RedShap from '@/components/svg_icons/RedShap';
import Image from 'next/image';
// import IcnPlay from '@/components/svg_icons/IcnPlay';    
// import { Button } from '@/components/ui_componets/Button';
// import ShapTop from '@/components/svg_icons/ShapTop';

const HeroSection = (props) => {
    return (
        <section className='w-full xl:min-h-[680px] lg:min-h-[600px] min-h-[unset] bg-[url("/assets/images/hero_bg.png")] bg-no-repeat bg-cover bg-center bg-blend-overlay flex items-end' id={props?.id}>
            <Container>
                <div className="grid lg:grid-cols-2 grid-cols-1 sm:items-end items-center justify-center">
                    <div className="flex flex-col lg:items-start items-center md:justify-center justify-start h-full lg:pb-[90px] pb-0 lg:pt-0 pt-[100px]">
                        <h1 className='font-600 max-w-[600px] lg:text-start text-center'>WHITETAIL TACTICAL APP</h1>
                        <h5 className='text-gray-800 sm:tracking-[8px] tracking-[3px]'>VISUALIZING THE UNSEEN</h5>
                        <div className="flex items-center gap-4 md:pt-12 pt-6">
                            <div className="bg-danger py-1.5 px-3 rounded-[6px] flex items-center gap-3">
                                <IcnApple className='w-6 h-8 text-white' />
                                <div className="">
                                    <h6 className='text-[12px] font-400 text-white/3 mb-1 leading-none'>Available on</h6>
                                    <h5 className='text-sm font-500 leading-none'>App Store</h5>
                                </div>
                            </div>
                            <div className="bg-danger py-1.5 px-3 rounded-[6px] flex items-center gap-3">
                                <IcnGooglePlay className='w-6 h-8 text-white' />
                                <div className="">
                                    <h6 className='text-[12px] font-400 text-white/3 mb-1 leading-none'>Available on</h6>
                                    <h5 className='text-sm font-500 leading-none'>Play Store</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="relative flex items-center justify-center">
                        <div className="absolute">
                            <RedShap className='3xl:w-[880px] xl:w-[680px] lg:w-[480px] w-[280px]  3xl:h-[867px] xl:h-[660px] lg:h-[460px] h-[260px]' />
                        </div>
                        <Image src='/assets/images/Mobile.png' alt='' height={524} width={524} className='z-[1] lg:w-[524px] md:w-[380px] w-[280px]' />
                    </div>
                </div>
            </Container>
        </section>
    );
}

export default HeroSection;
