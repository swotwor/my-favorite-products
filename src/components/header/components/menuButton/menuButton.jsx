import style from './index.module.scss';
import Dropdown from './components/dropdown/Dropdown';
import { useState, useEffect, useCallback, useRef } from 'react';

const MenuButton = () => {
    const [dropdownState, setDropdownState] = useState(false);
    const menuRef = useRef(null);

    const handleClickOutside = useCallback(event => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setDropdownState(false);
        }
    }, []);

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [handleClickOutside, dropdownState]);

    useEffect(() => {
        return () => {
            setDropdownState(false);
        }
    }, []);

    return (
        <div className={style.menuButtonWrapper} ref={menuRef} onClick={() => setDropdownState(prevState => !prevState)}>
            {dropdownState && <Dropdown />}
        </div>    
    );
};

export default MenuButton;
