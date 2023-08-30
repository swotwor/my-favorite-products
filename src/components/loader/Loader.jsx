import style from './index.module.scss';

const Loader = () => {
    return (
        <div className={style.wrapperLoader}>
            <div className={style.loader} />
        </div>
    );
};

export default Loader;