import React, { useState } from 'react';
import Container from '@/components/common/Container';
import LineShap from '@/components/svg_icons/LineShap';
import RedShap from '@/components/svg_icons/RedShap';
import Image from 'next/image';

const OurTeamSection = (props) => {
    const [card, setCard] = useState('1');
    return (
        <section className='bg-dark lg:py-20 py-10 relative overflow-y-hidden hidden-scrollbar' id={props?.id}>
            <LineShap className='3xl:w-[1524px] xl:w-[1200px] lg:w-[800px] w-[600px] lg:h-[290px] h-[250px] absolute start-0 -top-8 lg:block hidden' />
            <RedShap className='h-[420px] w-[420px] absolute -start-[160px] -top-[195px]' />
            <Container>
                <h2 className='text-danger text-center font-500' data-aos="fade-down" data-aos-duration="1000" data-aos-easing="ease-in-sine">OUR TEAM</h2>
                <div className="lg:pt-24 pt-12 lg:pb-24 pb-12 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 justify-center items-centerlg:gap-10 gap-6">
                    <div className={`${card === '3' ? 'scale-1' : 'scale-90'}`}>
                        <div className="bg-card p-2.5 flex flex-col gap-2.5" data-aos="fade-right" data-aos-duration="1000" data-aos-easing="ease-in-sine" onClick={() => setCard('3')}>
                            <div className="">
                                <Image src='/assets/images/member_1.png' alt='' height={330} width={330} className='w-full' />
                            </div>
                            <div className={`xl:p-3.5 p-1.5 text-center ${card === '3' ? 'bg-danger' : ''}`}>
                                <h4 className='text-[20px]'>Jeff Burrell</h4>
                            </div>
                        </div>
                    </div>
                    <div className={`${card === '1' ? 'scale-1' : 'scale-90'}`}>
                        <div className="bg-card p-2.5 flex flex-col gap-2.5" data-aos="zoom-in" data-aos-duration="1000" data-aos-easing="ease-in-sine" onClick={() => setCard('1')}>
                            <div className="">
                                <Image src='/assets/images/member2.jpg' alt='' height={330} width={330} className='w-full' />
                            </div>
                            <div className={`xl:p-3.5 p-1.5 text-center ${card === '1' ? 'bg-danger' : ''}`}>
                                <h4 className='text-[20px]'>Jared Burrell</h4>
                            </div>
                        </div>
                    </div>
                    <div className={`${card === '2' ? 'scale-1' : 'scale-90'}`}>
                        <div className="bg-card p-2.5 flex flex-col gap-2.5" data-aos="fade-left" data-aos-duration="1000" data-aos-easing="ease-in-sine" onClick={() => setCard('2')}>
                            <div className="">
                                <Image src='/assets/images/member_3.png' alt='' height={330} width={330} className='w-full' />
                            </div>
                            <div className={`xl:p-3.5 p-1.5 text-center ${card === '2' ? 'bg-danger' : ''}`}>
                                <h4 className='text-[20px]'>Jay Neitz, Phd - Scientist</h4>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    card === '1' ?
                        <p className='text-base font-400 leading-[30px] text-gray-800 lg:w-[80%] w-full text-center mx-auto' data-aos="fade-up" data-aos-duration="1000" data-aos-easing="ease-in-sine">My name is Jared Burrell. My life in the outdoors started at a very early age. I started hunting with my dad when I was 4 years old, and I have been hunting ever since. I harvested my 1st turkey and my first small buck at 6 years old. Being raised by an avid outdoorsman and outfitter, my dad granted me a chance to live an amazing life entrenched in the outdoors which now plays one of the biggest roles in my life. Aside from hunting I enjoy fishing, camping, kayaking, and almost anything outside. With hunting being such a strong passion, I`m excited to bring that enthusiasm into this company and begin working to create the highest level of technology for those like me who enjoy the passion of hunting.</p>
                        : card === '2' ?
                            <p className='text-base font-400 leading-[30px] text-gray-800 lg:w-[80%] w-full text-center mx-auto' data-aos="fade-up" data-aos-duration="1000" data-aos-easing="ease-in-sine">This app is possible via Dr Jay Neitz, 2009-present Bishop Professorship, University of Washington. 2009 Time Magazine’s #3 top scientific discovery of the year. In 2010, Neitz and his wife Maureen Neitz were awarded the Pepose Award in Vision Science. He has acted as a camouflage consultant for the US Military and one of the most prominent experts in deer vision just to name a few of his achievements. He is one of the foremost experts in whitetail vision and was instrumental in our research and development. He currently holds a position at the University of Washington. Further information about him can be found with a google search.</p>
                            :
                            <>
                                <p className='text-base font-400 leading-[30px] text-gray-800 lg:w-[80%] w-full text-center mx-auto' data-aos="fade-up" data-aos-duration="1000" data-aos-easing="ease-in-sine">
                                    I'm Jeff Burrell, owner, and founder. I’ve been an avid outdoorsman my entire life. I was a full-time outfitter/guide/packer for over two decades and worked in many western states as well as Alaska. I supplemented my income in the construction industry having accomplished many trades while working throughout the US.
                                </p>
                                <p className='text-base font-400 leading-[30px] text-gray-800 lg:w-[80%] w-full text-center mx-auto' data-aos="fade-up" data-aos-duration="1000" data-aos-easing="ease-in-sine">
                                    Raised in the Smoky Mountains, I enjoyed hunting, fishing, and digging ginseng amongst other outdoor activities. I enjoyed participating in school sports as well as FFA and FHA learning how to cook in school and take care of myself.  My post school education came from the untaught mountain men and outdoorsmen that encompassed me which I now pass on to my children.
                                </p>
                            </>
                }
            </Container>
        </section>
    );
}

export default OurTeamSection;
