import Store from 'components/Store'

export const fireShow = (id) => async (progressPercentage, text, prefix='loader') => {
    Store().dispatch({
        type: prefix + '.show',
        payload: {
            id,
            progressPercentage,
            text
        }
    })
}

export const reducerShow = (state, action) => {
    const loaderKey = ((typeof action.payload.id === 'string' && action.payload)
     || typeof action.payload === 'number')
     ? action.payload
     : 'window'

     return ({
        ...state,
        [loaderKey]: {
            _progressPercentage: 0,
            text: '',
            ...action.payload,
            visible: true
        },
        _updater: state._updater + 1
     })
}