import style from './index.module.scss';
import AddList from './components/addList/AddList';
import ListItem from './components/listItem/ListItem';
import { useState } from 'react';
import { useSelector } from 'react-redux';


const Lists = () => {
    const [addMode, setAddtMode] = useState(false);
    const lists = useSelector(state => state.products.appData.dataBase.lists);

    const handleClick = () => {
        setAddtMode(true);
    };

    return (
        <div className={style.listsWrapper}>
            <button className={style.listsWrapper_button} onClick={handleClick}>
                Додати список
            </button>
            {
                addMode
                ? <AddList setAddtMode={setAddtMode} lists={lists}/>
                : <>
                    {
                        lists.map(listItem => <ListItem key={listItem.id} listItem={listItem}/>)
                    }
                </>
            }
            
        </div>
    );
};

export default Lists;