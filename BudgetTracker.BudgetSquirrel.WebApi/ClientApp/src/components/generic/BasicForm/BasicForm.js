import React from 'react';
import './BasicForm.scss';

export default function BasicForm({ title, description, children}) {
    function getChildren(key) {
        return children.filter( comp => {
                return comp.key === key;
        });
     }

    return (
        <div class="form">
            <div>
                <h2 class="basic-form__title">{title}</h2>
                <p class="basic-form__description">{description}</p>
            </div>

            <div class="form__inputs">
                {getChildren("inputs")}
            </div>

            <div class="form__actions">
                {getChildren("buttons")}
            </div>
        </div>
    )
}
