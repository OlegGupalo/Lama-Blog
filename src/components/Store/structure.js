import main from './main/reducer.js';
import api from './api/reducer.js';
import loader from './loader/reducer.js'
import auth from './auth/reducer.js'
import test from './test/reducer.js' 
import personal from './personal/reducer.js'
import current from './current/reducer.js'
import following from './following/reducer.js'

const structure = {
	main,
	api,
	loader,
	auth,
	test,
	personal,
	current,
	following
};

export default structure;
