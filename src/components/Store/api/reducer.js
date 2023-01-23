import main from 'components/Store/main/reducer.js';
import * as actionsLocal from './actions';

const reducer = () => main('api', actionsLocal);
export default reducer;
