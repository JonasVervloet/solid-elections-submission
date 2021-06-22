import React from 'react';

import FileSubject from './FileSubject';
import './FileData.css'

const FileData = ({fileManager}) => {
    const {getGroupedFileData, selectSubject} = fileManager;
    const [success, groupedFileData] = getGroupedFileData();

    if (success) {
        return (
            <div className='fileData'>
                {
                    groupedFileData.map(
                        subject => {
                            return (
                                <FileSubject 
                                    subject={subject}
                                    key={subject.url}
                                    selectSubject={selectSubject}
                                />
                            )
                        }
                    )
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

export default FileData;