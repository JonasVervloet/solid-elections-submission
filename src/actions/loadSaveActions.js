export const initialiseLoadSave = (id) => {
    return {
        type: 'INIT',
        id: id
    }
}

export const changeLoadStatus = (id, status) => {
    return {
        type: 'LOAD',
        id: id,
        load: status
    }
}

export const changeSaveStatus = (id, status) => {
    return {
        type: 'SAVE',
        id: id,
        load: status
    }
}

export const setLoadSaveURI = (id, uri) => {
    return {
        type: 'SET_URI',
        id: id,
        load: uri
    }
}

export const storeTemporyData = (id, tempData) => {
    return {
        type: 'STORE_DATA',
        id: id,
        load: tempData
    }
}

export const setLoadedData = (id, loadedData) => {
    return {
        type: 'LOAD_DATA',
        id: id,
        load: loadedData
    }
}