   // const [selectedFile, setSelectedFile] = useState(null);

    // function handleFileInputChange(event) {
    //     setSelectedFile(event.target.files[0]);
    //     console.log(event.target.files);
    // }

    // console.log('fsdfsd', store.productData.apiKey)

    // const handleFormSubmit = async (event: any)  => {
    //     event.preventDefault();

    //     const formData = new FormData();
    //     formData.append('file', selectedFile);
    //     console.log(formData);

    //     const res = await fetch('/api/user', {
    //         method: 'POST',
    //         body: formData,
    //     })
    //         .then((response) => response.json())
    //         .then((data) => console.log(data))
    //         .catch((error) => console.error(error));
    // }

    // async function uploadFile() {
    //     const headers = {
    //         Authorization: `Bearer ${accessToken}`,
    //         'Content-Type': 'application/json',
    //     };
    //     const metadata = {
    //         name: file.name,
    //         mimeType: file.type,
    //         parents: ['root'],
    //     };
    //     const response = await fetch(
    //         `${DRIVE_UPLOAD_API_ENDPOINT}?uploadType=resumable`,
    //         {
    //             method: 'POST',
    //             headers: headers,
    //             body: JSON.stringify(metadata),
    //         }
    //     );
    //     const location: any = response.headers.get('location');
    //     await fetch(location, {
    //         method: 'PUT',
    //         headers: {
    //             'Content-Type': file.type,
    //             'Content-Length': file.size,
    //             'X-Upload-Content-Type': file.type,
    //             Authorization: `Bearer ${accessToken}`,
    //         },
    //         body: file,
    //     });
    //     alert(`File ${file.name} has been uploaded to Google Drive!`);
    // }

                {/* <form onSubmit={handleFormSubmit}>
                <label>
                    Выберите файл:
                    <input
                        type="file"
                        onChange={handleFileInputChange}
                        accept="image/*, .png, .jpg, .gif, .web, .jpeg"
                    />
                </label>
                <p>{store.productData.apiKey}</p>
                <button type="submit" disabled={!selectedFile}>
                    Отправить файл
                </button>
            </form> */}