import axios from "axios"
import Store from 'components/Store'
import selectorMainExtract from 'components/Store/main/selectors/extract.js';
import { useSelector } from 'react-redux'

export const fireFollowingGet = ({
	username, 
} = {}) => async (snackbar = () => {}, prefix = 'following') => {
    let apiPath = ''
    try {
        
        const token = localStorage.getItem('token')
        apiPath = `http://localhost:4200/api/profiles/${username}`
        const request = await axios.get(apiPath, {
            headers: {
                'Authorization': `Token ${token}`
            }
        })

        Store().dispatch({
            type: prefix + '.followingGet',
            payload: {
                data: request.data,
                loader: true
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
            type: prefix + '.followingGet',
            payload: {
                data: null,
                loader: false
            }
        })
    }
}

export const reducerFollowingGet = (state, action) => {
	return ({
		...state,
		...(action.payload || {}),
	});
};