import React from 'react'
import Image from 'mui-image'
import styled from 'styled-components'
import { Button } from '@mui/material'
import { TypographyText as Typography } from 'components/Typography'

const StyledBar = styled("div")`
    position: relative;
    height: auto;
    background: rgb(82,71,71);
    border-radius: 20px;
`
const StyledImage = styled("div")`
    background-image: url("https://i.ytimg.com/vi/XM79rJcYye4/maxresdefault.jpg");
    background-repeat: no-repeat;
    width: 50%;
    height: 500px;
    background-size: cover;
    color: white;
    z-index: 1;
`
const StyledLinear = styled("div")`
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background-image:
    linear-gradient(90deg, #6c0a0b7a 1%, #6c0a0b 50%);
    z-index: 20;
`
const StyledText = styled("div")`
    color: white;
    position: absolute;
    top: 0;
    width: calc(50% - 16px);
    height: 100%;
    right: 0;
    padding-top: 10rem;
    z-index: 40;
    padding-left: 2.25rem;
    box-sizing: border-box;

    h3 {
        font-weight: 300;
        letter-spacing: 3.5px !important;
        font-family: 'Oswald', sans-serif !important;
        margin-bottom: 1.25rem;
    }

    span {
        font-family: 'Oswald', sans-serif !important;
        font-weight: 300;
        letter-spacing: 2px;
        font-size: 18px;
    }
`

const StyledButton = styled(Button)`
    border-radius: 0px !important;
    font-family: 'Oswald', sans-serif !important;
    font-weight: 700 !important;
    font-size: 0.95rem !important;
    display: block !important;
    background: white !important;
    color: #202020 !important;
    width: 149px !important;
    height: 48px !important;
`

const Bar = () => {
    return <>
    <Typography variant="h1" sx={{
        fontWeight: 900,
        margin: '2rem 0',
        textAlign: 'center'
    }}>One piece waits for you!</Typography>
        <StyledBar>
            <StyledImage>
                <StyledText style={{
                }}>
                    <Typography variant="h3">
                        DEATHLOOP IS AVAILABLE NOW
                    </Typography>
                    <span>
                        One Piece is the story of Monkey D. Luffy, a young man who has a single dream: To find the legendary treasure known as the One Piece and become the King of the Pirates. 
                    </span>
                    <StyledButton
                        variant='contained'
                        sx={{marginTop: '1.5rem'}}
                    >Read more</StyledButton>
                </StyledText>
                <StyledLinear />
            </StyledImage>
            
        </StyledBar>
    </>
}

export default Bar