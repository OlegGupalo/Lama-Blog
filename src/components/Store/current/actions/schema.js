import Store from 'components/Store'

const DEFAULT_KEY = 0

export const fireSchema = () => async (prefix = 'current') => {
    Store().dispatch({
        type: prefix + '.schema' 
    })
}

export const reducerSchema = (state, action) => {
    return ({
        loader: false,
        data: '',
        errors: {},
    })
}