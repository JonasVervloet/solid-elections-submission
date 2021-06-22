import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faFolder} from '@fortawesome/free-solid-svg-icons'

import './FolderButton.css'

const FolderButton = ({name, openFolder, selectFolder}) => {

    const onClick = () => {
        selectFolder(name);
    }

    const onDoubleClick = () => {
        openFolder(name);
    }

    return (
        <div className="folderButtonContainer">
            <button 
                onClick={onClick}
                onDoubleClick={onDoubleClick}
                className="folderButton"
            >
                <FontAwesomeIcon 
                    icon={faFolder}
                    className='folderIcon'
                    size='2x'
                />
                <div
                    className='folderName'
                >
                    {name}
                </div>
            </button>
        </div>
    )
}

export default FolderButton;