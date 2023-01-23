import main from 'components/Store/main/reducer.js';
import * as actionsLocal from './actions';

const reducer = () => main('personal', actionsLocal);
export default reducer;
