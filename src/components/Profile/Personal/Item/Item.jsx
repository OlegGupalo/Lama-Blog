import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { 
    Avatar, 
    Box, 
    Divider, 
    ImageListItem, 
    ImageListItemBar,
    IconButton,
} from '@mui/material'
import InfoIcon from '@mui/icons-material/Info';
import { TypographyText as Typography } from 'components/Typography'
import './index.css'

const StyledBack = styled(Box)`
    position: relative;
    margin-top: 0.5rem;
    // padding: 2rem 0.5rem;
    // border-radius: 20px;
    height: 500px;
    
    .title {
        border-radius: 20px;
        position: relative;
        background: #00000094;
        
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        // margin-left: 2rem;
    }

    .author {
        display: flex;
        background: red;
    }
    
    img {
        border: 0.5px solid black;
        object-fit: cover;
        width: 100%;
        height: 116px;
        margin-left: 0.5rem;
        box-sizing: border-box;
    }
`

const StyledAuthor = styled("div")`
    display: flex;
    align-items: center;
    margin-bottom: 1rem;

`

let Item = ({
    slug,
    image,
    title,
    author
}) => {
    return <ImageListItem component={Link} to={`/news/${slug}`}>
        <Divider />
            {/*<StyledAuthor>
                <Avatar sx={{width: 56, height: 56}} src={`http://localhost:4200/files/avatars/${author.image}`} />
                    <Typography sx={{
                        margin: '0 1rem 0 1rem',
                        fontSize: '25px',
                        // textTransform: 'uppercase',
                        fontWeight: 600,
                        letterSpacing: '0.15rem'
                        
                    }}>{author.username}</Typography>
            </StyledAuthor> */}  
            <StyledBack style={{
                backgroundImage: `url(http://localhost:4200/files/${image})`,
                backgroundSize: 'cover',
                backgroundPositionY: 'center'
            }}>
             {/*        <img style={{
                        width: 248,height: 248, 
                     }} src={`http://localhost:4200/files/${image}`} /> */}
                {/*<div className='title'>
                    <Typography component={Link} to={`/news/${slug}`} sx={{
                        fontSize: '30px',
                        fontWeight: '800',
                        color: 'black',
                        padding: '1rem 0 0 1.5rem',
                        color: '#c9c9c9'


                    }}>{title}</Typography>
                
                </div>*/}
                
            </StyledBack>
            <ImageListItemBar
                title={title}
                position="bottom"
                sx={{
                    height: '100px',
                    background: 'rgba(0, 0, 0, 0.8)',

                    '.MuiImageListItemBar-title': {
                        fontSize: '23px',
                        fontFamily: "'Josefin Sans', 'Montserrat' ,sans-serif !important",
                        fontWeight: 'bold',
                    cursor: 'pointer'

                    }
                }}
                
            />
        
    </ImageListItem>
}

Item = React.memo(Item)
export default Item