import style from './index.module.scss';

const Dropdown = () => {
    const isAuth = document.cookie.split(';')[0].split('=')[1];

    const handleClickOnButton = () => {
        document.cookie = 'access_token' + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    }

    return (
        <div className={style.dropdownWrapperSettings}>
            {isAuth ? (
                <div className={style.dropdownWrapperSettings_account}>
                    <p>Ви авторизовані</p>
                    <button onClick={handleClickOnButton}>Вихід із аккаунту</button>
                </div>
            ) : (
                <a href="https://www.dropbox.com/oauth2/authorize?client_id=zcq3lp9ddt5q9sj&redirect_uri=http://localhost:5173&response_type=code">
                    Авторизація в DROPBOX
                </a>
            )}
        </div>
    );
};

export default Dropdown;
