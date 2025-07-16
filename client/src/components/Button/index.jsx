import React from 'react';
import style from './style.module.css';

function Button01({ children, onClick }) 
{
    return (
        <button className={style.animatedButton} onClick={onClick}>
            {children}
        </button>
    );
}

export default Button01;