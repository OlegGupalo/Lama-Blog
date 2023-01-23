import { createSelector } from 'reselect';

/**
 * @return {Function}
 */
const exists = () => createSelector(
	(state) => state['api'],
	(state) => !!(state ?? {}).list && !!(state ?? {}).user,
);

export default exists;
