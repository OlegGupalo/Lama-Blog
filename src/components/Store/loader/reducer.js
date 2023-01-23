import main from 'components/Store/main/reducer.js';
import * as actionsLocal from './actions';

const reducer = () => main('loader', actionsLocal);

export default reducer;
