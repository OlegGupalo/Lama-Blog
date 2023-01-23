import main from 'components/Store/main/reducer.js';
import * as actionsLocal from './actions';

const reducer = () => main('following', actionsLocal);
export default reducer;
