import React from 'react';

const BlurWhite = (props) => {
    return (
        <svg {...props} viewBox="0 0 907 907" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g opacity="0.15" filter="url(#filter0_f_2_113)">
                <circle cx="453.481" cy="453.481" r="213.481" fill="white" />
            </g>
            <defs>
                <filter id="filter0_f_2_113" x="0" y="0" width="906.963" height="906.963" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                    <feGaussianBlur stdDeviation="120" result="effect1_foregroundBlur_2_113" />
                </filter>
            </defs>
        </svg>

    );
}

export default BlurWhite;
