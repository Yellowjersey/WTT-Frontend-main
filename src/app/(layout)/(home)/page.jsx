'use client'

import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import HeroSection from './_components/HeroSection';
import AboutSection from './_components/AboutSection';
import GetInTouchSection from './_components/GetInTouchSection';
import OurTeamSection from './_components/OurTeamSection';
import StaffMemberSection from './_components/StaffMemberSection';
import FeatureSection from './_components/FeatureSection';
import { useRouter, useParams } from "next/navigation";

const Page = () => {
    const [getLocation, setGetLocation] = useState();
    useEffect(() => {
        AOS.init();
    }, [])

    const router = useRouter();
    const params = useParams();

    useEffect(() => {
        setTimeout(() => {
            setGetLocation(document.getElementById(window?.location?.hash?.replace("#", '')))
        }, 100);
        window.scrollTo({
            top: getLocation?.offsetTop - 96,
            behavior: "auto",
        })
    }, [params, getLocation]);

    return (    
        <div>
            <HeroSection />
            <AboutSection id={"AboutApp"} />
            <OurTeamSection id={"OurTeam"} />
            <FeatureSection id={"AppStory"} />
            <StaffMemberSection id={""} />
            <GetInTouchSection id={"ContactUs"} />
        </div>
    );
}

export default Page;
