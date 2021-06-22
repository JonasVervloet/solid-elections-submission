import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faFile} from '@fortawesome/free-solid-svg-icons'

import './FileButton.css'

const FileButton = ({name, openFile, selectFile}) => {

    const onClick = () => {
        selectFile(name);
    }

    const onDoubleClick = () => {
        openFile(name);
    }

    return (
        <div className='fileButtonContainer'>
            <button
                onClick={onClick}
                onDoubleClick={onDoubleClick}
                className='fileButton'
            >
                <FontAwesomeIcon
                    icon={faFile}
                    className='fileIcon'
                    size='2x'
                />
                <div className='fileName'>
                    {name}
                </div>
            </button>
        </div>
    )
}

export default FileButton;