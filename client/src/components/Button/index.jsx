import style from './style.module.css';

function Button({ children, type }) 
{
    return (
        <button className={style.themeBtn} type={type}>
            {children}
        </button>
    );
}

export default Button;