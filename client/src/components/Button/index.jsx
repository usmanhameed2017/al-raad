import style from './style.module.css';

function Button({ children, type, onClick }) 
{
    return (
        <button className={style.themeBtn} type={type} onClick={onClick}>
            {children}
        </button>
    );
}

export default Button;