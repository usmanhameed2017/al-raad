import style from './style.module.css';

function Button({ children, type, onClick, disabled }) 
{
    return (
        <button className={style.themeBtn} type={type} onClick={onClick} disabled={disabled}>
            {children}
        </button>
    );
}

export default Button;