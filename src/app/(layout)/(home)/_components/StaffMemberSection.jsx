'use client'
import React, { useEffect, useRef, useState } from 'react';
import Slider from "react-slick";
import Image from 'next/image';
import Container from '@/components/common/Container';
import IcnArrow from '@/components/svg_icons/IcnArrow';
import JoinModal from '@/components/modals/JoinModal';

const StaffMemberSection = (props) => {
    const [join, setJoin] = useState(false)
    const [nav1, setNav1] = useState(null);
    const [nav2, setNav2] = useState(null);
    let slider1 = []
    let slider2 = []

    useEffect(() => {
        setNav1(slider1)
        setNav2(slider2)
    }, [slider1, slider2])

    const SlideOptions = {
        arrows: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: true,
        autoplay: true,
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
    const sub = {
        arrows: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true
    }

    return (
        <>
            <section className='overflow-x-hidden' id={props?.id}>
                <div className='desc_section lg:pt-[120px] pt-[60px] pb-[120px] bg-[url("/assets/images/bg_staff.png")] bg-no-repeat bg-cover bg-center'>
                    <Container>
                        <div className="flex items-center justify-center flex-col">
                            <h2 className='pb-5' data-aos="fade-down" data-aos-duration="1000" data-aos-easing="ease-in-sine">Pro Staff Member</h2>
                            <p className='text-base text-gray-800 leading-[30px] max-w-[580px] mx-auto text-center pb-8' data-aos="fade-up" data-aos-duration="1000" data-aos-easing="ease-in-sine">If you are interested in joining our team, just send us your information and we will take a close look at it. Things we consider.</p>
                            <button className='bg-white font-500 text-danger flex items-center gap-2 px-10 py-3.5 rounded-[8px]' data-aos="fade-up" data-aos-duration="1500" data-aos-easing="ease-in-sine" onClick={() => setJoin(true)}>Join Our Team <IcnArrow className='h-5 w-5 text-danger' /></button>
                        </div>
                    </Container>
                </div>
                <div className="sleder_section bg-dark lg:pb-24 pb-12">
                    <div className="container">
                        <div className="-top-20 relative z-[1]">
                            <Slider asNavFor={nav2} {...SlideOptions} ref={slider => (slider1 = slider)} className='slide_gap12 slick-slider slider_flex center_mode_slider'>
                                <div className="bg-card p-2.5 flex flex-col gap-2.5">
                                    <div className="">
                                        <Image src='/assets/images/staff_1.jpg' alt='' height={330} width={330} className='w-full' />
                                    </div>
                                    <div className="xl:p-3.5 p-2.5 pb-0 text-center">
                                        <h4 className='xl:text-[20px] text-base'>Mark Boykin</h4>
                                    </div>
                                </div>
                                <div className="bg-card p-2.5 flex flex-col gap-2.5">
                                    <div className="">
                                        <Image src='/assets/images/staff_2.png' alt='' height={330} width={330} className='w-full' />
                                    </div>
                                    <div className="xl:p-3.5 p-2.5 pb-0 text-center">
                                        <h4 className='xl:text-[20px] text-base'>Dr David Grisar</h4>
                                    </div>
                                </div>
                                <div className="bg-card p-2.5 flex flex-col gap-2.5">
                                    <div className="">
                                        <Image src='/assets/images/staff_5.jpg' alt='' height={330} width={330} className='w-full' />
                                    </div>
                                    <div className="xl:p-3.5 p-2.5 pb-0 text-center">
                                        <h4 className='xl:text-[20px] text-base'>Savannah Nguyen</h4>
                                    </div>
                                </div>
                                <div className="bg-card p-2.5 flex flex-col gap-2.5">
                                    <div className="">
                                        <Image src='/assets/images/staff_4.jpg' alt='' height={330} width={330} className='w-full' />
                                    </div>
                                    <div className="xl:p-3.5 p-2.5 pb-0 text-center">
                                        <h4 className='xl:text-[20px] text-base'>Marvin McKinney</h4>
                                    </div>
                                </div>
                                <div className="bg-card p-2.5 flex flex-col gap-2.5">
                                    <div className="">
                                        <Image src='/assets/images/staff_3.jpg' alt='' height={330} width={330} className='w-full' />
                                    </div>
                                    <div className="xl:p-3.5 p-2.5 pb-0 text-center">
                                        <h4 className='xl:text-[20px] text-base'>Mike Weaver</h4>
                                    </div>
                                </div>
                            </Slider>
                        </div>
                    </div>
                    <Container>
                        <Slider asNavFor={nav1} {...sub} ref={slider => (slider2 = slider)} className=''>
                            <div className="w-[900px] mx-auto text-center">
                                <p className='desc pb-4'>Mark is a PH who has hunted and guided across the globe. From Alaska to Africa. His foremost passion is stalking in the wilds of Africa on a Safari or the following the harmonious sounds of hounds in high pursuit.</p>
                                <p className='text-base leading-[30px] text-gray-800'>He is an international traveler, conservationist and outdoor adventurer who has spent 27 years living and working in different countries supporting his addiction to time in the worlds greatest Wilderness’s.</p>
                            </div>
                            <div className="w-[900px] mx-auto text-center">
                                <p className='desc'> Dr David Grisar has been hunting, trapping and fishing for 40 years. Over his career he has been blessed to pursue his love of the outdoors in 17 states, 9 countries and 4 continents. He has hunted a dozen species of North American big game animals, 8 species of international big game, waterfowl, upland birds, small game and turkeys. He loves to fish salt water, freshwater and ice fish. He has been a Boy Scout leader, a representative for the State of Wisconsin Conservation Congress, and a member of the NWTF, Safari Club, Whitetails Unlimited, the Wisconsin Bear Hunters Association, Pheasants Forever, Ducks Unlimited, and the NRA. His true passion is archery hunting Whitetail deer with his boys and mentoring young hunters to turkey and deer hunt.</p>
                            </div>
                            <div className="w-[900px] mx-auto text-center">
                                <p className='desc pb-4'>Mark is a PH who has hunted and guided across the globe. From Alaska to Africa. His foremost passion is stalking in the wilds of Africa on a Safari or the following the harmonious sounds of hounds in high pursuit.</p>
                                <p className='text-base leading-[30px] text-gray-800'>He is an international traveler, conservationist and outdoor adventurer who has spent 27 years living and working in different countries supporting his addiction to time in the worlds greatest Wilderness’s.</p>
                            </div>
                            <div className="w-[900px] mx-auto text-center">
                                <p className='desc'> Dr David Grisar has been hunting, trapping and fishing for 40 years. Over his career he has been blessed to pursue his love of the outdoors in 17 states, 9 countries and 4 continents. He has hunted a dozen species of North American big game animals, 8 species of international big game, waterfowl, upland birds, small game and turkeys. He loves to fish salt water, freshwater and ice fish. He has been a Boy Scout leader, a representative for the State of Wisconsin Conservation Congress, and a member of the NWTF, Safari Club, Whitetails Unlimited, the Wisconsin Bear Hunters Association, Pheasants Forever, Ducks Unlimited, and the NRA. His true passion is archery hunting Whitetail deer with his boys and mentoring young hunters to turkey and deer hunt.</p>
                            </div>
                            <div className="w-[900px] mx-auto text-center">
                                <p className='desc'>
                                    I began bow hunting early in life taking my first Pope + Young buck with a brown bear recurve at an age of 25, in 1978. Shortly afterwards I took up shooting a compound bow later becoming the first bowhunter to take three Pope + Young bucks in one week in 1991.  In 1992 I became the first bowhunter to take five Pope + Young bucks in a single season.  I also held the record for the most P&Y whitetail in the record books for many years at 60 when I quit recording them.   I have been an outdoor writing contributor regarding “hunting whitetail deer” for a few magazines and newspapers including Whitetail Times, rub lines, Va game and fish, and North American Whitetail. I’ve given seminars all over the United States from Vermont to Dallas – Fort Worth, as well as serving on many Pro-Staffs including Hoyt, Scent Shield, Realtree, Rocky Mountain BroadHeads, Whitewater Outdoors, Centipede Ladders, Climax True Stands and Ratchet cut. I still enjoy contributing and sharing my skills to others who enjoy the same passion as I had for so many years.
                                </p>
                            </div>
                        </Slider>
                    </Container>
                </div>
            </section>
            <JoinModal modal={join} setModal={setJoin} />
        </>
    );
}

export default StaffMemberSection;
