import main from 'components/Store/main/reducer.js';
import * as actionsLocal from './actions';

const reducer = () => main('auth', actionsLocal);

export default reducer;
