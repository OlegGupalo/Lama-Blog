import Store from 'components/Store'

const DEFAULT_KEY = 0

export const fireSchema = () => async (prefix = 'loader') => {
    Store().dispatch({
        type: prefix + '.schema' 
    })
}

export const reducerSchema = (state, action) => {
    return ({
        _updater: 0,
        window: {
            visible: true,
            _progressPercentage: -1,
            text: ''
        }
    })
}