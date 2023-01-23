import Store from 'components/Store'

const DEFAULT_KEY = 0

export const fireSchema = () => async (prefix = 'personal') => {
    Store().dispatch({
        type: prefix + '.schema' 
    })
}

export const reducerSchema = (state, action) => {
    return ({
        list: {
            [DEFAULT_KEY]: {
                loader: false,
                data: [],
                error: {}    
            }
        }
        
    })
}