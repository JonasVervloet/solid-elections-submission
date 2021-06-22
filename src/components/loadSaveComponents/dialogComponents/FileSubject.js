import React from 'react';

import TripleInfo from './TripleInfo'
import './FileSubject.css'

const FileSubject = ({subject, selectSubject}) => {

    const onClick = () => {
        selectSubject(subject.url)
    }

    return (
        <div 
            className='fileSubjectContainer'
        >
            <button
                onClick={onClick}
                className="fileSubjectButton"
            >
                <div className='subjectName'>
                    {subject.name}
                </div>
                {
                    subject.triples.map(
                        triple => {
                            return (
                                <TripleInfo
                                    triple={triple} 
                                />
                            )
                        }
                    )
                }
            </button>
        </div>
    )
}

export default FileSubject;