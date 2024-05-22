import React from 'react';
import Slider from "react-slick";
import Container from '@/components/common/Container';
import Image from 'next/image';
import RedShap from '@/components/svg_icons/RedShap';

const FeatureSection = (props) => {
    const SlideOptions = {
        arrows: false,
        infinite: true,
        dots: true,
        speed: 1000,
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: 0,
        // autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 1399,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    }
    return (
        <section className='bg-dark lg:py-20 py-10 overflow-x-hidden'>
            <div className="">
                <h2 className='text-center font-500'>CHECK OUT OUR <span className='text-danger'>'APP'S "FEATURES"</span></h2>
            </div>
            <div className="container">
                <div className="slider_section pt-20 pb-24 relative">
                    <div className="absolute end-[50%] translate-x-1/2 xl:top-[60px] lg:top-[65px] top-[70px] z-[1] xl:w-[390px] lg:w-[320px] md:w-[240px] xsm:w-[390px] w-[310px]">
                        <Image src='/assets/images/frame.png' alt='' height={710} width={390} className='' />
                    </div>
                    {/* <div className="absolute end-[50%] translate-x-1/2">
                        <RedShap className='3xl:w-[880px] xl:w-[680px] lg:w-[480px] w-[280px]  3xl:h-[867px] xl:h-[660px] lg:h-[460px] h-[260px]' />
                    </div> */}
                    <Slider {...SlideOptions} className='slider_flex slide_gap12 feature_slider feature_section_slider'>
                        <div className="slider_item">
                            <Image src='/assets/images/f1.png' alt='' height={670} width={375} className='xsm:w-[375px] w-[280px]' />
                        </div>
                        <div className="slider_item">
                            <Image src='/assets/images/f2.png' alt='' height={670} width={375} className='xsm:w-[375px] w-[280px]' />
                        </div>
                        <div className="slider_item">
                            <Image src='/assets/images/f2.png' alt='' height={670} width={375} className='xsm:w-[375px] w-[280px]' />
                        </div>
                        <div className="slider_item">
                            <Image src='/assets/images/f3.png' alt='' height={670} width={375} className='xsm:w-[375px] w-[280px]' />
                        </div>
                        <div className="slider_item">
                            <Image src='/assets/images/f4.png' alt='' height={670} width={375} className='xsm:w-[375px] w-[280px]' />
                        </div>
                        <div className="slider_item">
                            <Image src='/assets/images/f5.png' alt='' height={670} width={375} className='xsm:w-[375px] w-[280px]' />
                        </div>
                        <div className="slider_item">
                            <Image src='/assets/images/f6.png' alt='' height={670} width={375} className='xsm:w-[375px] w-[280px]' />
                        </div>
                        <div className="slider_item">
                            <Image src='/assets/images/f6.png' alt='' height={670} width={375} className='xsm:w-[375px] w-[280px]' />
                        </div>
                    </Slider>
                </div>
            </div>
            <Container>
                <div className="text-center" id={props?.id}>
                    <h4 className='font-600 leading-[30px] py-5'>The App Story</h4>
                    <div className="max-h-[280px] overflow-y-auto theme-scrollbar">
                        <p className='desc pb-3.5'>It all began in Colorado over two decades ago. While guiding a group of clients, I noticed they were all wearing various colors of blaze orange vests. The guide, as well as the entrepreneur in me, wondered if I could create a type of camouflage orange. After 2 years researching visual aspects of ungulates and looking for some guidance, I met Dr. Jay Neitz, a leading expert in deer vision as well as consultant for the US military in camo.</p>
                        <p className='desc pb-3.5'>He informed me that this had been attempted for years, even by himself, but I had a slightly new concept of doing it. I explained my idea. The next day he informed me that my idea would work. There the work began.</p>
                        <p className='desc pb-3.5'>It was costly and time consuming, especially for me living on an outfitters wage. I spent the next few years working with many people and experiencing lots of failures. </p>
                        <p className='desc pb-3.5'>The biggest hurdle came in showing others.  Even though the specialized filter he had made for me did just that, the cost of manufacturing enough for marketing was out of the question. This, along with various other hurdles I encountered, led me to step back for a time and rethink how I could reliably market it.</p>
                        <p className='desc'>In early 2023 I was able to move forward with the development of an app, again through the help of Dr. Neitz, leading me where I had been trying to reach for so long. It does exactly what I had been aiming to do for so long. It wasn’t easy by any means, but that is a little bit of my story and a prime example of why you should never quit.  Even the most brilliant of minds don’t always find the best solutions.   </p>
                    </div>
                </div>
            </Container>
        </section>
    );
}

export default FeatureSection;
