import axios from "axios"
import Store from 'components/Store'

export const firePersonalGet = ({
    section, 
	url,
    author
} = {}) => async (snackbar = () => {}, prefix = 'personal') => {
    let apiPath = ''
    try {
        apiPath = `${url}/api/articles?author=${author}`
        const request = await axios.get(apiPath)

        Store().dispatch({
            type: prefix + '.personalGet',
            payload: {
                section,
                data: request.data
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
            type: prefix + '.personalGet',
            payload: {
                section,
                data: []
            }
        })
    }
}

export const reducerPersonalGet = (state, action) => {
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
			data: null,
			errors: {},
			...(action.payload || {}),
			loader: false,
		};
	}
	else {
		state.list[0] = {
			loader: false,
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