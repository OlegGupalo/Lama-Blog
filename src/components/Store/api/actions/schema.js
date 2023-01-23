import Store from 'components/Store'

const DEFAULT_KEY = 0

export const fireSchema = () => async (prefix = 'api') => {
    Store().dispatch({
        type: prefix + '.schema' 
    })
}

export const reducerSchema = (state, action) => {
    return ({
        list: {
            [DEFAULT_KEY]: {
                loader: false,
				page: 1,
				limit: 20,
				total: 0,
				query: '',
				filter: {},
				sort: {},
				relations: {},
				data: 'popa',
				errors: {},
            }
        },
        user: {
            [DEFAULT_KEY]: {
                loader: false,
				page: 1,
				limit: 20,
				total: 0,
				query: '',
				filter: {},
				sort: {},
				relations: {},
				data: 'popa',
				errors: {},
            }
        }
    })
}