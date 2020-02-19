import React from 'react'
import './VerticalPageSection.scss';

export default function VerticalPageSection({ isrootContainsContent=true, extraClasses, children }) {
    function getClassNames() {
        let classNames = "vert-section";
        if (isrootContainsContent) {
            classNames += " vert-section__content";
        }
        if (extraClasses) {
            classNames += " " + extraClasses;
        }
        return classNames;
    }

    return (
        <div class={getClassNames()}>
            {children}
        </div>
    )
}
