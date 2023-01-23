import main from 'components/Store/main/reducer.js';
import * as actionsLocal from './actions';

const reducer = () => main('test', actionsLocal);
export default reducer;
