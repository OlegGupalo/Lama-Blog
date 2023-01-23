import axios from "axios"
import Store from 'components/Store'
import { fireListTest } from "components/Store/test/actions/lis/get"
import { fireProp } from "./prop"
import { fireProp as firePropCrntUsr } from "components/Store/test/actions/lis/prop"

export const fireLogin = (navigate = () => {}) => async(snackbar = () => {}, prefix = 'auth') => {
    fireProp('loader', true)()

    const payload = {...Store().getState()[prefix]}
    let apiPath = ''

    try {
        if (!payload.email
            || typeof payload.email !== 'string') {
            payload.error['email'] = 'email пользователя не указан.'
        }
        if (!payload.password) {
            payload.error['password'] = 'Пароль не указан.'
        }
        if (Object.keys(payload.error).length === 0) {
            const request = await axios.post('http://localhost:4200/api/users/login', {
                email: payload.email,
                password: payload.password
            })

            localStorage.setItem('token', request.data.user.token)

            Store().dispatch({
                type: prefix + '.login',
                payload: {
                    login: true,
                    authFlag: true,
                    token: request.data.user.token,
                }
            })
            fireListTest({
                section: 'user',
                url: `http://localhost:4200`
            })()
            navigate('/')
            firePropCrntUsr('flag', true)()
        } else {
            Store().dispatch({
				type: prefix +'.login',
				payload,
			})
        }
    } catch (err) {
        const errorMessage = err.response
			? (err.response.data
				? err.response.data.message || (err.response.data.error
					? err.response.data.error.text
					: err.message)
				: err.message)
			: err.message;

		fireProp('loader', false)();

		return snackbar(errorMessage, { variant: 'error' });
    }
}

export const reducerLogin = (state, action) => {
	return ({
		...state,
		...(action.payload || {}),
		loader: false,
	});
};
