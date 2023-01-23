import axios from "axios"
import Store from 'components/Store'
import { fireProp } from "./prop"

export const fireListTest = ({
    section, 
	url, 
	path,
	page = 1, 
	limit = 20,
} = {}) => async (snackbar = () => {}, prefix = 'test') => {
    let apiPath = ''
    try {
        apiPath = `${url}/api/user`
        const token = localStorage.getItem('token')
        const request = await axios.get(apiPath, {
            headers: {
                'Authorization': `Token ${token}`
            }
        })
        console.log(request.data.user)
        Store().dispatch({
            type: prefix + '.listTest',
            payload: {
                section,
                data: request.data.user
            }
        })
        fireProp('flag', true)()
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
            type: prefix + '.listTest',
            payload: {
                section,
                data: null
            }
        })
    }
}

export const reducerListTest = (state, action) => {
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
			errors: {},
			...(action.payload || {}),
			loader: true,
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