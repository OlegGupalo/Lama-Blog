import { createSelector } from 'reselect';

/**
 * @return {Function}
 */
const exists = () => createSelector(
	(state) => state['auth'],
	(state) => typeof (state ?? {}).loader === 'boolean',
);

export default exists;
