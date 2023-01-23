import Store from 'components/Store'

const DEFAULT_KEY = 0

export const fireSchema = () => async (prefix = 'test') => {
    Store().dispatch({
        type: prefix + '.schema' 
    })
}

export const reducerSchema = (state, action) => {
    return ({
        flag: false,
        list: {
            [DEFAULT_KEY]: {
                loader: false,
				data: '',
				errors: {},
            }
        }
    })
}