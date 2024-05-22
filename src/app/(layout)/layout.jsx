'use client'

import React, { useEffect, useState } from 'react';
import LayoutFooter from '@/components/layout/LayoutFooter';
import LayoutHeader from '@/components/layout/LayoutHeader';
import Loader from '@/components/loader/Loader';
import TapTop from '@/components/common/TapTop';

const layout = ({ children }) => {
    const [loader, setLoader] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setLoader(false)
        }, 5000);
    })
    return (
        <>
            {loader ? <Loader /> :
                <>
                    <LayoutHeader />
                    <main className="layout-wrapper min-h-[500px]">
                        <div className="layout-pages-wrapper">
                            {children}
                        </div>
                    </main>
                    <LayoutFooter />
                    <TapTop />
                </>
            }
        </>
    );
}

export default layout;
