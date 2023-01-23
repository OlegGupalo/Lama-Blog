import { Box, Typography } from '@mui/material'
import styled from 'styled-components'

const StyledWrapped = styled(Typography)`
    position: absolute;
    background: #000001cb;
    top: 0;
    height: 20%;
    width: 100%;
    font-family: 'Montserrat', sans-serif;
    color: white;
    z-index: 1;
    h5 a {
        color: yellow;
        margin: 0px;
        font-size: 46px;
        letter-spacing: 3.5px;
        font-weight: bold;
    }
    p {
        font-size: 18px;
        
    }

    b {
        color: yellow;
        font-size: 20px;
    }

    .hoverBlock:hover {
        background: 'rgba(0,0,0,0.8)'
    }
`

export default StyledWrapped