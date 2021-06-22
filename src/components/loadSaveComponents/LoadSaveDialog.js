import React from 'react'
import {useDispatch} from 'react-redux'

import useSolidBrowser from '../../utils/useSolidBrowser'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faLongArrowAltLeft} from '@fortawesome/free-solid-svg-icons'

import './LoadSaveDialog.css'
import FolderList from './dialogComponents/FolderList'
import FileList from './dialogComponents/FileList'
import FileData from './dialogComponents/FileData'
import {setLoadSaveURI} from '../../actions/loadSaveActions'

const LoadSaveDialog = ({id, load}) => {

    const {goBack, uri, foldersManager, filesManager, fileDataManager} = useSolidBrowser();
    const dispatch = useDispatch()

    const selectItem = () => {
        dispatch(setLoadSaveURI(id, uri));
    }

    return (
        <div className="browserContainer vl-region vl-region--alt vl-col--4-12">
            <h3 className="vl-title vl-title--h3 vl-title--has-border">
                Select Storage
            </h3>
            <div className='goBackContainer'>
                <button 
                    onClick={goBack}
                    className='goBackButton'
                >
                    <FontAwesomeIcon
                        icon={faLongArrowAltLeft}
                        className='goBackIcon'
                        size='2x'
                    />
                </button>
            </div>
            <div className="listsContainer">
                <FolderList
                    folderManager={foldersManager} 
                />
                <FileList
                    fileManager={filesManager}
                />
                <FileData
                    fileManager={fileDataManager}
                />
            </div>
            <div className='buttonsContainer'>
                <button 
                    className='vl-button vl-button--block'
                    onClick={selectItem}
                >
                        SELECT
                    </button>
            </div>
            {/* <div className='buttonsContainer'>
                <div className="vl-form-col--4-12">
                    <button className='vl-button vl-button--block'>
                        CREATE FOLDER
                    </button>
                </div>
                <div className="vl-form-col--4-12">
                    <button className='vl-button vl-button--block'>
                        CREATE FILE
                    </button>
                </div>
            </div> */}
        </div>
    )
}

export default LoadSaveDialog;