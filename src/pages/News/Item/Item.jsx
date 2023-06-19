import React from 'react'
import {Container} from '@mui/material'
import { useParams } from 'react-router-dom'
import Slug from 'components/News/Slug'
import Comment from 'components/Form/Comment'
import List from 'components/Form/Comment/List'
import { useState } from 'react'

let Item = () => {
    const {slug} = useParams()
    return <Container sx={{marginTop: '4rem'}} maxWidth="md">
        <Slug slug={slug} />
        <List slug={slug} />
    </Container>
}

export default Item