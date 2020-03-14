import React from 'react';
import './BasicCheckbox.scss';

export default function BasicCheckbox({title, onCheck}) {
    
    return (
        <div class="basic-checkbox">
            <input type="checkbox" />
            <label>{title}</label>
        </div>
    )
}