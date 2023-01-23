import Store from 'components/Store';

/**
 * @return {Function}
 */
export const fireClear = () => async (prefix = 'auth') => {
	Store().dispatch({
		type: prefix +'.clear',
	});
};

/**
 * @param {object} state - Current redux state
 * @param {object} action - Action data
 * @return {object} New state
 */
export const reducerClear = (state, action) => {
	return ({
		...state,
		form: {
			loader: false,
			error: {},
			authFlag: false,
		},
	});
};
