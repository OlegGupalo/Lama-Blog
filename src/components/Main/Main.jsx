import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useSnackbar } from 'notistack';
import { useSelector } from 'react-redux'
import MainPosts from './MainPosts'
import Loader from 'components/Loader'
import selectApiExists from 'components/Store/api/selectors/exists.js'
import selectorMainExtract from 'components/Store/main/selectors/extract.js';
import { fireListGet as actionApiListGet } from 'components/Store/api/actions/list/get';
import { Box, Grid, Typography, useMediaQuery } from '@mui/material'
import img from './pxfuel.jpg';

const StyledBackground = styled("div")`
    height: 100vh;
    :after {
        content: "";
        box-sizing: border-box;
        display: block;    
        width: 100%;
        height: 100%;    
        position: absolute;
        top: 0;      
        left: 0;   
        background: transparent;
        background-size: cover;
        background-repeat: no-repeat;
        height: 100vh;
        margin-bottom: 300px;
        z-index: -1;
        background-image: linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,1)), url(${img});
    }
`

const StyledTitle = styled(Typography)`
    font-family: Montserrat, sans-serif;
    color: rgb(255, 255, 255);
    font-weight: 800 !important;
    letter-spacing: 0.18rem !important;
    line-height: 3.7rem !important;
    text-transform: uppercase;
`

const StyledBox = styled(Grid)`
    width: 57%;
    font-family: Montserrat, sans-serif;
    padding-left: calc(6% + 2.5rem);
    color: rgb(255, 255, 255);
    margin-top: 6.25rem;
    padding-top: calc(6% + 10.5rem);
    margin-bottom: 6.25rem;
`

const StyledTypography = styled("p")`
    font-size: 1.2rem;
    font-weight: 300;
    line-height: 2.1rem;
`

let Main = () => {
    const {enqueueSnackbar} = useSnackbar()
    const apiExists = useSelector(selectApiExists())
    // const unmount = useSelector(selectorMainExtract(['loader', 'unmount', 'visible']))
    // const loader = useSelector(selectorMainExtract(['api', 'list', 'news', 'loader']))
    const data = useSelector(selectorMainExtract(['api', 'list', 'news', 'data']))
    const isMobile = useMediaQuery("(max-width:600px)")
    console.log("MAINMOBILE", isMobile)
    
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


    if(!Array.isArray(data)) {
        return <Loader visible={!Array.isArray(data)} />
    }

    return <>
    <StyledBackground>

        <Box sx={{
            paddingTop: `${isMobile ? '' : '3.75rem'}`,
        }}>
            <StyledBox>
                <StyledTitle variant="h3" sx={{ fontSize: `${isMobile ? '1.6rem !important' : '2.8rem !important'}` }}>
                    The Elder Scrolls online: firesong & update 36 now live on pc/mac
                </StyledTitle>
                {isMobile ? <></> : <StyledTypography>
                    Protect the Legacy of the Bretons and bring your year-long adventure to its conclusion in The Elder Scrolls Online: Firesong and Update 36. 
                </StyledTypography>}
            </StyledBox>
        </Box>
    <MainPosts data={data.slice(0,4)} />
    </StyledBackground>
    </>
}

Main = React.memo(Main)
export default Main