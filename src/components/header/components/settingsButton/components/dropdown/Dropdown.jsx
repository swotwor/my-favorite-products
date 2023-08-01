import style from './index.module.scss';

const Dropdown = () => {
    const isAuth = document.cookie.split(';')[0].split('=')[1];

    return (
        <div className={style.dropdownWrapperSettings}>
            {isAuth ? (
                <>
                    <div>Ви авторизовані</div>
                    <p>Вихід із аккаунту</p>
                </>
            ) : (
                <a href="https://www.dropbox.com/oauth2/authorize?client_id=zcq3lp9ddt5q9sj&redirect_uri=http://localhost:5173&response_type=code">
                    Авторизація в DROPBOX
                </a>
            )}
        </div>
    );
};

export default Dropdown;
