import axios from "axios"
import Store from 'components/Store'
import { fireListTest } from "components/Store/test/actions/lis/get"
import { fireProp } from "./prop"
import { fireProp as firePropCrntUsr } from "components/Store/test/actions/lis/prop"

export const fireRegistration = (navigate = () => {}) => async(snackbar = () => {}, prefix = 'auth') => {
    fireProp('loader', true)()

    const payload = {...Store().getState()[prefix]}
    let apiPath = ''

    try {
        if (!payload.username
            || typeof payload.username !== 'string') {
            payload.error['username'] = 'Имя пользователя не указан.'
        }
        if (!payload.email
            || typeof payload.email !== 'string') {
            payload.error['email'] = 'Почта пользователя не указана.'
        }
        if (!payload.password) {
            payload.error['password'] = 'Пароль не указан.'
        }
        if (Object.keys(payload.error).length === 0) {
            const request = await axios.post('http://localhost:4200/api/users', {
                username: payload.username,
                email: payload.email,
                password: payload.password
            })

            localStorage.setItem('token', request.data.user.token)

            Store().dispatch({
                type: prefix + '.registration',
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
				type: prefix +'.registration',
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

export const reducerRegistration = (state, action) => {
	return ({
		...state,
		...(action.payload || {}),
		loader: false,
	});
};
