import React from 'react';
import style from './style.module.css';

function Button({ children, type }) 
{
    return (
        <button className={style.animatedButton} type={type}>
            {children}
        </button>
    );
}

export default Button;