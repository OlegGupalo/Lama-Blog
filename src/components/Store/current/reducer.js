import main from 'components/Store/main/reducer.js';
import * as actionsLocal from './actions';

const reducer = () => main('current', actionsLocal);
export default reducer;
