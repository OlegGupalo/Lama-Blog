import axios from "axios"
import Store from 'components/Store'

export const fireFollowingPost = ({
	username, 
} = {}) => async (snackbar = () => {}, prefix = 'following') => {
    let apiPath = ''

    try {
        const token = localStorage.getItem('token')

        const request = await axios.post('http://localhost:4200/api/profiles/Lizuxa/follow', {}, {
            headers: {
                'Authorization': `Token ${token}`
            }
        })

        Store().dispatch({
            type: prefix + '.followPost',
            payload: {
                data: request.data.profile,
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
            type: prefix + '.followPost',
            payload: {
                data: null,
                loader: false
            }
        })
    }
}

export const reducerFollowPost = (state, action) => {
	return ({
		...state,
		...(action.payload || {}),
	});
};