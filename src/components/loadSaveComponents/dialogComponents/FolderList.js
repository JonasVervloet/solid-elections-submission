import React from 'react'
import FolderButton from './FolderButton'

import './FolderList.css'

const FolderList = ({folderManager}) => {
    const {openFolder, selectFolder, getFolderNames} = folderManager;
    const [success, folderNames] = getFolderNames();

    if (success){
        return (
            <div className="folderList">
                {
                    folderNames.map(name => {
                        return (
                            <FolderButton
                                name={name}
                                openFolder={openFolder}
                                selectFolder={selectFolder}
                                key={name}
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

export default FolderList;