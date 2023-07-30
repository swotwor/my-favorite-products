import style from './index.module.scss';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const EditCard = () => {
    const [selectedFiles, setSelectedFiles] = useState();
    const {
        // clientId,
        credential,
    } = useSelector(state => state.products.authData);

    function handleFileInputChange(event) {
        setSelectedFiles(event.target.files);
    }

    function handleFormSubmit() {
        const formData = new FormData();
        formData.append('file', selectedFiles[0]);

        console.log(formData);
        console.log(selectedFiles[0]);

        fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=media', {
            method: 'POST',
            headers: {
                'Content-Type': selectedFiles[0].type,
                'Content-Length': selectedFiles[0].size,
                'Authorization': credential,
            },
            body: formData,
        }).then((response) => {
            console.log(response);
            // alert('Данные успешно отправлены на сервер')
        });
    }

    return (
        <div className={style.editCard}>
            <div className={style.editCard_productPhoto}>
                {/* <img src={img} alt="product_img" /> */}
                <input type="file" onChange={handleFileInputChange} />
                <button onClick={handleFormSubmit}>Загрузить</button>
            </div>
        </div>
    );
};

export default EditCard;