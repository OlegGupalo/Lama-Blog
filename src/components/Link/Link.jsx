import React from 'react'
import {Link as ReactRouterDomLink } from 'react-router-dom'
import { fireShow  as actionLoaderShow } from 'components/Store/loader/actions/show';
import { fireHide  as actionLoaderHide } from 'components/Store/loader/actions/hide';

let timeout;
let Link = ({
    onClick = () => {},
    ...props
}, ref) => {
    const onHandle = React.useCallback((e) => {
		actionLoaderShow('unmount')();
		clearTimeout(timeout);

		timeout = setTimeout(() => {
			actionLoaderHide('unmount')();
		}, 600);
		onClick(e);
	}, [
		onClick,
	]);

	return <React.Fragment>
		<ReactRouterDomLink 
			{ ...props }
			ref={ref}
			onClick={onHandle} />
	</React.Fragment>;
}

Link = React.memo(React.forwardRef(Link));
export default Link