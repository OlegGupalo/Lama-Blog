import axios from "axios"
import Store from 'components/Store'

export const fireListCurrent = ({
	slug, 
} = {}) => async (snackbar = () => {}, prefix = 'current') => {
    let apiPath = ''
    try {
        apiPath = `http://localhost:4200/api/articles/${slug}`
        const request = await axios.get(apiPath)

        Store().dispatch({
            type: prefix + '.listCurrent',
            payload: {
                data: request.data.article
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
            type: prefix + '.listCurrent',
            payload: {
                data: null
            }
        })
    }
}

export const reducerListCurrent = (state, action) => {
	return ({
		...state,
		...(action.payload || {}),
	});
};