import React from 'react'
import CreateNews from 'components/Form/News'
import { Container } from '@mui/material'
import Parent from 'components/Form/News/Parent'

let Create = () => {
    return <React.Fragment>
        <Container maxWidth='md' sx={{
            backgroundColor: '#ededed',
            height: '100%'
        }}>
            <Parent />
        </Container>
    </React.Fragment>
}
Create = React.memo(Create)

export default Create