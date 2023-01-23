import React from 'react'
import {Container} from '@mui/material'
import { useParams } from 'react-router-dom'
import Slug from 'components/News/Slug'

let Item = () => {
    const {slug} = useParams()
    
    return <Container sx={{marginTop: '4rem'}} maxWidth="md">
        <Slug slug={slug} />
    </Container>
}

export default Item