import React from 'react'

import './FileList.css'
import FileButton from './FileButton'

const FileList = ({fileManager}) => {
    const {getFileNames, openFile, selectFile} = fileManager;
    const [success, fileNames] = getFileNames();

    if (success) {
        return (
            <div className='fileList'>
                {
                    fileNames.map(name => {
                        return (
                            <FileButton
                                name={name}
                                key={name}
                                openFile={openFile}
                                selectFile={selectFile}
                            />
                        )
                    })
                }
            </div>
        )
    } else {
        return (
            <div>
                NO DATA
            </div>
        )
    }
}

export default FileList;