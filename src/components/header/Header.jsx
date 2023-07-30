import style from './index.module.scss';
import Title from './components/title/Title';
import MenuButton from './components/menuButton/menuButton';
import SettingsButton from './components/settingsButton/SettingsButton';

const Header = () => {
    return (
        <div className={style.headerWrapper}>
            <MenuButton />
            <Title />
            <SettingsButton />
        </div>
    );
};

export default Header;
