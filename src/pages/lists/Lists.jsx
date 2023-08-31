import style from './index.module.scss';
import AddList from './components/addList/AddList';
import ListItem from './components/listItem/ListItem';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const Lists = () => {
    const [editMode, setEditMode] = useState(false);
    const lists = useSelector(state => state.products.appData.dataBase.lists);

    const handleClick = () => {
        setEditMode(true);
    };

    return (
        <div className={style.listsWrapper}>
            {
                editMode
                ? <AddList setEditMode={setEditMode}/>
                : <>
                    <button className={style.listsWrapper_button} onClick={handleClick}>
                        Додати список
                    </button>
                    {
                        lists.map(listItem => {
                            <ListItem listItem={listItem}/>
                        })
                    }
                </>
            }
            
        </div>
    );
};

export default Lists;