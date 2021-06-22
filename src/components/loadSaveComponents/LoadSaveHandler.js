import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'

import LoadSaveDialog from './LoadSaveDialog'
import {initialiseLoadSave} from '../../actions/loadSaveActions'

const LoadSaveHandler = ({id, children}) => {

    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(initialiseLoadSave(id));
    }, []);

    const data = useSelector(state => state.loadsave['userInfo']);
    const {loading, saving, uri} = data ? data : {loading: false, saving: false, uri: null}

    if (loading && !uri) {
        return <LoadSaveDialog id={id} loading={true} />
    }

    if (saving && !uri) {
        return <LoadSaveDialog id={id} laoding={false} />
    }

    return (
        <div>
            {children}
        </div>
    )
}

export default LoadSaveHandler;