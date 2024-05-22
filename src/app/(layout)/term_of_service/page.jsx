'use client'
import Container from '@/components/common/Container';
import Link from 'next/link';
import React from 'react';

const page = () => {
    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            window.scrollTo({
                top: section.offsetTop - 90,
                behavior: "smooth",
            });
        }
    };
    return (
        <>
            <div className='h-[calc(100vh-500px)] bg-[url("/assets/images/hero_bg.png")] bg-no-repeat bg-cover bg-center flex flex-col items-start justify-center'>
                <Container>
                    <div className="pt-10">
                        <h3 className='font-500 pb-3.5'>Terms of Service</h3>
                    </div>
                </Container>
            </div>
            <div className="bg-[#242021] py-12">
                <Container>
                    <div className="pb-7">
                        <h4 className='font-500 pb-5 relative before:absolute before:h-0.5 before:w-[200px] before:bg-danger before:bottom-3'>By downloading or using the app, these terms will automatically apply to you</h4>
                        <p className='desc'> you should make sure therefore that you read them carefully before using the app. You’re not allowed to copy, or modify the app, any part of the app, or our trademarks in any way. You’re not allowed to attempt to extract the source code of the app, or try to translate the app into other languages, or make derivative versions. The app itself, and all the trade marks, copyright, database rights and other intellectual property rights related to it, still belong to Whitetail Tactical. Whitetail Tactical is committed to ensuring that the app is as useful and efficient as possible. For that reason, we reserve the right to make changes to the app or to charge for its services, at any time and for any reason. We will never charge you for the app or its services without making it very clear to you exactly what you’re paying for. The Whitetail Tactical app stores and processes personal data that you have provided to us, in order to provide my Service. It’s your responsibility to keep your phone and access to the app secure. We therefore recommend that you do not jailbreak or root your phone, which is the process of removing software restrictions and limitations imposed by the official operating system of your device. It could make your phone vulnerable to malware/viruses/malicious programs, compromise your phone’s security features and it could mean that the cluster Sort app won’t work properly or at all. The app does use third party services that declare their own Terms and Conditions. ·</p>
                    </div>
                    <div className="">
                        <h4 className='font-500 pb-5 relative before:absolute before:h-0.5 before:w-[200px] before:bg-danger before:bottom-3'>Google Play Services</h4>
                        <p className='desc'>Google Analytics for Firebase · Firebase Crashlytics You should be aware that there are certain things that Whitetail Tactical will not take responsibility for. Certain functions of the app will require the app to have an active internet connection. The connection can be Wi-Fi, or provided by your mobile network provider, but Whitetail Tactical cannot take responsibility for the app not working at full functionality if you don’t have access to Wi-Fi, and you don’t have any of your data allowance left. If you’re using the app outside of an area with Wi-Fi, you should remember that your terms of the agreement with your mobile network provider will still apply. As a result, you may be charged by your mobile provider for the cost of data for the duration of the connection while accessing the app, or other third party charges. In using the app, you’re accepting responsibility for any such charges, including roaming data charges if you use the app outside of your home territory (i.e. region or country) without turning off data roaming. If you are not the bill payer for the device on which you’re using the app, please be aware that we assume that you have received permission from the bill payer for using the app. Whitetail Tactical cannot always take responsibility for the way you use the app i.e. You need to make sure that your device stays charged – if it runs out of battery and you can’t turn it on to avail the Service, Whitetail Tactical cannot accept responsibility. With respect to Whitetail Tactical’s responsibility for your use of the app, when you’re using the app, it’s important to bear in mind that although we endeavor to ensure that it is updated and correct at all times, we do rely on third parties to provide information to us so that we can make it available to you. Whitetail Tactical accepts no liability for any loss, direct or indirect, you experience as a result of relying wholly on this functionality of the app. At some point, we may wish to update the app. The app is currently available on Android & iOS – the requirements for both systems(and for any additional systems we decide to extend the availability of the app to) may change, and you’ll need to download the updates if you want to keep using the app. Whitetail Tactical does not promise that it will always update the app so that it is relevant to you and/or works with the Android & iOS version that you have installed on your device. However, you promise to always accept updates to the application when offered to you, We may also wish to stop providing the app, and may terminate use of it at any time without giving notice of termination to you. Unless we tell you otherwise, upon any termination, </p>
                    </div>
                    <p className='desc text-white py-5'> the rights and licenses granted to you in these terms will end;</p>
                    <p className='desc text-white'> you must stop using the app, and (if needed) delete it from your device. Changes to This Terms and Conditions I may update our Terms and Conditions from time to time. Thus, you are advised to review this page periodically for any changes. I will notify you of any changes by posting the new Terms and Conditions on this page. These terms and conditions are effective as of 10/01/2023</p>
                </Container>
            </div>
        </>
    );
}

export default page;
