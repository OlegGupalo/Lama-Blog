import Store from 'components/Store'

export const fireSchema = () => async(prefix = 'auth') => {
    Store().dispatch({
        type: prefix + '.schema',
    })
}

export const reducerSchema = (state, action) => {
    return ({
        loader: false,
        error: {},
        authFlag: false
    })
}