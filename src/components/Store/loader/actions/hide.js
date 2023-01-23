import Store from 'components/Store'

export const fireHide = (id) => async (prefix='loader') => {
    Store().dispatch({
        type: prefix + '.hide',
        payload: id
    })
}

export const reducerHide = (state, action) => {
    const loaderKey = ((typeof action.payload.id === 'string' && action.payload)
     || typeof action.payload === 'number')
     ? action.payload
     : 'window'

     return ({
        ...state,
        [loaderKey]: {
            _progressPercentage: -1,
            text: '',
            visible: false
        },
        _updater: state._updater + 1
     })
}