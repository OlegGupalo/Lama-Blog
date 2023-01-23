import React from 'react'
import {News as TableNews} from 'components/News'
import { Container, Grid } from '@mui/material'

let News = () => {
    return <>
    <Container maxWidth="md" sx={{
        backgroundColor: '#ededed'
    }}>
        <TableNews />
    </Container>
    </>
}

News = React.memo(News)
export default News