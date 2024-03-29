import React from 'react'
import { Container } from '@mui/material'
import MainPage from 'components/Main/Main'
import Background from 'components/Background'
import styled from 'styled-components'
import Content from 'components/Content'
import Bar from 'components/Bar'
import { useLocation } from 'react-router-dom'

let Main = (props) => {
    return <React.Fragment>
        <MainPage />
        <Content />
        <Bar />
    </React.Fragment>
}

Main = React.memo(Main)
export default Main