import React, { Fragment, useCallback, useEffect, useState } from 'react'
import { useSnackbar } from 'notistack';
import { useSelector } from 'react-redux'
import { createSelector } from 'reselect';
import { fireShow } from 'components/Store/loader/actions/show';
import selectApiExists from 'components/Store/api/selectors/exists.js'
import selectorMainExtract from 'components/Store/main/selectors/extract.js';
import { fireListGet as actionApiListGet } from 'components/Store/api/actions/list/get';
import Item from './Item';
import Link from 'components/Link';
import Store from 'components/Store';
import Loader from 'components/Loader';
import PaginationItems from './Pagination'
import usePagination from './Pagination/utils/usePagination';
import { Box, Button, Grid, Paper, Typography } from '@mui/material';

let News = () => {
    const {enqueueSnackbar} = useSnackbar()
    const apiExists = useSelector(selectApiExists())
    const unmount = useSelector(selectorMainExtract(['loader', 'unmount', 'visible']))
    const loader = useSelector(selectorMainExtract(['api', 'list', 'news', 'loader']))
    const data = useSelector(selectorMainExtract(['api', 'list', 'news', 'data']))

    useEffect(() => {
        if(apiExists) {
            actionApiListGet({
                section: 'news',
                url: `http://localhost:4200`
            })(enqueueSnackbar)
        }
    }, [
        apiExists,
        enqueueSnackbar
    ])



    return <>
        <Loader visible={!Array.isArray(data)} />
        
        {(Array.isArray(data))
            ? <PaginationItems datas={data} />
            : <Loader visible={!Array.isArray(data)} />
        }
    </>
}

News = React.memo(News)
export default News