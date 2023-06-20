import React from 'react'
import { Image } from 'mui-image'
import styled from 'styled-components'
import { Box, Container, Grid } from '@mui/material'
import { TypographyText as Typography } from 'components/Typography'
import { useNews } from 'components/News/useNews'

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
    const {news, loading} = useNews()
    console.log("content", news)

    let updatedNews = null
    if(news) {
        updatedNews = news.slice(0, 6)
    }

    return <Container maxWidth="1180px" sx={{
        background: 'black'
    }}>
        <Box sx={{marginTop: '3.25rem', marginBottom: '3.25rem'}}>
            <Typography 
                variant='h2'
                align='center'
                sx={{marginBottom: '2.25rem', color: 'white'}}
                
            >Последние статьи</Typography>
            <Grid container spacing={2}>
                    {updatedNews
                        ? updatedNews.map((_, index, currentArray) => {
                        return (index <= 1)
                            ? <Grid item md={6} xs={12} sx={{position: 'relative'}}>
                                <Image 
                                    src={`http://localhost:4200/files/${currentArray[index].image}`}
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
                                        src={`http://localhost:4200/files/${currentArray[index].image}`}
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
                    : <></>}
            </Grid>
        </Box>
    </Container>
}

Content = React.memo(Content)
export default Content