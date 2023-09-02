import style from './index.module.scss';
import ViewCard from '../../../../components/productCard/ViewCard';

const ListItem = ({ listItem }) => {
    const { title, productList } = listItem;

    return (
        <div className={style.listItemWrapper}>
            <div className={style.listItemWrapper_inner}>
                <p className={style.listItemWrapper_title}>{title}</p>
                {/* <ViewCard productItem={productList}/> */}
            </div>
        </div>
    );
};

export default ListItem;