import React, { useEffect } from 'react';
import { Provider as ProviderStore } from 'react-redux';
import { setStore } from './Store.js';
import { fireSchema as actionApiSchema } from './api/actions/schema.js';
import { fireSchema as actionLoaderSchema } from './loader/actions/schema.js';
import { fireSchema as actionAuthSchema } from './auth/actions/schema.js';
import { fireSchema as actionTestSchema } from './test/actions/schema.js';
import { fireSchema as actionPersonalSchema } from './personal/actions/schema.js';
import { fireSchema as actionCurrentSchema } from './current/actions/schema.js';
import { fireSchema as actionFollowingSchema } from './following/actions/schema.js';

let Provider = ({ children }) => {
	
	useEffect(() => {
		actionLoaderSchema()()
		actionApiSchema()()
		actionAuthSchema()()
		actionTestSchema()()
		actionPersonalSchema()()
		actionCurrentSchema()()
		actionFollowingSchema()()
	}, [])


	return <ProviderStore store={setStore()}>
		{children}
	</ProviderStore>
};

Provider = React.memo(Provider);
Provider.defaultProps = {
};

export default Provider;
