import React from 'react'
import { Image } from 'mui-image'
import styled from 'styled-components'
import { Box, Container, Grid } from '@mui/material'
import { TypographyText as Typography } from 'components/Typography'

var r = () => Math.random() * 256 >> 0;
var color = `rgb(${r()}, ${r()}, ${r()})`;

const itemArray = [
    {
        src: 'https://img3.goodfon.ru/wallpaper/nbig/f/17/vampir-alukard-hellsing.jpg',
        title: 'Makise',
        description: 'Time Leap Machine'
    },
    {
        src: 'https://i.ytimg.com/vi/XM79rJcYye4/maxresdefault.jpg',
        title: 'Monkey D Luffy',
        description: 'I will be a Pirate King!'
    },
    {
        src: 'http://localhost:4200/files/maxresdefault9741.jpg',
        title: 'Amane Suzuha',
        description: 'Otto-san, I need to kill Makise Kurisu'
    },
    {
        src: 'https://kg-portal.ru/img/73607/main.jpg',
        title: 'Amane Suzuha',
        description: 'Time Leap Machine'
    },
    {
        src: 'https://avatars.mds.yandex.net/get-mpic/6597196/img_id6199323012354072617.jpeg/600x800',
        title: 'Amane Suzuha',
        description: 'Time Leap Machine'
    },
    {
        src: 'https://anime-fans.ru/wp-content/uploads/2021/08/Moya-gerojskaya-akademiya-nedavnij-obraz-Deku-v-mange-nazyvaetsya-CHernyj-Deku.jpg',
        title: 'Amane Suzuha',
        description: 'Time Leap Machine'
    },
    
]

export const StyledTypography = styled("div")`
    color: white;
    position: absolute;
    bottom: 0;
    width: calc(100% - 16px);
    right: 0;
    background-image: linear-gradient(transparent 0%, rgba(49, 57, 67, 0.5) 25%, rgba(49, 57, 67, 0.75) 60%, rgb(49, 57, 67) 90%);
    padding-bottom: 3.25rem;
    padding-top: 1rem;
    padding-left: 3.25rem;
    box-sizing: border-box;

    p {
        margin: 0;
        font-weight: 600 !important;
        font-size: 30px !important;
    }

    span {
        font-size: 20px;
        font-weight: 500;
        font-style: italic;
    }
`

let Content = () => {
    return <Container maxWidth="1180px">
        <Box sx={{marginTop: '3.25rem', marginBottom: '3.25rem'}}>
            <Typography 
                variant='h2'
                align='center'
                sx={{marginBottom: '2.25rem'}}
                
            >Последние статьи</Typography>
            <Grid container spacing={2}>
                    {itemArray.map((_, index, currentArray) => {
                        return (index <= 1)
                            ? <Grid item md={6} sx={{position: 'relative'}}>
                                <Image 
                                    src={currentArray[index].src}
                                    duration={3000}
                                    fit="cover"
                                    height="372px"
                                    width="100%"
                                    distance="100px"
                                    style={{
                                        borderRadius: '4px',
                                    }}
                                />
                                <StyledTypography style={{
                                }}>
                                    <p>{currentArray[index].title}</p>
                                    <span>{currentArray[index].description}</span>
                                    
                                </StyledTypography>
            
                                </Grid>
                            : <Grid item md={3} sx={{position: 'relative'}}>
                                    <Image 
                                        src={currentArray[index].src}
                                        duration={3000}
                                        fit="cover"
                                        height="293px"
                                        width="100%"
                                        distance="100px"
                                        style={{
                                            borderRadius: '4px'
                                        }}
                                    />
                                    <StyledTypography>
                                        <p>{currentArray[index].title}</p>
                                        <span>{currentArray[index].description}</span>
                                    </StyledTypography>
                
                                </Grid>
                        })
                    }
            </Grid>
        </Box>
    </Container>
}

Content = React.memo(Content)
export default Content