import {useSelector, useDispatch} from 'react-redux'

import {changeLoadStatus, changeSaveStatus, storeTemporyData, setLoadedData} from '../actions/loadSaveActions'


const useLoadSaveHandler = (id) => {
    const dispatch = useDispatch();

    const selectorData = useSelector(state => state.loadsave[id]);
    const {loading, saving, uri} = selectorData ? selectorData : {loading: false, saving: false, uri: null};

    const fetchLoadUri = () => {
        dispatch(changeLoadStatus(id, true));
    }

    const loadData = (loadedData) => {
        dispatch(setLoadedData(id, loadedData));
        dispatch(changeLoadStatus(id, false));
    }

    const fetchSaveUri = (temp) => {
        dispatch(storeTemporyData(id, temp));
        dispatch(changeSaveStatus(id, true));
    }

    const stopSaving = () => {
        dispatch(changeSaveStatus(id, false));
    }
    
    return {
        loading,
        saving,
        uri,
        helperFunctions: {
            fetchLoadUri,
            loadData,
            fetchSaveUri,
            stopSaving
        }
    }
}

export default useLoadSaveHandler;