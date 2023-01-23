import axios from "axios"
import Store from 'components/Store'

export const fireListGet = ({
    section, 
	url, 
	path,
	page = 1, 
	limit = 20, 
} = {}) => async (snackbar = () => {}, prefix = 'api') => {
    let apiPath = ''
    try {
        apiPath = `${url}/api/articles`
        const request = await axios.get(apiPath)

        Store().dispatch({
            type: prefix + '.listGet',
            payload: {
                section,
                page,
                limit,
                total: request.data.articles.length,
                data: request.data.articles
            }
        })
    } catch (err) {
        const errorMessage = err.response
            ? (err.response.data
                ? err.response.data.message || (err.response.data.error
                    ? err.response.data.error.text
                    : err.message)
                : err.message)
            : err.message

        snackbar(`${errorMessage} - ${apiPath}`, {variant: 'error'})

        Store().dispatch({
            type: prefix + '.listGet',
            payload: {
                section,
                data: []
            }
        })
    }
}

export const reducerListGet = (state, action) => {
	if (state.list[action.payload.section]) {
		state.list[action.payload.section] = {
			...state.list[action.payload.section],
			...(action.payload || {}),
			loader: false,
		};
	}
	else if ((typeof action.payload.section === 'number' 
			&& !Number.isNaN(action.payload.section))
		|| (typeof action.payload.section === 'string'
			&& action.payload.section)){
		state.list[action.payload.section] = {
			page: 1,
			limit: 20,
			total: 0,
			query: '',
			filter: {},
			sort: {},
			relations: {},
			data: null,
			errors: {},
			...(action.payload || {}),
			loader: false,
		};
	}
	else {
		state.list[0] = {
			loader: false,
			page: 1,
			limit: 20,
			total: 0,
			query: '',
			filter: {},
			sort: {},
			relations: {},
			data: null,
			errors: {},
		};
	}
	return ({
		...state,
		list: {
			...state.list,
		},
	});
};