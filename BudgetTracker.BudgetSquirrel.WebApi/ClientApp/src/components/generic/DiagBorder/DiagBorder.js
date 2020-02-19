import React from 'react';
import './DiagBorder.scss';

export default function DiagBorder({ fillInside, fillOutside, borderColor }) {
    let bottomLeftToTopRight = {
        filler: "0 10,100 0,0 0",
        border: "0 9,100 0,100 1,0 10"
    };

    return (
        <svg class="diag-border"
             xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 100 10"
             preserveAspectRatio="none"
             style={{"background-color": fillOutside}}>
            <polygon class="diag-border__outside"
                     points={bottomLeftToTopRight.filler}
                     fill={fillInside} />
            <polygon class="diag-border__outside" points={bottomLeftToTopRight.border}
                     fill={borderColor} />
        </svg>
    )
}
