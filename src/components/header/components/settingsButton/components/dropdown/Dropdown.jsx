import style from './index.module.scss';
import { setAuthData } from '../../../../../../store/store';
import { GoogleLogin } from '@react-oauth/google';
import { useDispatch, useSelector } from 'react-redux';

const Dropdown = () => {
    const { authData } = useSelector(
        state => state.products
    );
    const dispatch = useDispatch();

    const responseMessage = response => {
        console.log(response)
        // dispatch(setApiKey(response.credential));
        dispatch(setAuthData({
            clientId: response.clientId,
            credential: response.credential
        }));
        sessionStorage.setItem('api', response.credential);
    };
    const errorMessage = error => {
        alert(error);
    };
    const handleClickOnLogout = () => {
        sessionStorage.removeItem('api');
        dispatch(setAuthData({
            clientId: '',
            credential: '',
        }));
    };

    return (
        <div className={style.dropdownWrapperSettings}>
            {authData.credential ? (
                <p onClick={handleClickOnLogout}>Вийти</p>
            ) : (
                <div onClick={() => ''}>
                    <GoogleLogin
                        onSuccess={responseMessage}
                        onError={errorMessage}
                    />
                </div>
            )}
        </div>
    );
};

export default Dropdown;
