const LoadSaveReducer = (state={}, action) => {
    const {id, type, load} = action
    if (! id) return state;

    const idObject = state[id]

    switch(type) {
        case 'INIT': {
            if (idObject) return state;
            return {
                ...state,
                [id]: {
                    loading: false,
                    saving: false,
                    uri: null,
                    data: null,
                    tempData: null
                }
            }
        }
        case 'LOAD':
            return {
                ...state,
                [id]: {
                    ...idObject,
                    loading: load ? true : false
                }
            }
        case 'SAVE':
            return {
                ...state,
                [id]: {
                    ...idObject,
                    saving: load ? true : false
                }
            }
        case 'SET_URI':
            return {
                ...state,
                [id]: {
                    ...idObject,
                    uri: load
                }
            }
        case 'STORE_DATA':
            return {
                ...state,
                [id]: {
                    ...idObject,
                    tempData: load
                }
            }
        case 'LOAD_DATA':
            return {
                ...state,
                [id]: {
                    ...idObject,
                    data: load
                }
            }
        default:
            return state;
    }
}

export default LoadSaveReducer;