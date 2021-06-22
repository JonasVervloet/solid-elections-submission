import React from 'react';

import './TripleInfo.css'

const TripleInfo = ({triple}) => {

    return (
        <div className='tripleInfoContainer'>
            <div>
                {triple.predicate}
            </div>
            <div className='tripleObject'>
                {triple.object}
            </div>
        </div>
    )
}

export default TripleInfo