import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Image } from 'react-feather';

interface DropzoneProps{
    setImageFiles: Function
}

const MyDropzone: React.FC<DropzoneProps> = ({ setImageFiles }) => {
    const [acceptedFiles, setAcceptedFiles] = useState<Array<File>>([]);
    const onDrop = useCallback(acceptedFiles => {
        if (acceptedFiles.length > 1) {
            return console.error('uploaded too many files!');;
        } else {
            setAcceptedFiles(acceptedFiles)
            setImageFiles(acceptedFiles);
        }
    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: 'image/png',
        minSize: 0,
        maxSize: 1048576,
    })

    return (
        <React.Fragment>
            <div className="react-dropzone" {...getRootProps()}>
                <input {...getInputProps()} />
                {
                    isDragActive ? <p>Drop it like it's hot ...</p> : <p>Drag 'n' drop een foto hier, of klik hier om 1 te selecteren.</p>
                }
            </div>
            <ul className="react-dropzone-files">
                {acceptedFiles.length > 0 && acceptedFiles.map((acceptedFile: File) => (
                    <li key={acceptedFile.name}> <Image size='20' /><span>{acceptedFile.name}</span></li>
                ))}
            </ul>
        </React.Fragment>
    )
}

export default MyDropzone;