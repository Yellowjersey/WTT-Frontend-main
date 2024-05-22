import Container from '@/components/common/Container';
import BlurRed from '@/components/svg_icons/BlurRed';
import BlurWhite from '@/components/svg_icons/BlurWhite';
import RedShap from '@/components/svg_icons/RedShap';
import Image from 'next/image';
import React from 'react';

const AboutSection = (props) => {
    return (
        <section className='bg-dark lg:py-20 py-12 lg:pt-[180px] pt-[60px] relative overflow-y-hidden hidden-scrollbar' id={props?.id}>
            <Image src='/assets/images/line_shap.png' alt='' height={1098} width={798} className='absolute end-0 top-0 w-[70%] lg:block hidden' />
            <Container>
                <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-6 gap-3 items-end pb-10">
                    <div className="relative z-[1] lg:order-1 order-2" data-aos="fade-up" data-aos-duration="1000" data-aos-easing="ease-in-sine">
                        <Image src='/assets/images/bg_yek.png' alt='' height={312} width={448} className='absolute -top-[220px] -start-[130px] -z-[1] opacity-10' />
                        {/* <div className="rounded-[16px] overflow-hidden h-[300px] sm:w-[480px] w-full"> */}
                            <Image src='/assets/images/yek.png' alt='' height={300} width={479} className='rounded-[16px]' />
                        {/* </div> */}
                    </div>
                    <div className="lg:order-2 order-1" data-aos="fade-down" data-aos-duration="1000" data-aos-easing="ease-in-sine">
                        <h2 className='font-500 uppercase lg:pb-12 pb-6'>About <span className='text-danger'>The App</span></h2>
                        <p className='text-base font-400 leading-[30px] text-gray-800 md:border-s-2 border-s-0 border-danger md:ps-3 ps-0 lg:mb-16 mb-0 max-w-[550px]'>Welcome to Whitetail Tactical. This App was created to show users how ungulates (hooved animals) see daytime colors as compared to humans.  This controversy has stirred debates for decades, especially amongst the camouflage industry.  Although the reality of how deer see color has been available for years via information gathered by the top scientific minds in the world, its interpretation has been widely varying amongst the public.</p>
                    </div>
                </div>
                <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-10 gap-3 items-center pb-10">
                    <div className="" data-aos="fade-right" data-aos-duration="1000" data-aos-easing="ease-in-sine">
                        <p className='text-base font-400 leading-[30px] text-gray-800 pb-2.5'>To end this controversy, we joined with one of the foremost experts on the subject, Dr. Jay Neitz. This Patented technology can change the way you determine your next purchase or what you choose to wear any given day or at any place. Simply take a picture in or of your gear in your hunting areas using our Deer Vision Camera, as we call it, and see how well it blends with the surrounding environment.</p>
                        <p className='text-base font-400 leading-[30px] text-gray-800'>If you see colors blending too much, creating a solid looking color, or colors that just look out of place, you may need to consider a change.  Also be aware of any blaze garment you may be wearing.  Our testing has shown blaze orange can appear in a variety of colors to deer, some of which are counter-productive for deer (and all other ungulates) hunting or viewing as they can cause you to stand out instead of camouflaging you.</p>
                    </div>
                    <div className="relative z-[1]" data-aos="fade-left" data-aos-duration="1000" data-aos-easing="ease-in-sine">
                        <Image src='/assets/images/bg_1.webp' alt='' height={615} width={340} className='' />
                    </div>
                </div>
                <div className="py-4 px-7 bg-danger rounded-[8px]" data-aos="fade-up" data-aos-duration="1000" data-aos-easing="ease-in-sine">
                    <p className='max-w-[800px] font-600 leading-[21px] italic'>NOTE: Whitetail Tactical has the exclusive rights for the established Patent: Multi Spectral Imaging with Differential Visualizability in Discreet Visualization Domains. Pat No. 8,084,078</p>
                </div>
            </Container>
        </section>
    );
}

export default AboutSection;
