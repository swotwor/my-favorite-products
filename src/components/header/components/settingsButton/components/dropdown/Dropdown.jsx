import style from './index.module.scss';

const Dropdown = () => {
    const VITE_REQUEST_ADDRESS_IMGUR = import.meta.env.VITE_REQUEST_ADDRESS_IMGUR;
    const isAuth = document.cookie.split(';')[0].split('=')[1];
    const handleClickOnButton = () => {
        document.cookie = 'access_token' + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        localStorage.removeItem('userName');
        localStorage.removeItem('appData');
    }

    return (
        <div className={style.dropdownWrapperSettings}>
            {isAuth ? (
                <div className={style.dropdownWrapperSettings_account}>
                    <p>Ви авторизовані</p>
                    <button onClick={handleClickOnButton}>Вихід із аккаунту</button>
                </div>
            ) : (
                <a href={VITE_REQUEST_ADDRESS_IMGUR}>
                    Авторизація в системі
                </a>
            )}
        </div>
    );
};

export default Dropdown;
