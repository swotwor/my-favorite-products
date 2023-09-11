import style from './index.module.scss';
import ViewMode from './components/viewMode/ViewMode';
import EditMode from './components/editMode/EditMode';
import { useState } from 'react';

const ListItem = ({ listItem }) => {
    const [editMode, setEditMode] = useState(false);

    const handleClickOnEditList = () => {
        setEditMode(prev => !prev);
    };

    console.log(listItem);

    return (
        <div className={style.listItemWrapper}>
            {
                editMode
                ? <EditMode handleClickOnEditList={handleClickOnEditList} listItem={listItem}/>
                : <ViewMode handleClickOnEditList={handleClickOnEditList} listItem={listItem}/>
            }
            
        </div>
    );
};

export default ListItem;