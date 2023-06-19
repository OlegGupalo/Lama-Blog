import React from 'react'
import {News as TableNews} from 'components/News'
import { Container, Grid } from '@mui/material'
import styled from 'styled-components'

export const BackgroundAvatar = styled("div")`
    background: url("https://shikimori.one/assets/background/cartographer-3820675e1384f3b19db3a84589f82c666474e97c7300455468a94a1a3e041298.png");
    min-height: 100vh;
    display: grid;
`

let News = () => {
    return <BackgroundAvatar>
    <Container maxWidth="lg" sx={{
        backgroundColor: '#ededed'
    }}>
        <TableNews />
    </Container>
    </BackgroundAvatar>
}

News = React.memo(News)
export default News